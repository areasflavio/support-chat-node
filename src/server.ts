import express, { Request, Response } from 'express';

import './database';

const server = express();

server.use(express.json());

server.get('/', (request: Request, response: Response) => {
  return response.json({ message: 'Hello world' });
});

server.post('/users', (request: Request, response: Response) => {
  const { name, email } = request.body;

  return response.json({ name, email });
});

server.listen(3333, () => console.log('Server is up on port 3333...'));
