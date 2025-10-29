import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { VehicleEntity } from "../entities/vehicle.entity";
import { Repository } from "typeorm";

@Injectable()
export class VehicleService {
    constructor(
        @InjectRepository(VehicleEntity)
        private readonly vehicleRepository: Repository<VehicleEntity>,
    ) { }

    /**
     * Get a vehicle by its id
     * @param id - The id of the vehicle
     * @returns The vehicle
     */
    async getVehicle(id: string) {
        const vehicle = await this.vehicleRepository.findOne({ where: { id } });
        if (!vehicle) {
            throw new NotFoundException('Vehicle not found');
        }
        return vehicle;
    }

    /**
     * Get all vehicles
     * @param page - The page number
     * @param limit - The number of vehicles per page
     * @returns All vehicles
     */
    async getVehicles({ page, limit }: { page: number, limit: number }) {
        return this.vehicleRepository.find({
            skip: (page - 1) * limit,
            take: limit,
        });
    }

    /**
     * Get the total number of vehicles
     * @returns The total number of vehicles
     */
    async getTotalVehicles() {
        return this.vehicleRepository.count();
    }


    async createVehicle(vehicle: VehicleEntity) {
        return this.vehicleRepository.save(vehicle);
    }
}