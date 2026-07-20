import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';

const root = process.argv[2] || '.';
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml' };
createServer(async (req, res) => {
  try {
    const url = new URL(req.url || '/', 'http://localhost');
    let path = url.pathname.replace(/^\/cal-menut\//, '/');
    if (path === '/') path = '/index.html';
    const file = await readFile(join(root, path));
    res.writeHead(200, { 'content-type': types[extname(path)] || 'application/octet-stream' });
    res.end(file);
  } catch {
    res.writeHead(404);
    res.end('No trobat');
  }
}).listen(5173, '0.0.0.0', () => console.log('http://localhost:5173/cal-menut/'));
