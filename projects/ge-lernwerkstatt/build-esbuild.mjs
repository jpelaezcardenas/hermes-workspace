import { build } from 'esbuild';
import { mkdir, rm, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';

await rm('dist', { recursive: true, force: true });
await mkdir('dist/assets', { recursive: true });

await build({
  entryPoints: ['src/main.jsx'],
  bundle: true,
  outfile: 'dist/assets/main.js',
  format: 'esm',
  jsx: 'automatic',
  loader: { '.css': 'css' },
  minify: true,
  sourcemap: false,
  logLevel: 'info',
});

if (existsSync('dist/assets/main.css')) {
  // esbuild writes imported CSS next to the JS outfile.
}

await writeFile('dist/index.html', `<!doctype html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>GE Lernwerkstatt Beobachtungs-App</title>
    ${existsSync('dist/assets/main.css') ? '<link rel="stylesheet" href="/assets/main.css" />' : ''}
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/assets/main.js"></script>
  </body>
</html>
`);
console.log('esbuild fallback build complete: dist/');
