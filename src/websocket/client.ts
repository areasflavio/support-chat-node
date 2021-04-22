import { io } from '../http';

import { ConnectionService } from '../services/ConnectionsService';
import { MessageService } from '../services/MessagesService';
import { UsersService } from '../services/UsersService';

interface IParams {
  text: string;
  email: string;
}

io.on('connect', (socket) => {
  const connectionService = new ConnectionService();
  const usersService = new UsersService();
  const messageService = new MessageService();

  socket.on('client_first_access', async (params) => {
    const socket_id = socket.id;
    const { text, email } = params as IParams;
    let user_id = null;

    const userExists = await usersService.findByEmail(email);

    if (!userExists) {
      const user = await usersService.create(email);
      user_id = user.id;

      await connectionService.create({
        socket_id,
        user_id,
      });
    } else {
      const connection = await connectionService.findByUserId(userExists.id);
      user_id = userExists.id;

      if (!connection) {
        await connectionService.create({
          socket_id,
          user_id,
        });
      } else {
        connection.socket_id = socket_id;

        await connectionService.create(connection);
      }
    }

    await messageService.create({ text, user_id });
  });
});
