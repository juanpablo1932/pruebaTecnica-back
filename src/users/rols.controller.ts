import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Delete,
  Param,
} from '@nestjs/common';
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
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolsService } from './rols.service';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';

@ApiTags('rols')
@Controller('rols')
export class RolsController {
  constructor(private readonly rolsService: RolsService) {}

  @ApiOperation({ summary: 'Add rol' })
  @ApiResponse({ status: 400, description: 'Error' })
  @ApiResponse({
    status: 200,
    description: 'Add rol',
  })
  @ApiBody({
    type: CreateRolDto,
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('/add')
  async create(@Body() createUserDto: CreateRolDto): Promise<ApiResp> {
    const user = await this.rolsService.create(createUserDto);
    return {
      message: success.ROL_CREATED,
      statusCode: 201,
      data: [user],
    };
  }

  @ApiOperation({ summary: 'Get all rols' })
  @ApiResponse({ status: 400, description: 'Error' })
  @ApiResponse({
    status: 200,
    description: 'All rols',
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get()
  async allRols(): Promise<ApiResp> {
    const user = await this.rolsService.getAllRols();
    return {
      message: success.OK,
      statusCode: 200,
      data: user,
    };
  }

  @ApiOperation({ summary: 'Rol update' })
  @ApiResponse({ status: 400, description: 'Error' })
  @ApiResponse({
    status: 200,
    description: 'Rol update',
  })
  @ApiBody({
    type: UpdateRolDto,
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('/update')
  async updateRolById(@Body() params: UpdateRolDto) {
    const data = await this.rolsService.updateRolById(params);
    return {
      message: success.OK,
      statusCode: 200,
      data,
    };
  }

  @ApiOperation({ summary: 'Rol delete' })
  @ApiResponse({ status: 400, description: 'Error' })
  @ApiResponse({
    status: 201,
    description: 'Rol delete',
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
  async deleteUserById(@Param('id') id: number) {
    const data = await this.rolsService.deleteRolById(id);
    return {
      message: success.OK,
      statusCode: 200,
      data,
    };
  }
}
