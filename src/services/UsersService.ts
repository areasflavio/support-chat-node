import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/UserRepository';

class UsersService {
  async create(email: string) {
    const usersRepository = getCustomRepository(UserRepository);

    const userExists = await usersRepository.findOne({ email });

    if (userExists) {
      return userExists;
    }

    const user = usersRepository.create({ email });

    await usersRepository.save(user);

    return user;
  }
}

export { UsersService };
