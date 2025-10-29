import { Controller, Get, Header, Param, Query } from "@nestjs/common";
import { VehicleService } from "../services/vehicle.service";

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
}