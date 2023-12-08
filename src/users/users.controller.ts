import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiResponse } from '../utils/dtos/response.dto';
import { success } from '../utils/constants/global.constants';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  async create(@Body() createUserDto: CreateUserDto): Promise<ApiResponse> {
    const user = await this.usersService.create(createUserDto);
    return {
      message: success.REGISTER,
      statusCode: 201,
      data: [user],
    };
  }
}
