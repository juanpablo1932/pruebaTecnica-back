import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiResp } from '../utils/dtos/response.dto';
import { success } from '../utils/constants/global.constants';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'User register' })
  @ApiResponse({ status: 400, description: 'Error' })
  @ApiResponse({
    status: 200,
    description: 'User register',
  })
  @ApiBody({
    type: CreateUserDto,
  })
  @Post('/register')
  async create(@Body() createUserDto: CreateUserDto): Promise<ApiResp> {
    const user = await this.usersService.create(createUserDto);
    return {
      message: success.REGISTER,
      statusCode: 201,
      data: [user],
    };
  }
}
