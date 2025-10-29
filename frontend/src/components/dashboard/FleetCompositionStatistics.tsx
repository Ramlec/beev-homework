import { useFleetComposition } from '@/hooks/analytics/useFleetComposition';

export function FleetCompositionStatistics() {

    const { data: fleetComposition, isLoading } = useFleetComposition();

    const totalVehicles = fleetComposition?.reduce((acc, item) => acc + Number(item.count), 0) ?? 0;
    const bevCount = fleetComposition?.find(item => item.type === 'BEV')?.count ?? 0;
    const iceCount = fleetComposition?.find(item => item.type === 'ICE')?.count ?? 0;
    const bevPercentage = totalVehicles > 0 ? Math.round((bevCount / totalVehicles) * 100) : 0;
    const icePercentage = totalVehicles > 0 ? Math.round((iceCount / totalVehicles) * 100) : 0;

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Composition du Parc</h2>
            <div className="space-y-4">
                <div>
                    <div className="text-3xl font-bold text-primary">{totalVehicles}</div>
                    <div className="text-sm text-muted-foreground">Total Vehicles</div>
                </div>
                <div className="pt-4 border-t border-border">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">BEV</span>
                        <span className="text-sm font-medium">{bevCount} ({bevPercentage}%)</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">ICE</span>
                        <span className="text-sm font-medium">{iceCount} ({icePercentage}%)</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

