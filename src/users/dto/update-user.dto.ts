import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Matches,
} from 'class-validator';
import { Rols } from '../entities/rols.entity';

export class UpdateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  id: string;

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
  @Matches(/^[0-9]{10}$/, {
    message: 'El número de teléfono debe tener exactamente 10 dígitos',
  })
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  rol_id: number;
}

export interface UpdateUsers {
  email?: string;
  full_name?: string;
  phone?: string;
  rol_id?: Rols;
}
