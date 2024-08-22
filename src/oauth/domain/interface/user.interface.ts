import { User } from '../entities/user.entity';

export interface UserRepositoryInterface {
  save(user: User): Promise<void>;
  findBy(query: Partial<User>): Promise<User | null>;
  findAll(): Promise<User[]>;
  update(customerKey: string, user: Partial<User>): Promise<User | null>;
  delete(customerKey: string): Promise<boolean>;
}
