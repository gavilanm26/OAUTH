import { Injectable, Logger } from '@nestjs/common';
import { User } from '../../../domain/entities/user.entity';
import { AuthService } from '../../../domain/service/auth/auth.service';

@Injectable()
export class FindAllUsersUseCase {
  private readonly logger = new Logger(FindAllUsersUseCase.name);

  constructor(private readonly authService: AuthService) {}

  async execute(): Promise<User[]> {
    this.logger.log('(FIND ALL USERS) Retrieving all users');
    const users = await this.authService.findAllUsers();
    return users;
  }
}
