import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }) => value?.toLowerCase())
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Matches(/^([a-zA-Z ]|[à-ú]|[À-Ú])+$/g, {
    message: 'El nombre de usuario solo permite carácteres alfabéticos',
  })
  @Transform(({ value }) => value?.toLowerCase())
  full_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message:
      'La contraseña debe tener al menos 8 caracteres, al menos una letra mayúscula, al menos una letra minúscula y al menos un número',
  })
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Matches(/^[0-9]{10}$/, {
    message: 'El número de teléfono debe tener exactamente 10 dígitos',
  })
  phone: string;
}

export class CreateResponseDto {
  email: string;
  full_name: string;
  phone: string;
}
