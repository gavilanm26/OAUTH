import { Injectable, Logger, Inject, NotFoundException } from '@nestjs/common';
import { User } from '../../entities/user.entity';
import { UserRepositoryInterface } from '../../interface/user.interface';
import { JwtService } from '@nestjs/jwt';
import { EncryptionService } from '../crypto/encryption.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
    private readonly jwtService: JwtService,
    private readonly encryptionService: EncryptionService,
  ) {}

  async createUser(user: User): Promise<User> {
    await this.userRepository.save(user);
    this.logger.log(`(CREATE) User created successfully`);
    return user;
  }

  async findUser(type: string, documentNumber: string): Promise<User | null> {
    return this.userRepository.findBy({ type, documentNumber });
  }

  async findAllUsers(): Promise<User[]> {
    const users = await this.userRepository.findAll();
    this.logger.log(`(FIND ALL) Retrieved all users`);
    return users;
  }

  async updateUser(
    customerKey: string,
    updateUserDto: Partial<User>,
  ): Promise<User | null> {
    // Buscar al usuario existente por customerKey
    const existingUser = await this.userRepository.findBy({ customerKey });

    if (!existingUser) {
      this.logger.warn(
        `(UPDATE) User with customerKey ${customerKey} not found`,
      );
      throw new NotFoundException(
        `User with customerKey ${customerKey} not found`,
      );
    }

    // Si se proporciona una nueva contraseña, encriptarla
    if (updateUserDto.password) {
      updateUserDto.password = this.encryptionService.encrypt(
        updateUserDto.password,
      );
    }

    // Actualizar los campos del usuario
    const updatedUser = await this.userRepository.update(
      customerKey,
      updateUserDto,
    );
    this.logger.log(
      `(UPDATE) User updated successfully for customerKey: ${customerKey}`,
    );
    return updatedUser;
  }

  async deleteUser(customerKey: string): Promise<boolean> {
    return await this.userRepository.delete(customerKey);
  }

  async validateUser(
    type: string,
    documentNumber: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.userRepository.findBy({
      type,
      documentNumber,
    });

    // Validar la contraseña desencriptándola y comparándola
    if (user) {
      const decryptedPassword = this.encryptionService.decrypt(user.password);
      if (decryptedPassword === password) {
        return user;
      }
    }

    return null;
  }

  generateToken(payload: any): string {
    // Generar el token JWT con el payload proporcionado
    return this.jwtService.sign(payload);
  }
}
