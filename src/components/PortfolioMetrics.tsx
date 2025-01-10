import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { DollarSign, PieChart as PieChartIcon } from 'lucide-react';
import { PortfolioMetrics as Metrics } from '../services/portfolioAnalytics';
import { PerformanceCard } from './PerformanceCard';
import { filterAndSortPerformers } from '../utils/stockCalculations';
import { Stock } from '../types';
import { StockPrice } from '../services/stockPriceService';

interface PortfolioMetricsProps {
  metrics: Metrics;
  stocks: Stock[];
  prices: Map<string, StockPrice>;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export function PortfolioMetrics({ metrics, stocks, prices }: PortfolioMetricsProps) {
  const { topPerformers, bottomPerformers } = filterAndSortPerformers(stocks, prices);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="bg-lightBlue p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Portfolio Overview</h3>
          <DollarSign className="h-6 w-6 text-green-500" />
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Total Value</p>
            <p className="text-2xl font-bold">${metrics.totalValue.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Daily Change</p>
            <p className={`text-lg font-semibold ${metrics.dailyChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {metrics.dailyChange >= 0 ? '+' : '-'}{metrics.dailyChangePercent.toFixed(2)}%
            </p>
          </div>
        </div>
      </div>

      <div className="bg-whiteBg2 p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Sector Distribution</h3>
          <PieChartIcon className="h-6 w-6 text-blue-500" />
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={metrics.sectorDistribution}
                dataKey="value"
                nameKey="sector"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
              >
                {metrics.sectorDistribution.map((entry, index) => (
                  <Cell key={entry.sector} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <PerformanceCard
        title="Top 5 Gains"
        stocks={topPerformers}
        type="gain"
      />

      <PerformanceCard
        title="Top 5 Losses"
        stocks={bottomPerformers}
        type="loss"
      />
    </div>
  );
}