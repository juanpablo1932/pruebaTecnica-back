import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateResponseDto, CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Rols } from './entities/rols.entity';
import { errors } from '../utils/constants/global.constants';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Rols)
    private readonly rolsRepository: Repository<Rols>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<CreateResponseDto> {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new HttpException(errors.EMAIL_EXIST, HttpStatus.BAD_REQUEST);
    }

    const user = new User();
    user.email = createUserDto.email;
    user.full_name = createUserDto.full_name;
    user.password = await bcrypt.hash(createUserDto.password, 10);
    user.phone = createUserDto.phone;
    user.is_deleted = false;
    user.rol_id = 4;

    const savedUser = await this.userRepository.save(user);

    const userResponse = new CreateResponseDto();
    userResponse.email = savedUser.email;
    userResponse.full_name = savedUser.full_name;
    userResponse.phone = savedUser.phone;

    return userResponse;
  }
}
