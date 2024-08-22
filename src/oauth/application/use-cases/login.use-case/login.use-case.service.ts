import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../../../domain/service/auth/auth.service';
import { LoginDto } from '../../dto/login.dto';

@Injectable()
export class LoginUseCase {
  private readonly logger = new Logger(LoginUseCase.name);

  constructor(private readonly authService: AuthService) {}

  async execute(loginDto: LoginDto): Promise<{ token: string }> {
    const user = await this.authService.validateUser(
      loginDto.type,
      loginDto.documentNumber,
      loginDto.password,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { customerKey: user.customerKey };
    const token = this.authService.generateToken(payload);
    this.logger.log(
      `(LOGIN) JWT created successfully for user: ${user.customerKey}`,
    );

    return { token };
  }
}
