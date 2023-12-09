import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Delete,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiResp } from '../utils/dtos/response.dto';
import { success } from '../utils/constants/global.constants';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';

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

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 400, description: 'Error' })
  @ApiResponse({
    status: 200,
    description: 'All Users',
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get()
  async allUsers(): Promise<ApiResp> {
    const user = await this.usersService.getAllUser();
    return {
      message: success.OK,
      statusCode: 200,
      data: user,
    };
  }

  @ApiOperation({ summary: 'User update' })
  @ApiResponse({ status: 400, description: 'Error' })
  @ApiResponse({
    status: 200,
    description: 'User update',
  })
  @ApiBody({
    type: UpdateUserDto,
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('/update')
  async updateUserById(@Body() params: UpdateUserDto) {
    const data = await this.usersService.updateUserById(params);
    return {
      message: success.OK,
      statusCode: 200,
      data,
    };
  }

  @ApiOperation({ summary: 'User delete' })
  @ApiResponse({ status: 400, description: 'Error' })
  @ApiResponse({
    status: 201,
    description: 'User delete',
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string',
    description: 'User id',
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Delete('/:id')
  async deleteUserById(@Param('id') id: string) {
    const data = await this.usersService.deleteUserById(id);
    return {
      message: success.OK,
      statusCode: 200,
      data,
    };
  }
}
