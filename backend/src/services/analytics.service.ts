import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { VehicleEntity } from "../entities/vehicle.entity";
import { Repository } from "typeorm";

@Injectable()
export class AnalyticsService {
    constructor(
        @InjectRepository(VehicleEntity)
        private readonly vehicleRepository: Repository<VehicleEntity>,
    ) { }

    /**
     * Get the average energy consumption by model
     * @returns The average energy consumption by model
     */
    async getAverageEnergyConsumptionByModel() {
        const averageEnergyConsumptionByModel: { type: string, model: string, averageEnergyConsumption: number }[] = await this.vehicleRepository.createQueryBuilder('vehicle')
            .select('vehicle.type', 'type')
            .addSelect('vehicle.model', 'model')
            .addSelect('AVG(vehicle.averageEnergyConsumption)', 'averageEnergyConsumption')
            .addSelect('AVG(vehicle.averageEnergyConsumption)', 'averageEnergyConsumption')
            .groupBy('vehicle.type')
            .addGroupBy('vehicle.model')
            .getRawMany();

        return averageEnergyConsumptionByModel;
    }

    /**
     * Get the Emissions comparison between type (BEV and ICE) vehicles
     * @returns The type emission comparison
     */
    async getTypeEmissionComparison() {
        const typeEmissionComparison: { type: string, emission_gco2_km: number }[] = await this.vehicleRepository.createQueryBuilder('vehicle')
            .select('vehicle.type', 'type')
            .addSelect('AVG(vehicle.emission_gco2_km)', 'emission_gco2_km')
            .groupBy('vehicle.type')
            .getRawMany();

        return typeEmissionComparison;
    }

    /**
     * Get the fleet distribution of BEV vs. ICE vehicles
     * @returns The fleet distribution
     */
    async getFleetDistribution() {
        const fleetComposition: { type: string, count: number }[] = await this.vehicleRepository.createQueryBuilder('vehicle')
            .select('vehicle.type', 'type')
            .addSelect('COUNT(vehicle.id)', 'count')
            .groupBy('vehicle.type')
            .getRawMany();

        return fleetComposition;
    }

    /**
     * Get the number of vehicles by status (available, charging or currently in use) and the percentage of each status
     * @returns The fleet status distribution
     */
    async getFleetStatusDistribution() {
        const totalVehicles = await this.vehicleRepository.count();

        const fleetStatus: { status: string, count: number, ratePercentage?: number }[] = await this.vehicleRepository.createQueryBuilder('vehicle')
            .select('vehicle.status', 'status')
            .addSelect('COUNT(vehicle.id)', 'count')
            .groupBy('vehicle.status')
            .getRawMany();

        fleetStatus.forEach(status => {
            status.ratePercentage = Math.round((status.count / totalVehicles) * 100);
        });

        return fleetStatus;
    }
}