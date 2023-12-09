import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateResponseDto, CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
// import { Rols } from './entities/rols.entity';
import { errors, success } from '../utils/constants/global.constants';
import { UpdateUserDto, UpdateUsers } from './dto/update-user.dto';
import { RolsService } from './rols.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly rolsService: RolsService,
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

  private async updateUserAndReturnId(
    id: string,
    user: object,
  ): Promise<object[]> {
    try {
      const updatedUser = await this.userRepository
        .createQueryBuilder('usuarios')
        .update(User)
        .set(user)
        .where('id = :userId', { userId: id })
        .returning('id')
        .execute();

      return [
        {
          user_id: updatedUser.raw[0].id,
          message: success.USER_UPDATED,
        },
      ];
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateUserById(params: UpdateUserDto) {
    const userData = await this.getUserById(params.id);

    if (!userData) throw new NotFoundException(errors.USER_DOES_NOT_EXIST);

    const updateUser = {} as UpdateUsers;

    if (params.rol_id) {
      const rol = await this.rolsService.getRolById(params.rol_id);
      updateUser.rol_id = rol;
    }
    if (params.full_name) updateUser.full_name = params.full_name;
    if (params.email) updateUser.email = params.email;
    if (params.phone) updateUser.phone = params.phone;

    const update = await this.updateUserAndReturnId(userData.id, updateUser);

    return update;
  }

  async deleteUserById(id: string) {
    const userData = await this.getUserById(id);

    if (!userData) throw new NotFoundException(errors.USER_DOES_NOT_EXIST);

    await this.updateUserAndReturnId(userData.id, {
      is_deleted: true,
    });
  }

  public async getAllUser(): Promise<User[]> {
    return await this.userRepository.find({ where: { is_deleted: false } });
  }

  public async getUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { email, is_deleted: false },
    });
  }

  public async getUserById(id: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { id, is_deleted: false },
    });
  }
}
