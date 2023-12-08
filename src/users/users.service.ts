import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    // private readonly rolsService: RolsService,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.email = createUserDto.email;
    user.full_name = createUserDto.full_name;
    user.password = createUserDto.password;
    user.phone = createUserDto.phone;
    user.is_deleted = false;
    return this.userRepository.save(user);
  }
}
