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

    /**
     * Create a vehicle
     * @param vehicle - The vehicle to create, only brand, model, batteryCapacity and type will be used
     * @returns The created vehicle
     */
    async createVehicle(vehicle: VehicleEntity) {
        return this.vehicleRepository.save(vehicle);
    }

    /**
     * Patch a vehicle
     * @param id - The id of the vehicle
     * @param vehicle - The vehicle to edit, only the fields that are provided will be updated, except for the id
     * @returns The edited vehicle
     */
    async updateVehicle(id: string, vehicle: VehicleEntity) {
        await this.vehicleRepository.update(id, vehicle);
        return this.getVehicle(id);
    }
}