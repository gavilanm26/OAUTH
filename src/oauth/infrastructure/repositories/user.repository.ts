import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRepositoryInterface } from '../../domain/interface/user.interface';
import { User } from 'src/oauth/domain/entities/user.entity';
import { UserDocument } from '../schemas/user.schema';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  private readonly logger = new Logger(UserRepository.name);

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async save(user: User): Promise<void> {
    return new this.userModel(user)
      .save()
      .then((savedUser) => {
        this.logger.log(
          `(SAVE) User saved successfully: ${JSON.stringify(savedUser)}`,
        );
      })
      .catch((error) => {
        this.logger.error(
          `(SAVE) Failed to save user: ${JSON.stringify(user)}`,
          error.stack,
        );
        throw error;
      });
  }

  async findBy(query: Partial<User>): Promise<User | null> {
    return this.userModel
      .findOne(query)
      .exec()
      .then((foundUser) => {
        if (foundUser) {
          this.logger.log(`(FIND) User found: ${JSON.stringify(foundUser)}`);
          return foundUser;
        } else {
          this.logger.warn(
            `(FIND) No user found with query: ${JSON.stringify(query)}`,
          );
          return null;
        }
      })
      .catch((error) => {
        this.logger.error(
          `(FIND) Failed to find user with query: ${JSON.stringify(query)}`,
          error.stack,
        );
        throw error;
      });
  }

  async findAll(): Promise<User[]> {
    return this.userModel
      .find()
      .exec()
      .then((users) => {
        this.logger.log(
          `(FIND ALL) Found ${users.length} users: ${JSON.stringify(users)}`,
        );
        return users;
      })
      .catch((error) => {
        this.logger.error(`(FIND ALL) Failed to find users`, error.stack);
        throw error;
      });
  }

  async update(
    customerKey: string,
    updateData: Partial<User>,
  ): Promise<User | null> {
    return this.userModel
      .findOneAndUpdate({ customerKey }, updateData, { new: true })
      .exec()
      .then((updatedUser) => {
        if (updatedUser) {
          this.logger.log(
            `(UPDATE) User updated successfully: ${JSON.stringify(updatedUser)}`,
          );
          return updatedUser;
        } else {
          this.logger.warn(
            `(UPDATE) No user found with customerKey: ${customerKey}`,
          );
          return null;
        }
      })
      .catch((error) => {
        this.logger.error(
          `(UPDATE) Failed to update user with customerKey: ${customerKey}`,
          error.stack,
        );
        throw error;
      });
  }

  async delete(customerKey: string): Promise<boolean> {
    return this.userModel
      .findOneAndDelete({ customerKey })
      .exec()
      .then((result) => {
        if (result) {
          this.logger.log(
            `(DELETE) User deleted with customerKey: ${customerKey}`,
          );
          return true;
        } else {
          this.logger.warn(
            `(DELETE) No user found with customerKey: ${customerKey}`,
          );
          return false;
        }
      })
      .catch((error) => {
        this.logger.error(
          `(DELETE) Failed to delete user with customerKey: ${customerKey}`,
          error.stack,
        );
        throw error;
      });
  }
}
