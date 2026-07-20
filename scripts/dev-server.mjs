import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const root = join(process.cwd(), process.argv[2] || '.');
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css' };

createServer(async (request, response) => {
  const pathname = new URL(request.url, 'http://localhost').pathname;
  const target = normalize(join(root, pathname === '/' ? 'index.html' : pathname));
  try {
    const body = await readFile(target);
    response.writeHead(200, { 'content-type': types[extname(target)] || 'text/plain' });
    response.end(body);
  } catch {
    const body = await readFile(join(root, 'index.html'));
    response.writeHead(200, { 'content-type': 'text/html' });
    response.end(body);
  }
}).listen(4173, '0.0.0.0', () => console.log('Serving http://0.0.0.0:4173'));
