import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { errors, success } from '../utils/constants/global.constants';
import { Rols } from './entities/rols.entity';
import { CreateRolDto, CreateRolResponseDto } from './dto/create-rol.dto';
import { UpdateRolDto, UpdateRols } from './dto/update-rol.dto';

@Injectable()
export class RolsService {
  constructor(
    @InjectRepository(Rols)
    private readonly rolsRepository: Repository<Rols>,
  ) {}
  async getRolById(id: number) {
    try {
      return await this.rolsRepository.findOneOrFail({
        where: { id, is_deleted: false },
      });
    } catch (error) {
      throw new NotFoundException(errors.ROL_DOES_NOT_EXIST);
    }
  }

  public async getAllRols(): Promise<Rols[]> {
    return await this.rolsRepository.find({ where: { is_deleted: false } });
  }

  async create(createRolDto: CreateRolDto): Promise<CreateRolResponseDto> {
    const existingRol = await this.rolsRepository.findOne({
      where: { name: createRolDto.name },
    });
    if (existingRol) {
      throw new HttpException(errors.EMAIL_EXIST, HttpStatus.BAD_REQUEST);
    }

    const rol = new Rols();
    rol.name = createRolDto.name;
    rol.is_deleted = false;

    const savedRol = await this.rolsRepository.save(rol);

    const userResponse = new CreateRolResponseDto();
    userResponse.name = savedRol.name;

    return userResponse;
  }

  private async updateRolAndReturnId(
    id: number,
    user: object,
  ): Promise<object[]> {
    try {
      const updatedUser = await this.rolsRepository
        .createQueryBuilder('roles')
        .update(Rols)
        .set(user)
        .where('id = :rolId', { rolId: id })
        .returning('id')
        .execute();

      return [
        {
          rol_id: updatedUser.raw[0].id,
          rol_name: updatedUser.raw[0].name,
          message: success.ROL_UPDATED,
        },
      ];
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateRolById(params: UpdateRolDto) {
    const rolData = await this.getRolById(params.id);

    if (!rolData) throw new NotFoundException(errors.ROL_DOES_NOT_EXIST);

    const updateUser = {} as UpdateRols;

    if (params.name) {
      updateUser.name = params.name;
    }

    const update = await this.updateRolAndReturnId(rolData.id, updateUser);

    return update;
  }

  async deleteRolById(id: number) {
    const rolData = await this.getRolById(id);

    if (!rolData) throw new NotFoundException(errors.USER_DOES_NOT_EXIST);

    await this.updateRolAndReturnId(rolData.id, {
      is_deleted: true,
    });
  }
}
