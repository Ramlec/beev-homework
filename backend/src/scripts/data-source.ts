import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { VehicleEntity } from '../entities/vehicle.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: 'postgres',
  database: 'app_db',
  entities: [VehicleEntity],
  synchronize: true,
  logging: true,
});