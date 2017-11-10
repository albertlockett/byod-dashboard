import 'babel-polyfill';
import * as colors from 'colors/safe';
import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';

import { Process } from './process/Process';
import { ProcessRunner } from './process/ProcessRunner';
import { store, updateProcessData } from '../store/store';

// setup server config
const config = {
  PORT: 9005
};

// setup data sources

const commands = [
  {
    name: 'list-dir',
    cmd: 'ls -al',
    period: 1000,
  }
];

for(let { name, cmd, period } of commands) {
  const process = new Process(name, cmd);
  const processRunner = new ProcessRunner(period, process);
  processRunner.subscribe(({ name, stdout, stderr }) => {
    store.dispatch(updateProcessData(name, stdout));
  });
}


// setup express app

const app = express();

const staticRoutes = [
  '/',
  '/index.html',
  '/bundle.js'
];
app.get(staticRoutes, express.static('docbase'));


const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws, req) => {

  ws.send(JSON.stringify(store.getState()));

  store.subscribe(() => {
    ws.send(JSON.stringify(store.getState()));
  });

});


server.listen(config.PORT, () => {
  console.log(colors.cyan(`listening on port ${config.PORT}`));
});
