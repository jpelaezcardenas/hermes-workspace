/** @vitest-environment node */
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest'
import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { JSDOM } from 'jsdom'
import { Markdown } from './markdown'

function setupMarkdownRender() {
  const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>')
  const { window } = dom

  Object.defineProperty(globalThis, 'window', { value: window, configurable: true })
  Object.defineProperty(globalThis, 'document', { value: window.document, configurable: true })
  Object.defineProperty(globalThis, 'Node', { value: window.Node, configurable: true })
  Object.defineProperty(globalThis, 'HTMLElement', { value: window.HTMLElement, configurable: true })
  Object.defineProperty(globalThis, 'Element', { value: window.Element, configurable: true })
  Object.defineProperty(globalThis, 'Text', { value: window.Text, configurable: true })
  Object.defineProperty(globalThis, 'IS_REACT_ACT_ENVIRONMENT', {
    value: true,
    configurable: true,
  })
  Object.defineProperty(globalThis, 'requestAnimationFrame', {
    value: (cb: FrameRequestCallback) => window.setTimeout(() => cb(Date.now()), 0),
    configurable: true,
  })
  Object.defineProperty(globalThis, 'cancelAnimationFrame', {
    value: (id: number) => window.clearTimeout(id),
    configurable: true,
  })

  const container = window.document.getElementById('root') as HTMLDivElement
  const root = createRoot(container)

  return {
    container,
    root,
    cleanup: () => {
      root.unmount()
      dom.window.close()
    },
  }
}

describe('Markdown', () => {
  let root: ReturnType<typeof createRoot> | null = null
  let container: HTMLDivElement
  let cleanup: () => void = () => {}

  beforeEach(() => {
    const setup = setupMarkdownRender()
    root = setup.root
    container = setup.container
    cleanup = setup.cleanup
  })

  afterEach(() => {
    if (root) {
      root = null
    }
    cleanup()
  })

  it('does not execute script tags or HTML event handlers', () => {
    const marker = 'hermesXssMarker'
    ;(globalThis as Record<string, unknown>)[marker] = undefined

    act(() => {
      root?.render(
        <Markdown>
          {`<p>safe text</p><img src="x" onerror="window.${marker}='pwned'"><script>window.${marker}='pwned'</script>`}
        </Markdown>,
      )
    })

    expect(container.querySelector('p')?.textContent).toBe('safe text')
    expect(container.querySelectorAll('script')).toHaveLength(0)
    expect(container.querySelector('img')?.getAttribute('onerror')).toBeNull()
    expect((globalThis as Record<string, unknown>)[marker]).toBeUndefined()
  })

  it('strips javascript URLs from links', () => {
    act(() => {
      root?.render(<Markdown>{'[exploit](javascript:alert(1337))'}</Markdown>)
    })

    const link = container.querySelector('a')
    const href = (link?.getAttribute('href') ?? '').toLowerCase()
    expect(href.startsWith('javascript:')).toBe(false)
    expect(href).not.toBe('javascript:alert(1337)')
  })

  it('supports safe markdown and normal media URLs', () => {
    act(() => {
      root?.render(
        <Markdown>{'![safe](https://example.com/image.png) [safe](https://example.com)'}</Markdown>,
      )
    })

    const image = container.querySelector('img')
    expect(image?.getAttribute('src')).toBe('https://example.com/image.png')

    const link = container.querySelector('a')
    expect(link?.getAttribute('href')).toBe('https://example.com')
  })
})
