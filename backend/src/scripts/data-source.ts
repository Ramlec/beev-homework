import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Vehicle } from '../entities/vehicle.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5433,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  database: process.env.DB_NAME || 'app_db',
  entities: [Vehicle],
  synchronize: true,
  logging: true,
});