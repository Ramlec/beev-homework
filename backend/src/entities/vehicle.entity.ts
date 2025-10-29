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

    @Column("enum", { enum: ["available", "charging", "in_use"] })
    status: string;

    @Column("date")
    lastUpdated: Date;

    @Column("float")
    averageEnergyConsumption: number;

    @Column("enum", { enum: ["BEV", "ICE"] })
    type: string;

    @Column("float")
    emission_gco2_km: number;
}