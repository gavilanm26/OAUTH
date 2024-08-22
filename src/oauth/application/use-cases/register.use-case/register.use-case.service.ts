import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { EncryptionService } from '../../../domain/service/crypto/encryption.service';
import { User } from '../../../domain/entities/user.entity';
import { AuthService } from '../../../domain/service/auth/auth.service';
import { RegisterDto } from '../../dto/register.dto';

@Injectable()
export class RegisterUseCase {
  private readonly logger = new Logger(RegisterUseCase.name);

  constructor(
    private readonly authService: AuthService,
    private readonly encryptionService: EncryptionService,
  ) {}

  async execute(registerDto: RegisterDto): Promise<User> {
    const existingUser = await this.authService.findUser(
      registerDto.type,
      registerDto.documentNumber,
    );

    if (existingUser) {
      this.logger.warn(
        '(REGISTER) User already exists with the same type and document number',
      );
      throw new BadRequestException(
        'User with the same type and document number already exists',
      );
    }
    const customerKey = `${registerDto.type}${registerDto.documentNumber}`;
    const encryptedPassword = this.encryptionService.encrypt(
      registerDto.password,
    );

    const user = User.create(
      registerDto.type,
      registerDto.documentNumber,
      registerDto.firstName,
      registerDto.lastName,
      encryptedPassword,
      customerKey,
      registerDto.secondName,
      registerDto.secondLastName,
    );

    try {
      const newUser = await this.authService.createUser(user);
      return newUser;
    } catch (error) {
      this.logger.error(
        `(REGISTER) Error occurred while registering user with customerKey: ${customerKey}`,
        error.stack,
      );
      throw error;
    }
  }
}
