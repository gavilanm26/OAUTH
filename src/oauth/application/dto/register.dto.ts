import { IsNotEmpty, IsString, Length, MinLength } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 2)
  type: string;

  @IsNotEmpty()
  @IsString()
  documentNumber: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsString()
  secondName?: string;

  @IsString()
  secondLastName?: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}
