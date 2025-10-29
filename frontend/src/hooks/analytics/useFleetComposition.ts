import { useQuery } from '@tanstack/react-query';

export interface FleetCompositionItem {
  type: 'BEV' | 'ICE';
  count: number;
}

export function useFleetComposition() {
  return useQuery<FleetCompositionItem[]>({
    queryKey: ['analytics', 'fleet-composition'],
    queryFn: async () => {
      const response = await fetch('/api/analytics/fleet-composition');
      if (!response.ok) {
        throw new Error('Failed to fetch fleet composition');
      }
      const data = await response.json() as { fleetDistribution: FleetCompositionItem[] };
      return data.fleetDistribution;
    },
  });
}


