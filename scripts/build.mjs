import { mkdir, copyFile, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const dist = 'dist';
await mkdir(join(dist, 'assets'), { recursive: true });
await copyFile('src/styles.css', join(dist, 'assets', 'styles.css'));
const html = await readFile('index.html', 'utf8');
await writeFile(
  join(dist, 'index.html'),
  html
    .replace('/src/main.tsx', '/cal-menut/assets/main.js')
    .replace('</head>', '  <link rel="stylesheet" href="/cal-menut/assets/styles.css" />\n  </head>'),
);
