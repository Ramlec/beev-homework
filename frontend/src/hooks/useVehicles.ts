import { useQuery } from '@tanstack/react-query';

export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  batteryCapacity: number;
  currentChargeLevel: number;
  status: 'available' | 'charging' | 'in_use';
  lastUpdated: string;
  averageEnergyConsumption: number;
  type: 'BEV' | 'ICE';
  emission_gco2_km: number;
}

interface UseVehiclesOptions {
  page?: number;
  limit?: number;
}

export interface UseVehiclesResult {
  data: Vehicle[] | undefined;
  isLoading: boolean;
  error: Error | null;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export function useVehicles(options: UseVehiclesOptions = {}): UseVehiclesResult {
  const { page = 1, limit = 10 } = options;

  const query = useQuery<Vehicle[]>({
    queryKey: ['vehicles', page, limit],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('limit', limit.toString());

      const response = await fetch(`/api/vehicles?${params.toString()}`);

      if (!response.ok) {
        throw new Error('Failed to fetch vehicles');
      }

      return response.json();
    },
  });

  const vehicles = query.data;
  const hasNextPage = vehicles ? vehicles.length === limit : false; // TODO: modify header to get the total number of vehicles
  const hasPreviousPage = page > 1;

  return {
    data: vehicles,
    isLoading: query.isLoading,
    error: query.error as Error | null,
    hasNextPage,
    hasPreviousPage,
  };
}

