import { useFleetOperational } from '@/hooks/analytics/useFleetOperational';


export function FleetOperationalStatistics() {

  const { data: fleetStatus, isLoading } = useFleetOperational();

  const availableCount = fleetStatus?.find(item => item.status === 'available')?.count || 0;
  const chargingCount = fleetStatus?.find(item => item.status === 'charging')?.count || 0;
  const inUseCount = fleetStatus?.find(item => item.status === 'in_use')?.count || 0;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Parc disponible</h2>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-sm">Disponible</span>
          </div>
          <span className="text-sm font-medium">{availableCount}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-sm">En charge</span>
          </div>
          <span className="text-sm font-medium">{chargingCount}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span className="text-sm">En utilisation</span>
          </div>
          <span className="text-sm font-medium">{inUseCount}</span>
        </div>
      </div>
    </div>
  );
}

