import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

export const ORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 54320,
  username: 'postgres',
  password: 'Inlaze2023',
  database: 'postgres',
  entities: [__dirname + '/users/entities/*.entity.{js,ts}'],
  synchronize: false,
  migrations: [__dirname + '/migrations/*.{js,ts}'],
  dropSchema: false,
  autoLoadEntities: true,
  migrationsTableName: 'migrations',
  retryAttempts: 3,
  retryDelay: 3000,
};
export const connectionSource = new DataSource(ORMConfig as DataSourceOptions);
