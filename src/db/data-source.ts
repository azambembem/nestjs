import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config({ path: '.env.local' });

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'testtest',
  synchronize: true,
  entities: ['./src/entity/**/*.ts'],
  migrations: ['./src/migration/**/*.ts'],
});
