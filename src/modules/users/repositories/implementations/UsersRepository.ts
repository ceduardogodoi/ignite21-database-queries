import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User | undefined> {
    // Complete usando query builder
    // return this.repository.createQueryBuilder('user')
    //   .leftJoinAndSelect('user.games', 'game')
    //   .where('user.id = :id', {
    //     id: user_id
    //   })
    //   .getOne();

    // Complete usando ORM
    // return this.repository.findOne(user_id, {
    //   relations: ['games']
    // })

    // Complete usando ORM
    return this.repository.findOne({
      join: {
        alias: 'user',
        leftJoinAndSelect: {
          game: 'user.games',
        },
      },
      where: {
        id: user_id,
      }
    })
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    // Complete usando raw query
    return this
      .repository
      .query('SELECT * FROM users ORDER BY first_name') as Promise<User[]>;
  }

  async findUserByFullName({ first_name, last_name }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    // Complete usando raw query
    return this
      .repository
      .query(
        'SELECT * FROM users WHERE first_name ILIKE $1 AND last_name ILIKE $2',
        [first_name, last_name]
      );
  }
}
