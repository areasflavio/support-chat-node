import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import path from 'path';

import './database';
import { routes } from './routes';

const server = express();

const publicDir = path.join(__dirname, '..', 'public');
const viewsDir = path.join(__dirname, '..', 'public', 'html');

server.use(express.static(publicDir));
server.set('views', viewsDir);
server.engine('html', require('ejs').renderFile);
server.set('view engine', 'html');

server.get('/pages/client', (request, response) => {
  return response.render('client');
});

const http = createServer(server);
const io = new Server(http);

io.on('connection', (socket: Socket) => {
  console.log('Se conectou', socket.id);
});

server.use(express.json());
server.use(routes);

export { http, io };
