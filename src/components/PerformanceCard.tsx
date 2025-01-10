import { TrendingUp, TrendingDown } from 'lucide-react';
import { StockPerformance } from '../utils/stockCalculations';

interface PerformanceCardProps {
  title: string;
  stocks: StockPerformance[];
  type: 'gain' | 'loss';
}

export function PerformanceCard({ title, stocks, type }: PerformanceCardProps) {
  const Icon = type === 'gain' ? TrendingUp : TrendingDown;
  const colorClass = type === 'gain' ? 'text-green-500' : 'text-red-500';

  return (
    <div className="bg-lightBlue p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <Icon className={`h-6 w-6 ${colorClass}`} />
      </div>
      <div className="space-y-3">
        {stocks.map(stock => (
          <div key={stock.id} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
            <div>
              <span className="font-medium">{stock.symbol}</span>
              <span className="text-sm text-gray-500 ml-2">
                ${stock.currentPrice.toFixed(2)}
              </span>
            </div>
            <span className={colorClass}>
              {type === 'gain' ? '+' : ''}{stock.percentageChange.toFixed(2)}%
            </span>
          </div>
        ))}
        {stocks.length === 0 && (
          <p className="text-gray-500 text-sm text-center">No {type === 'gain' ? 'gainers' : 'losers'} to display</p>
        )}
      </div>
    </div>
  );
}