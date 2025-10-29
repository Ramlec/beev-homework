import { useQuery } from '@tanstack/react-query';

export interface FleetStatusDistributionItem {
  status: 'available' | 'charging' | 'in_use' | string;
  count: number;
  ratePercentage?: number;
}

export function useFleetOperational() {
  return useQuery<FleetStatusDistributionItem[]>({
    queryKey: ['analytics', 'fleet-operational'],
    queryFn: async () => {
      const response = await fetch('/api/analytics/fleet-operational');
      if (!response.ok) {
        throw new Error('Failed to fetch fleet operational status');
      }
      const data = await response.json() as { fleetStatusDistribution: FleetStatusDistributionItem[] };
      return data.fleetStatusDistribution;
    },
  });
}

