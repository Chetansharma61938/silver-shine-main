import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Order, OrderStatus } from '../types';
import {
  TrendingUp,
  Package,
  AlertTriangle,
  Truck,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

interface DashboardMetric {
  title: string;
  value: number | string;
  change?: number;
  icon: React.ReactNode;
  trend?: 'up' | 'down';
}

interface OrdersByStatus {
  status: OrderStatus;
  count: number;
}

export function Dashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      const { data, error } = await supabase
        .from('order_informations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Map the orderstatus to status for compatibility
      const processedData = (data || []).map(order => ({
        ...order,
        status: order.orderstatus,
        chassis_no: order.chassisno,
        model_name: order.modelname
      }));
      
      setOrders(processedData);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }

  // Calculate metrics
  const totalOrders = orders.length;
  const ordersInProduction = orders.filter(order =>
    ['PRODUCTION_START', 'CUTTER_START', 'CUTTER_FINISH', 'WELDING_START', 'WELDING_FINISH', 'PRODUCTION_QC'].includes(order.status)
  ).length;
  const pendingDelivery = orders.filter(order => order.status === 'READY_FOR_DELIVERY').length;
  const delayedOrders = orders.filter(order =>
    new Date(order.delivery_date) < new Date() && order.status !== 'DELIVERED'
  ).length;

  const metrics: DashboardMetric[] = [
    {
      title: 'Total Orders',
      value: totalOrders,
      change: 12,
      icon: <Package className="w-6 h-6 text-blue-600" />,
      trend: 'up'
    },
    {
      title: 'In Production',
      value: ordersInProduction,
      icon: <TrendingUp className="w-6 h-6 text-orange-600" />
    },
    {
      title: 'Ready for Delivery',
      value: pendingDelivery,
      icon: <Truck className="w-6 h-6 text-green-600" />
    },
    {
      title: 'Delayed Orders',
      value: delayedOrders,
      change: -2,
      icon: <AlertTriangle className="w-6 h-6 text-red-600" />,
      trend: 'down'
    }
  ];

  // Calculate orders by status with percentages
  const allStatuses: OrderStatus[] = [
    'QUOTE_SENT',
    'ORDER_RECEIVED',
    'PAYMENT_PENDING',
    'ORDER_PARTS',
    'ORDER_PARTS_DONE',
    'PRODUCTION_START',
    'CUTTER_START',
    'CUTTER_FINISH',
    'WELDING_START',
    'WELDING_FINISH',
    'PRODUCTION_QC',
    'PAINTING',
    'FITMENT',
    'FINAL_QC',
    'READY_FOR_DELIVERY',
    'DELIVERED',
    'MAINTENANCE'
  ];

  const ordersByStatus: OrdersByStatus[] = allStatuses.map(status => ({
    status,
    count: orders.filter(order => order.status === status).length
  })).filter(status => status.count > 0); // Only show statuses with orders

  // Sort by count in descending order
  ordersByStatus.sort((a, b) => b.count - a.count);

  // Get recent orders
  const recentOrders = orders.slice(0, 5);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Status colors mapping
  const getStatusColor = (status: OrderStatus): string => {
    const colors: Record<string, string> = {
      'QUOTE_SENT': 'bg-gray-500',
      'ORDER_RECEIVED': 'bg-blue-500',
      'PAYMENT_PENDING': 'bg-yellow-500',
      'ORDER_PARTS': 'bg-purple-500',
      'ORDER_PARTS_DONE': 'bg-purple-600',
      'PRODUCTION_START': 'bg-orange-500',
      'CUTTER_START': 'bg-orange-400',
      'CUTTER_FINISH': 'bg-orange-500',
      'WELDING_START': 'bg-orange-600',
      'WELDING_FINISH': 'bg-orange-700',
      'PRODUCTION_QC': 'bg-orange-800',
      'PAINTING': 'bg-indigo-500',
      'FITMENT': 'bg-indigo-600',
      'FINAL_QC': 'bg-indigo-700',
      'READY_FOR_DELIVERY': 'bg-green-500',
      'DELIVERED': 'bg-green-600',
      'MAINTENANCE': 'bg-red-500'
    };
    return colors[status] || 'bg-gray-500';
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">
              Overview of your chassis production and orders
            </p>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">{metric.icon}</div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {metric.title}
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {metric.value}
                        </div>
                        {metric.change && (
                          <div className={`ml-2 flex items-baseline text-sm font-semibold ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                            }`}>
                            {metric.trend === 'up' ? (
                              <ArrowUpRight className="w-4 h-4" />
                            ) : (
                              <ArrowDownRight className="w-4 h-4" />
                            )}
                            <span className="sr-only">
                              {metric.trend === 'up' ? 'Increased by' : 'Decreased by'}
                            </span>
                            {metric.change}%
                          </div>
                        )}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Status Overview and Recent Orders */}
        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {/* Status Overview */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Status Overview
              </h2>
              <div className="space-y-4">
                {ordersByStatus.map(({ status, count }) => {
                  const percentage = ((count / totalOrders) * 100).toFixed(1);
                  return (
                    <div key={status} className="flex items-center">
                      <div className="w-48 text-sm text-gray-500">
                        {/* {status.replace(/_/g, ' ')} */}
                        {status ? status.replace(/_/g, ' ') : 'Unknown'}
                      </div>
                      <div className="flex-1">
                        <div className="relative h-4 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`absolute h-full ${getStatusColor(status)} rounded-full transition-all duration-500`}
                            style={{
                              width: `${percentage}%`,
                            }}
                          />
                        </div>
                      </div>
                      <div className="w-24 text-right text-sm">
                        <span className="font-medium text-gray-900">{count}</span>
                        <span className="text-gray-500 ml-1">({percentage}%)</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Recent Orders
              </h2>
              <div className="flow-root">
                <ul className="-my-5 divide-y divide-gray-200">
                  {recentOrders.map((order) => (
                    <li key={order.id} className="py-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {order.chassis_no}
                          </p>
                          <p className="text-sm text-gray-500 truncate">
                            {order.model_name}
                          </p>
                        </div>
                        <div>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.status === 'DELIVERED'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                            }`}>
                            {/* {order.status.replace(/_/g, ' ')} */}
                            {order.status ? order.status.replace(/_/g, ' ') : 'Unknown'}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}