import { Controller, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import LoginUserDto from '../../users/dto/loginUser.dto';
import { AuthService } from '../services/auth.service';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 400, description: 'Error' })
  @ApiResponse({
    status: 200,
    description: 'User token',
  })
  @ApiBody({
    type: LoginUserDto,
  })
  @HttpCode(200)
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
