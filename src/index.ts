import path from 'path';
import { promisify } from 'util';
import http from 'http';
import express from 'express';

export function getWebClientExpressRouter() {
  const router = express.Router();

  router.use('/', express.static(__dirname));

  // TODO: Find a way to serve this without using relative path
  router.use('/resources', express.static(path.resolve(__dirname, '../node_modules/@amethyst-writer/ui/dist')));

  return router;
}

export async function startDevelopmentServer() {
  const app = express();

  app.use(getWebClientExpressRouter());

  const server = http.createServer(app);
  await (promisify(server.listen.bind(server)) as (port?: number) => void)(8000);

  console.log('Started development server');
}

if (require.main === module) {
  startDevelopmentServer();
}
