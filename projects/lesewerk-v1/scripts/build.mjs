import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import esbuild from 'esbuild';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(root, 'dist');
const assets = join(dist, 'assets');

await rm(dist, { recursive: true, force: true });
await mkdir(assets, { recursive: true });

await esbuild.build({
  entryPoints: [join(root, 'src/main.tsx')],
  bundle: true,
  format: 'esm',
  sourcemap: false,
  minify: true,
  outdir: assets,
  entryNames: 'app',
  assetNames: '[name]',
  loader: {
    '.css': 'css',
  },
});

const html = await readFile(join(root, 'index.html'), 'utf8');
const builtHtml = html.replace(
  '<script type="module" src="/src/main.tsx"></script>',
  '<link rel="stylesheet" href="./assets/app.css" />\n    <script type="module" src="./assets/app.js"></script>',
);
await writeFile(join(dist, 'index.html'), builtHtml);
await cp(join(root, 'reports'), join(dist, 'reports'), { recursive: true });
