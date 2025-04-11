import React from 'react';
import { format } from 'date-fns';
import { X } from 'lucide-react';
import { OrderStatus } from '../types';

interface OrderWithHistory {
  status_history: Array<{
    status: OrderStatus;
    timestamp: string;
  }>;
}

interface OrderStatusHistoryProps {
  order: OrderWithHistory;
  onClose: () => void;
}

export function OrderStatusHistory({ order, onClose }: OrderStatusHistoryProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full m-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Status History</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          {order.status_history.map((history, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b pb-2"
            >
              <div>
                <div className="font-medium">
                  {history.status.replace(/_/g, ' ')}
                </div>
                <div className="text-sm text-gray-500">
                  {format(new Date(history.timestamp), 'PPp')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}