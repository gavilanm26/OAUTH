import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RegisterUseCase } from './application/use-cases/register.use-case/register.use-case.service';
import { EncryptionService } from './domain/service/crypto/encryption.service';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { User, UserSchema } from './infrastructure/schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './infrastructure/controllers/auth.controller';
import { JwtStrategy } from './utils/jwt.strategy';
import { AuthService } from './domain/service/auth/auth.service';
import { LoginUseCase } from './application/use-cases/login.use-case/login.use-case.service';
import { FindAllUsersUseCase } from './application/use-cases/find-all-users.use-case/find-all-users.use-case.service';
import { UpdateUserUseCase } from './application/use-cases/update-user.use-case/update-user.use-case.service';
import { DeleteUserUseCase } from './application/use-cases/delete-user.use-case/delete-user.use-case.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: process.env.JWTSECRET,
      signOptions: { expiresIn: '4m' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    RegisterUseCase,
    AuthService,

    {
      provide: 'UserRepositoryInterface',
      useClass: UserRepository,
    },
    EncryptionService,
    JwtStrategy,
    LoginUseCase,
    FindAllUsersUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
  ],
})
export class authModule {}
