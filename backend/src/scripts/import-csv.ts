import * as fs from "fs";
import * as path from "path";
import * as csv from "csv-parser";

import { AppDataSource } from "./data-source";
import { Vehicle } from "../entities/vehicle.entity";

interface ImportCSVProps {
    ID: string;
    Brand: string;
    Model: string;
    BatteryCapacity: number;
    CurrentChargeLevel: number;
    Status: string;
    LastUpdated: Date;
    AverageEnergyConsumption: number;
    Type: string;
    Emission_gco2_km: number;
}

export const parseCsv = async (fileName: string) => {
    const filePath = path.resolve(__dirname, fileName);
    console.log(filePath);

    const results: ImportCSVProps[] = [];
    return new Promise<ImportCSVProps[]>((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on("data", (data) => {
                const [
                    ID,
                    Brand,
                    Model,
                    BatteryCapacity,
                    CurrentChargeLevel,
                    Status,
                    LastUpdated,
                    AverageEnergyConsumption,
                    Type,
                    Emission_gco2_km,
                ] = Object.values(data) as any;
                results.push({
                    ID,
                    Brand,
                    Model,
                    BatteryCapacity,
                    CurrentChargeLevel,
                    Status,
                    LastUpdated,
                    AverageEnergyConsumption,
                    Type,
                    Emission_gco2_km,
                });
            })
            .on("error", (err) => {
                reject(err);
            })
            .on("end", () => {
                resolve(results);
            });
    });
};

async function run() {
    console.log("Running import CSV");
    const vehiclesToInsert = await parseCsv("../../../data/cars.csv");

    await AppDataSource.initialize();

    const vehicleEntities: any[] = vehiclesToInsert.map((vehicle) => {


        return {
            id: vehicle.ID,
            brand: vehicle.Brand,
            model: vehicle.Model,
            batteryCapacity: vehicle.BatteryCapacity ?? 0,
            currentChargeLevel: vehicle.CurrentChargeLevel ?? 0.0,
            status: vehicle.Status,
            lastUpdated: vehicle.LastUpdated,
            averageEnergyConsumption: vehicle.AverageEnergyConsumption,
            type: vehicle.Type,
            emission_gco2_km: vehicle.Emission_gco2_km,
        };
    });
    const vehicleRepository = AppDataSource.getRepository(Vehicle);
    await vehicleRepository.save(vehicleEntities);

    console.log(`Imported ${vehicleEntities.length} vehicles`);
    console.log("Import CSV completed");
    await AppDataSource.destroy();
}

run().catch((err) => {
    console.error("Error during import:", err);
    process.exit(1);
});
