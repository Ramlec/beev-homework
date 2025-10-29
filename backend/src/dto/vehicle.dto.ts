import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUUID } from 'class-validator';
import { VehicleStatus, VehicleType } from 'src/model/vehicle.type';

export class GetVehicleDto {
    @IsUUID()
    @IsNotEmpty()
    id: string;
}

export class GetVehiclesDto {
    @IsNumber()
    @IsPositive()
    @IsOptional()
    page: number;
    
    @IsNumber()
    @IsPositive()
    @IsOptional()
    limit: number;
}

export class CreateVehicleDto {
    @IsString()
    @IsNotEmpty()
    brand: string;
    @IsString()
    @IsNotEmpty()
    model: string;
    @IsNumber()
    @IsNotEmpty()
    batteryCapacity: number;
    @IsEnum(VehicleType)
    @IsNotEmpty()
    type: VehicleType;
}

export class UpdateVehicleDto extends CreateVehicleDto {
    @IsNumber()
    @IsNotEmpty()
    averageEnergyConsumption: number;
    @IsNumber()
    @IsNotEmpty()
    emission_gco2_km: number;
    @IsEnum(VehicleStatus)
    @IsNotEmpty()
    status: VehicleStatus;
    @IsNumber()
    @IsNotEmpty()
    currentChargeLevel: number;
}

export class PatchVehicleDto extends PartialType(UpdateVehicleDto) {
    @IsOptional()
    brand: string;
    @IsOptional()
    model: string;
    @IsOptional()
    batteryCapacity: number;
    @IsOptional()
    type: VehicleType;
    @IsOptional()
    averageEnergyConsumption: number;
    @IsOptional()
    emission_gco2_km: number;
    @IsOptional()
    status: VehicleStatus;
    @IsOptional()
    currentChargeLevel: number;
}