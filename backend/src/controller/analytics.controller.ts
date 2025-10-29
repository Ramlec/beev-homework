import { Controller, Get, Param, Query } from "@nestjs/common";
import { VehicleEntity } from "src/entities/vehicle.entity";
import { AnalyticsService } from "src/services/analytics.service";
import { VehicleService } from "src/services/vehicle.service";

@Controller('analytics')
export class AnalyticsController {
    constructor(private readonly analyticsService: AnalyticsService) { }

    @Get('/fleet-efficiency')
    async getFleetEfficiency() {
        const averageEnergyConsumptionByModel = await this.analyticsService.getAverageEnergyConsumptionByModel();
        const typeEmissionComparison = await this.analyticsService.getTypeEmissionComparison();

        return {
            averageEnergyConsumptionByModel,
            typeEmissionComparison,
        };
    }

    @Get('/fleet-composition')
    async getFleetComposition() {
        const fleetDistribution = await this.analyticsService.getFleetDistribution();
        return {
            fleetDistribution,
        };
    }

    @Get('/fleet-operational')
    async getFleetOperational() {
        const fleetStatusDistribution = await this.analyticsService.getFleetStatusDistribution();
        return {
            fleetStatusDistribution,
        };
    }
}