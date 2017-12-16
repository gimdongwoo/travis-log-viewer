import express from 'express';
import http from 'http';
import log from './log';

const app = express();
const server = new http.Server(app);

const token = process.env.TOKEN;
const repoId = process.env.REPOID;
app.use((req, res) => log(req, res, token, repoId));

const port = process.env.PORT || 8080;

server.listen(port, (err) => {
  if (err) {
    console.error(err);
  }
  console.info('----\n==> ✅  running on %s.', port);
});
