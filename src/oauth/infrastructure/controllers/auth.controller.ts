import {
  Controller,
  Post,
  Body,
  Logger,
  Get,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { RegisterUseCase } from '../../application/use-cases/register.use-case/register.use-case.service';
import { RegisterDto } from '../../application/dto/register.dto';
import { LoginUseCase } from '../../application/use-cases/login.use-case/login.use-case.service';
import { LoginDto } from '../../application/dto/login.dto';
import { FindAllUsersUseCase } from '../../application/use-cases/find-all-users.use-case/find-all-users.use-case.service';
import { UpdateUserDto } from '../../application/dto/updateUser.dto';
import { UpdateUserUseCase } from '../../application/use-cases/update-user.use-case/update-user.use-case.service';
import { DeleteUserUseCase } from '../../application/use-cases/delete-user.use-case/delete-user.use-case.service';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly findAllUsersUseCase: FindAllUsersUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    await this.registerUseCase.execute(registerDto);
    this.logger.log('(REGISTER) User registered and JWT created successfully');

    return {
      message: 'User registered successfully',
    };
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const result = await this.loginUseCase.execute(loginDto);
    this.logger.log('(LOGIN) User logged in and JWT created successfully');

    return result;
  }

  @Get('users')
  async getAllUsers() {
    const users = await this.findAllUsersUseCase.execute();
    this.logger.log('(GET ALL USERS) Retrieved all users');
    return users;
  }

  @Put('users/:customerKey')
  async updateUser(
    @Param('customerKey') customerKey: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const updatedUser = await this.updateUserUseCase.execute(
      customerKey,
      updateUserDto,
    );
    this.logger.log(`(UPDATE) User updated for customerKey: ${customerKey}`);
    return updatedUser;
  }

  @Delete('users/:customerKey')
  async deleteUser(@Param('customerKey') customerKey: string) {
    const result = await this.deleteUserUseCase.execute(customerKey);
    this.logger.log(
      `(DELETE) User deleted or marked as deleted for customerKey: ${customerKey}`,
    );
    return {
      success: result,
    };
  }
}
