import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import * as dotenv from 'dotenv';
dotenv.config();

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(<string>process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,

  synchronize: process.env.SYNCHRONIZE === 'true',
  logging: process.env.DATABASE_LOGGING === 'true',
  entities: ['dist/src/**/entities/*.entity.js'],
  migrationsTableName: 'migrations',
  migrations: ['dist/src/migrations/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export default config;
