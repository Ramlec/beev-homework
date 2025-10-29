import { useQuery } from '@tanstack/react-query';

export interface AverageEnergyConsumptionByModel {
  type: string;
  model: string;
  averageEnergyConsumption: number;
}

export interface TypeEmissionComparison {
  type: string;
  emission_gco2_km: number;
}

export interface FleetEfficiencyData {
  averageEnergyConsumptionByModel: AverageEnergyConsumptionByModel[];
  typeEmissionComparison: TypeEmissionComparison[];
}

export function useFleetEfficiency() {
  return useQuery<FleetEfficiencyData>({
    queryKey: ['analytics', 'fleet-efficiency'],
    queryFn: async () => {
      const response = await fetch('/api/analytics/fleet-efficiency');
      if (!response.ok) {
        throw new Error('Failed to fetch fleet efficiency');
      }
      return response.json() as Promise<FleetEfficiencyData>;
    },
  });
}

