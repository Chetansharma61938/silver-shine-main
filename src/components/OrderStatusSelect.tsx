import React from 'react';
import { OrderStatus } from '../types';

interface OrderStatusSelectProps {
  value: OrderStatus;
  onChange: (newStatus: OrderStatus) => void;
}

const statusOptions: { value: OrderStatus; label: string }[] = [
  { value: 'QUOTE_SENT', label: 'Quote Sent' },
  { value: 'ORDER_RECEIVED', label: 'Order Received' },
  { value: 'PAYMENT_PENDING', label: 'Payment Pending' },
  { value: 'ORDER_PARTS', label: 'Order Parts' },
  { value: 'ORDER_PARTS_DONE', label: 'Parts Ordered' },
  { value: 'PRODUCTION_START', label: 'Production Start' },
  { value: 'CUTTER_START', label: 'Cutter: Start' },
  { value: 'CUTTER_FINISH', label: 'Cutter: Finish' },
  { value: 'WELDING_START', label: 'Welding: Start' },
  { value: 'WELDING_FINISH', label: 'Welding: Finish' },
  { value: 'PRODUCTION_QC', label: 'Production QC' },
  { value: 'PAINTING', label: 'Painting' },
  { value: 'FITMENT', label: 'Fitment' },
  { value: 'FINAL_QC', label: 'Final QC' },
  { value: 'READY_FOR_DELIVERY', label: 'Ready for Delivery' },
  { value: 'DELIVERED', label: 'Delivered' },
  { value: 'MAINTENANCE', label: 'Maintenance' }
];

export function OrderStatusSelect({ value, onChange }: OrderStatusSelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as OrderStatus)}
      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
    >
      {statusOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}