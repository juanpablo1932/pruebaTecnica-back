import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { errors } from '../utils/constants/global.constants';
import { Rols } from './entities/rols.entity';

@Injectable()
export class RolsService {
  constructor(
    @InjectRepository(Rols)
    private readonly rolsRepository: Repository<Rols>,
  ) {}
  async getRolById(id: number) {
    try {
      return await this.rolsRepository.findOneOrFail({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(errors.ROL_DOES_NOT_EXIST);
    }
  }
}
