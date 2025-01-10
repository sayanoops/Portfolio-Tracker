import { Stock } from '../types';
import { StockPrice } from '../services/stockPriceService';

export interface StockPerformance extends Stock {
  currentPrice: number;
  percentageChange: number;
}

export function calculateStockPerformance(
  stock: Stock,
  prices: Map<string, StockPrice>
): StockPerformance {
  const currentPrice = prices.get(stock.symbol)?.price || stock.purchase_price;
  const percentageChange = ((currentPrice - stock.purchase_price) / stock.purchase_price) * 100;

  return {
    ...stock,
    currentPrice,
    percentageChange,
  };
}

export function filterAndSortPerformers(
  stocks: Stock[],
  prices: Map<string, StockPrice>
): {
  topPerformers: StockPerformance[];
  bottomPerformers: StockPerformance[];
} {
  const performanceData = stocks.map(stock => calculateStockPerformance(stock, prices));

  const gainers = performanceData.filter(stock => stock.percentageChange > 0)
    .sort((a, b) => b.percentageChange - a.percentageChange);

  const losers = performanceData.filter(stock => stock.percentageChange < 0)
    .sort((a, b) => a.percentageChange - b.percentageChange);

  return {
    topPerformers: gainers.slice(0, 5),
    bottomPerformers: losers.slice(0, 5)
  };
}