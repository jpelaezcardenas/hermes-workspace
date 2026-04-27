
import asyncio
from playwright.async_api import async_playwright
import sys
import os

async def main():
    if len(sys.argv) != 3:
        print("Usage: python render_mermaid.py <input_mmd_path> <output_png_path>")
        sys.exit(1)

    input_path = sys.argv[1]
    output_path = sys.argv[2]
    
    # Ensure output directory exists
    output_dir = os.path.dirname(output_path)
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    with open(input_path, 'r') as f:
        mermaid_code = f.read()

    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;600;700&display=swap" rel="stylesheet">
        <style>
            body {{
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                padding: 20px;
                font-family: 'Figtree', sans-serif;
            }}
            .mermaid {{
                padding: 20px;
            }}
            /* Prevent text clipping in nodes */
            .node rect, .node polygon, .node circle, .node ellipse {{
                rx: 5;
                ry: 5;
            }}
            .nodeLabel, .label {{
                padding: 8px 12px !important;
                overflow: visible !important;
            }}
        </style>
    </head>
    <body>
        <div class="mermaid">
            {mermaid_code}
        </div>
        <script type="module">
            import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
            mermaid.initialize({{
                startOnLoad: true,
                flowchart: {{
                    htmlLabels: false,
                    padding: 50,
                    nodeSpacing: 70,
                    rankSpacing: 70,
                    useMaxWidth: false,
                    wrappingWidth: 300
                }},
                theme: 'base',
                themeVariables: {{
                    fontFamily: 'Figtree, sans-serif'
                }}
            }});
        </script>
    </body>
    </html>
    """

    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        
        await page.set_content(html_content)
        
        # Wait for the SVG to be rendered by Mermaid.js
        await page.wait_for_selector('div.mermaid > svg')
        
        # Get the rendered diagram element
        diagram_element = await page.query_selector('div.mermaid')
        
        if diagram_element:
            await diagram_element.screenshot(path=output_path)
            print(f"Successfully rendered {input_path} to {output_path}")
        else:
            print("Error: Mermaid diagram element not found.", file=sys.stderr)

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
