import { getCustomRepository, Repository } from 'typeorm';

import { Connection } from '../entities/Connection';
import { ConnectionRepository } from '../repositories/ConnectionRepository';

interface IConnectionCreate {
  admin_id?: string;
  socket_id: string;
  user_id: string;
  id?: string;
}

class ConnectionService {
  private connectionRepository: Repository<Connection>;

  constructor() {
    this.connectionRepository = getCustomRepository(ConnectionRepository);
  }

  async create({ admin_id, socket_id, user_id, id }: IConnectionCreate) {
    const connection = this.connectionRepository.create({
      socket_id,
      user_id,
      admin_id,
      id,
    });

    await this.connectionRepository.save(connection);

    return connection;
  }

  async findByUserId(user_id: string) {
    const connection = await this.connectionRepository.findOne({ user_id });

    return connection;
  }
}

export { ConnectionService };
