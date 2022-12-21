import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

config();

const {
  TYPEORM_TYPE,
  TYPEORM_HOST,
  TYPEORM_PORT,
  TYPEORM_USERNAME,
  TYPEORM_PASSWORD,
  TYPEORM_DATABASE,
} = process.env;

export default new DataSource({
  type: TYPEORM_TYPE,
  host: TYPEORM_HOST,
  port: +TYPEORM_PORT,
  username: TYPEORM_USERNAME,
  password: TYPEORM_PASSWORD,
  database: TYPEORM_DATABASE,
  entities: [__dirname + '/src/**/*.entity.{ts,js}'],
  migrations: [__dirname + '/src/database/migrations/*{.ts,.js}'],
  migrationsTableName: 'migration',
} as DataSourceOptions);
