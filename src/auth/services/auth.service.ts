import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../users/entities/user.entity';
import { ITokens, JWTPayload } from '../interfaces/jwtPayload.interface';
import { success } from '../../utils/constants/global.constants';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(user: User) {
    const payload: JWTPayload = { email: user.email, id: user.id };
    const { access_token } = await this.getTokens(payload);
    return {
      message: success.LOGIN,
      data: {
        name: user.full_name,
        email: user.email,
        access_token,
      },
      statusCode: HttpStatus.OK,
    };
  }

  private async getTokens(payload: JWTPayload): Promise<ITokens> {
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRATION_TIME,
      }),
    };
  }
}
