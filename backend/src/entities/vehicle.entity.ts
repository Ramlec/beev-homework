import { VehicleStatus, VehicleType } from "src/model/vehicle.type";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class VehicleEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    brand: string;

    @Column()
    model: string;

    @Column("integer")
    batteryCapacity: number;

    @Column("float")
    currentChargeLevel: number;

    @Column("enum", { enum: VehicleStatus })
    status: string;

    @Column("date")
    lastUpdated: Date;

    @Column("float")
    averageEnergyConsumption: number;

    @Column("enum", { enum: VehicleType })
    type: string;

    @Column("float")
    emission_gco2_km: number;
}