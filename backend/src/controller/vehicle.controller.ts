import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { VehicleService } from "../services/vehicle.service";
import { VehicleEntity } from "src/entities/vehicle.entity";
import { CreateVehicleDto } from "src/dto/vehicle.dto";
import { VehicleStatus } from "src/model/vehicle.type";

@Controller('vehicles')
export class VehicleController {
    constructor(private readonly vehicleService: VehicleService) { }

    @Get('/:id')
    async getVehicle(@Param('id') id: string) {
        return this.vehicleService.getVehicle(id);
    }

    @Get()
    async getVehicles(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
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
}