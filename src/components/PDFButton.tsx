import React from 'react';
import { FileText } from 'lucide-react';
import { pdf } from '@react-pdf/renderer';
import { OrderPDF } from './OrderPDF';
import { Order } from '../types';
import { supabase } from '../lib/supabase';

interface PDFButtonProps {
  order: Order;
}

export function PDFButton({ order }: PDFButtonProps) {
  const [loading, setLoading] = React.useState(false);

  const generatePDF = async () => {
    try {
      setLoading(true);

      // Fetch customer details
      const { data: customer } = await supabase
        .from('customers')
        .select('name, email, phone')
        .eq('id', order.customer_id)
        .single();

      if (!customer) {
        throw new Error('Customer not found');
      }

      // Generate PDF blob
      const blob = await pdf(
        <OrderPDF order={order} customer={customer} />
      ).toBlob();

      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `order-${order.chassis_no}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={generatePDF}
      disabled={loading}
      className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
    >
      <FileText className="w-4 h-4" />
      {loading ? 'Generating...' : 'PDF'}
    </button>
  );
}