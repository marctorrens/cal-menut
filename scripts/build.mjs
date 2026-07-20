import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(root, 'dist');
const buildDate = new Date().toISOString();

await rm(dist, { recursive: true, force: true });
await mkdir(join(dist, 'assets'), { recursive: true });

const css = await readFile(join(root, 'src/styles.css'), 'utf8');
const js = (await readFile(join(root, 'src/main.js'), 'utf8'))
  .replace("import './styles.css';\n\n", '')
  .replaceAll('__BUILD_DATE__', JSON.stringify(buildDate));
const html = (await readFile(join(root, 'index.html'), 'utf8'))
  .replace('<script type="module" src="/src/main.js"></script>', '<link rel="stylesheet" href="/assets/styles.css"><script type="module" src="/assets/main.js"></script>');

await writeFile(join(dist, 'assets/styles.css'), css);
await writeFile(join(dist, 'assets/main.js'), js);
await writeFile(join(dist, 'index.html'), html);
console.log(`Built Cal Menut with deployment date ${buildDate}`);
