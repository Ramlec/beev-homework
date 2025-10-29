import { Body, Controller, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { VehicleService } from "../services/vehicle.service";
import { VehicleEntity } from "src/entities/vehicle.entity";
import { CreateVehicleDto, GetVehicleDto, GetVehiclesDto, PatchVehicleDto } from "src/dto/vehicle.dto";
import { VehicleStatus } from "src/model/vehicle.type";

@Controller('vehicles')
export class VehicleController {
    constructor(private readonly vehicleService: VehicleService) { }

    @Get('/:id')
    async getVehicle(@Param() { id }: GetVehicleDto) {
        return this.vehicleService.getVehicle(id);
    }

    @Get()
    async getVehicles(@Query() { limit = 10, page = 1 }: GetVehiclesDto) {
        return this.vehicleService.getVehicles({ page, limit });
    }

    @Post()
    async createVehicle(@Body() vehicle: CreateVehicleDto) {
        const vehicleEntity = new VehicleEntity();
        vehicleEntity.brand = vehicle.brand;
        vehicleEntity.model = vehicle.model;
        vehicleEntity.batteryCapacity = vehicle.batteryCapacity;
        vehicleEntity.type = vehicle.type;
        vehicleEntity.averageEnergyConsumption = 0;
        vehicleEntity.emission_gco2_km = 0;
        vehicleEntity.status = VehicleStatus.AVAILABLE;
        vehicleEntity.currentChargeLevel = 100;
        vehicleEntity.lastUpdated = new Date();

        return this.vehicleService.createVehicle(vehicleEntity);
    }

    @Patch('/:id')
    async patchVehicle(@Param() { id }: GetVehicleDto, @Body() vehicle: PatchVehicleDto) {
        const vehicleEntity = new VehicleEntity();

        vehicleEntity.brand = vehicle.brand;
        vehicleEntity.model = vehicle.model;
        vehicleEntity.batteryCapacity = vehicle.batteryCapacity;
        vehicleEntity.type = vehicle.type;
        vehicleEntity.averageEnergyConsumption = vehicle.averageEnergyConsumption;
        vehicleEntity.emission_gco2_km = vehicle.emission_gco2_km;
        vehicleEntity.status = vehicle.status;
        vehicleEntity.currentChargeLevel = vehicle.currentChargeLevel;

        const fieldsToUpdate: Partial<VehicleEntity> = 
            Object.values(vehicleEntity).filter(Boolean) as Partial<VehicleEntity>;

        fieldsToUpdate.lastUpdated = new Date();

        return this.vehicleService.updateVehicle(id, vehicleEntity);
    }
}