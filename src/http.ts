import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import path from 'path';

import './database';
import { routes } from './routes';

const app = express();

const publicDir = path.join(__dirname, '..', 'public');
const viewsDir = path.join(__dirname, '..', 'public', 'html');

app.use(express.static(publicDir));
app.set('views', viewsDir);
app.engine('html', require('ejs').renderFile); //informar qual a engine que vai ser utilizada
app.set('view engine', 'html');

app.get('/pages/client', (request, response) => {
  return response.render('client');
});

const http = createServer(app);

const io = new Server(http);

io.on('connection', (socket: Socket) => {
  console.log('Se conectou', socket.id);
});

app.use(express.json());

app.use(routes);

export { http, io };
