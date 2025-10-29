import { useFleetEfficiency } from '@/hooks/analytics/useFleetEfficiency';

export function FleetEfficiencyStatistics() {
  const { data: fleetEfficiency, isLoading } = useFleetEfficiency();


  const bevEmissions = fleetEfficiency?.typeEmissionComparison.find(item => item.type === 'BEV')?.emission_gco2_km ?? 0;
  const iceEmissions = fleetEfficiency?.typeEmissionComparison.find(item => item.type === 'ICE')?.emission_gco2_km ?? 0;

  const bevVehicles = fleetEfficiency?.averageEnergyConsumptionByModel.filter(item => item.type === 'BEV') ?? [];
  const iceVehicles = fleetEfficiency?.averageEnergyConsumptionByModel.filter(item => item.type === 'ICE') ?? [];

  const averageBevConsumption = (bevVehicles
    .reduce((sum, item) => sum + item.averageEnergyConsumption, 0) / bevVehicles.length);
  const averageIceConsumption = (iceVehicles
    .reduce((sum, item) => sum + item.averageEnergyConsumption, 0) / iceVehicles.length);



  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Impact environnemental</h2>
        <div className="space-y-4">

          <div>
            <div className="text-sm text-muted-foreground mb-1">Consommation moyenne ICE</div>
            <div className="text-lg font-semibold">{averageIceConsumption.toFixed(2)} L/100km</div>
            <div className="text-sm text-muted-foreground mb-1">Émissions moyennes (gCO₂/km)</div>
            <div className="text-lg font-semibold">{iceEmissions.toFixed(1)} gCO₂/km</div>
          </div>
          <div className="pt-4 border-t border-border">
            <div className="text-sm text-muted-foreground mb-1">Consommation moyenne BEV</div>
            <div className="text-lg font-semibold">{averageBevConsumption.toFixed(2)} kWh/100km</div>
            <div className="text-sm text-muted-foreground mb-1">Émissions moyennes (gCO₂/km)</div>
            <div className="text-lg font-semibold">{bevEmissions.toFixed(1)} gCO₂/km</div>
          </div>
        </div>
      </div>

    </>
  );
}

