import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Stock } from '../types';
import { supabase } from '../lib/supabase';
//import { StockSymbolSelect } from './StockSymbolSelect';

interface UpdateStockModalProps {
  stock: Stock;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

export function UpdateStockModal({ stock, isOpen, onClose, onUpdate }: UpdateStockModalProps) {
  const [shares, setShares] = useState(stock.shares.toString());
  const [purchasePrice, setPurchasePrice] = useState(stock.purchase_price.toString());
  const [purchaseDate, setPurchaseDate] = useState(stock.purchase_date);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: updateError } = await supabase
      .from('stocks')
      .update({
        shares: Number(shares),
        purchase_price: Number(purchasePrice),
        purchase_date: purchaseDate,
      })
      .eq('id', stock.id);

    if (updateError) {
      setError(updateError.message);
    } else {
      onUpdate();
      onClose();
    }

    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Update Stock: {stock.symbol}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Shares
            </label>
            <input
              type="number"
              step="1"
              required
              value={shares}
              onChange={(e) => setShares(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Purchase Price
            </label>
            <input
              type="number"
              step="1"
              required
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Purchase Date
            </label>
            <input
              type="date"
              required
              max={today}
              value={purchaseDate}
              onChange={(e) => setPurchaseDate(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {error && (
            <div className="text-sm text-red-600">{error}</div>
          )}

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loading ? 'Updating...' : 'Update Stock'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}