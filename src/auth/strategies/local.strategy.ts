import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as bcrypt from 'bcrypt';
import { Strategy } from 'passport-local';
import { User } from '../../users/entities/user.entity';
import { UsersService } from '../../users/users.service';
import { errors } from '../../utils/constants/global.constants';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super();
  }

  async validate(email: string, password: string): Promise<User> {
    const user = await this.usersService.getUserByEmail(email);
    if (!user)
      throw new HttpException(
        errors.USER_NOT_REGISTERED,
        HttpStatus.BAD_REQUEST,
      );
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid)
      throw new HttpException(
        errors.PASSWORD_NOT_MATCH,
        HttpStatus.BAD_REQUEST,
      );
    return user;
  }
}
