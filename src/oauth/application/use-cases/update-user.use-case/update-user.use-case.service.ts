import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { AuthService } from '../../../domain/service/auth/auth.service';
import { UpdateUserDto } from '../../dto/updateUser.dto';

@Injectable()
export class UpdateUserUseCase {
  private readonly logger = new Logger(UpdateUserUseCase.name);

  constructor(private readonly authService: AuthService) {}

  async execute(
    customerKey: string,
    updateUserDto: UpdateUserDto,
  ): Promise<any> {
    const updatedUser = await this.authService.updateUser(
      customerKey,
      updateUserDto,
    );

    if (!updatedUser) {
      throw new NotFoundException(
        `User with customerKey ${customerKey} not found`,
      );
    }

    this.logger.log(
      `(UPDATE) User updated successfully for customerKey: ${customerKey}`,
    );
    return updatedUser;
  }
}
