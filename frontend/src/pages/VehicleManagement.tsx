import { useVehicles } from "@/hooks/useVehicles";
import { flexRender, getCoreRowModel, useReactTable, ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { Vehicle } from "@/hooks/useVehicles";
import { Button } from "@/components/ui/button";

export function VehicleManagement(){
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    
    const { data: vehicles, isLoading, error, hasNextPage, hasPreviousPage } = useVehicles({ page, limit });

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'available':
                return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
            case 'charging':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
            case 'in_use':
                return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
            default:
                return 'bg-muted text-muted-foreground';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'available':
                return 'Disponible';
            case 'charging':
                return 'En charge';
            case 'in_use':
                return 'En utilisation';
            default:
                return status;
        }
    };

    const columns = useMemo<ColumnDef<Vehicle>[]>(() => [
        {
            header: 'Marque',
            accessorKey: 'brand',
            cell: ({ row }) => (
                <span className="font-medium">{row.getValue('brand')}</span>
            ),
        },
        {
            header: 'Modèle',
            accessorKey: 'model',
        },
        {
            header: 'Type',
            accessorKey: 'type',
            cell: ({ row }) => (
                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-secondary text-secondary-foreground">
                    {row.getValue('type')}
                </span>
            ),
        },
        {
            header: 'État',
            accessorKey: 'status',
            cell: ({ row }) => {
                const status = row.getValue('status') as string;
                return (
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusBadge(status)}`}>
                        {getStatusLabel(status)}
                    </span>
                );
            },
        },
        {
            header: 'Batterie',
            accessorKey: 'batteryCapacity',
            cell: ({ row }) => {
                const vehicle = row.original;
                return (
                    <div className="flex flex-col">
                        <span className="text-sm font-medium">
                            {vehicle.currentChargeLevel.toFixed(1)}%
                        </span>
                        <span className="text-xs text-muted-foreground">
                            {(vehicle.currentChargeLevel * vehicle.batteryCapacity / 100).toFixed(0)}/{vehicle.batteryCapacity} kWh
                        </span>
                    </div>
                );
            },
        },
        {
            header: 'Consommation',
            accessorKey: 'averageEnergyConsumption',
            cell: ({ row }) => {
                const value = row.getValue('averageEnergyConsumption') as number;

                const type = row.getValue('type') as string;
                if (type === 'BEV') {
                    return `${value.toFixed(2)} kWh/100km`;
                } else {
                    return `${value.toFixed(2)} L/100km`;
                }
            },
        },
        {
            header: 'Émissions',
            accessorKey: 'emission_gco2_km',
            cell: ({ row }) => {
                const value = row.getValue('emission_gco2_km') as number;
                return `${value.toFixed(1)} gCO₂/km`;
            },
        },
        {
            header: 'Dernière MàJ',
            accessorKey: 'lastUpdated',
            cell: ({ row }) => {
                const dateString = row.getValue('lastUpdated') as string;
                return (
                    <span className="text-sm text-muted-foreground">
                        {formatDate(dateString)}
                    </span>
                );
            },
        },
    ], [formatDate, getStatusBadge, getStatusLabel]);

    const table = useReactTable({
        data: vehicles ?? [],
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const handleLimitChange = (newLimit: number) => {
        setLimit(newLimit);
        setPage(1);
    };


    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">Gestion des Véhicules</h1>
                
                <div className="flex items-center gap-4">
                    <label htmlFor="limit" className="text-sm text-muted-foreground">
                        Affichage:
                    </label>
                    <select
                        id="limit"
                        value={limit}
                        onChange={(e) => handleLimitChange(Number(e.target.value))}
                        className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                </div>
            </div>
            
            <div className="rounded-md border border-border bg-card shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            {
                                table.getHeaderGroups().map((headerGroup) => (
                                    <tr key={headerGroup.id} className="border-b border-border bg-muted/50">
                                        {headerGroup.headers.map((header) => (
                                            <th key={header.id} className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                            </th>
                                        ))}
                                    </tr>
                                ))
                            }
                        </thead>
                        <tbody>
                            {table.getRowModel().rows.length > 0 ? (
                                table.getRowModel().rows.map((row) => (
                                    <tr key={row.id} className="border-b border-border transition-colors hover:bg-muted/50">
                                        {row.getVisibleCells().map((cell) => (
                                            <td key={cell.id} className="p-4 align-middle">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={columns.length} className="p-8 text-center text-muted-foreground">
                                        Aucun véhicule trouvé
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                
                <div className="flex items-center justify-between border-t border-border px-4 py-3 bg-muted/30">
                    <div className="text-sm text-muted-foreground">
                        Page {page}
                        {vehicles && vehicles.length > 0 && (
                            <span> • {vehicles.length} véhicule{vehicles.length > 1 ? 's' : ''} affiché{vehicles.length > 1 ? 's' : ''}</span>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(page - 1)}
                            disabled={!hasPreviousPage}
                        >
                            Précédent
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(page + 1)}
                            disabled={!hasNextPage}
                        >
                            Suivant
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}