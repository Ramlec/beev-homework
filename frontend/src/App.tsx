import { FleetCompositionStatistics } from './components/dashboard/FleetCompositionStatistics';
import { FleetOperationalStatistics } from './components/dashboard/FleetOperationalStatistics';
import { FleetEfficiencyStatistics } from './components/dashboard/FleetEfficiencyStatistics';

function App() {


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <FleetCompositionStatistics />
        <FleetOperationalStatistics />
        <FleetEfficiencyStatistics />
      </div>
    </div>
  );
}

export default App
