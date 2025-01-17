import { stockSymbols } from '../data/stockSymbols';

interface StockSymbolSelectProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function StockSymbolSelect({ value, onChange, className = '' }: StockSymbolSelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm
        ${value ? '' : 'text-gray-800'} ${className} bg-white`}
      required
    >
      <option value="" disabled>Select a symbol</option>
      {stockSymbols.map(({ symbol, name }) => (
        <option key={symbol} value={symbol}>
          {symbol} - {name}
        </option>
      ))}
    </select>
  );
}