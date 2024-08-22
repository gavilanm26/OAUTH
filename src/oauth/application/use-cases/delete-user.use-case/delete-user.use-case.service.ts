import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { AuthService } from '../../../domain/service/auth/auth.service';

@Injectable()
export class DeleteUserUseCase {
  private readonly logger = new Logger(DeleteUserUseCase.name);

  constructor(private readonly authService: AuthService) {}

  async execute(customerKey: string): Promise<boolean> {
    const result = await this.authService.deleteUser(customerKey);

    if (!result) {
      throw new NotFoundException(
        `User with customerKey ${customerKey} not found`,
      );
    }

    this.logger.log(`(DELETE) User deleted for customerKey: ${customerKey}`);
    return result;
  }
}
