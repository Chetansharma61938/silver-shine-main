import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Edit2, Save, X, History } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Order, Customer, OrderStatus } from '../types';
import { PDFButton } from '../components/PDFButton';
import { FormInput } from '../components/forms/FormInput';
import { FormSelect } from '../components/forms/FormSelect';
import { FormCheckbox } from '../components/forms/FormCheckbox';
import { OrderStatusSelect } from '../components/OrderStatusSelect';
import { OrderStatusHistory } from '../components/OrderStatusHistory';
import toast from 'react-hot-toast';

export function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editedOrder, setEditedOrder] = useState<Order | null>(null);
  const [saving, setSaving] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  async function fetchOrderDetails() {
    try {
      const { data: orderData, error: orderError } = await supabase
        .from('order_informations')
        .select('*')
        .eq('id', id)
        .single();

      if (orderError) throw orderError;
      if (!orderData) throw new Error('Order not found');

      // Map the fields to match the Order type
      const processedOrder = {
        ...orderData,
        status: orderData.orderstatus,
        chassis_no: orderData.chassisno,
        model_name: orderData.modelname
      };

      setOrder(processedOrder);
      setEditedOrder(processedOrder);

      const { data: customerData, error: customerError } = await supabase
        .from('customers')
        .select('*')
        .eq('id', orderData.customer_id)
        .single();

      if (customerError) throw customerError;
      setCustomer(customerData);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error fetching order details');
    } finally {
      setLoading(false);
    }
  }

  const handleStatusChange = async (newStatus: OrderStatus) => {
    if (!editedOrder) return;

    try {
      setSaving(true);
      const { error } = await supabase
        .from('order_informations')
        .update({ orderstatus: newStatus })
        .eq('id', id);

      if (error) throw error;

      setEditedOrder(prev => prev ? { ...prev, status: newStatus } : null);
      setOrder(prev => prev ? { ...prev, status: newStatus } : null);
      toast.success('Order status updated');
      fetchOrderDetails(); // Refresh to get updated status history
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error updating order status');
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    
    setEditedOrder((prev) => {
      if (!prev) return prev;

      if (name.includes('.')) {
        const parts = name.split('.');
        const newValue = { ...prev };
        let current: any = newValue;
        
        for (let i = 0; i < parts.length - 1; i++) {
          current = current[parts[i]];
        }
        
        current[parts[parts.length - 1]] = type === 'number' ? Number(value) : value;
        return newValue;
      }

      return {
        ...prev,
        [name]: type === 'number' ? Number(value) : value
      };
    });
  };

  const handleSave = async () => {
    if (!editedOrder) return;

    try {
      setSaving(true);
      const { error } = await supabase
        .from('orders')
        .update(editedOrder)
        .eq('id', id);

      if (error) throw error;

      setOrder(editedOrder);
      setEditing(false);
      toast.success('Order updated successfully');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error updating order');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!order || !customer || !editedOrder) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Order not found</p>
      </div>
    );
  }

  const sections = [
    {
      title: 'Basic Information',
      items: [
        { label: 'Customer Name', value: customer.name, editable: false },
        { label: 'Customer Email', value: customer.email, editable: false },
        { label: 'Customer Phone', value: customer.phone, editable: false },
        { label: 'Chassis No', value: editedOrder.chassis_no, name: 'chassis_no' },
        { label: 'Model Name', value: editedOrder.model_name, name: 'model_name' },
        { label: 'Order Date', value: editedOrder.order_date, name: 'order_date' },
        { label: 'Delivery Date', value: editedOrder.delivery_date, name: 'delivery_date' }
      ]
    },
    {
      title: 'Chassis Dimensions',
      items: [
        { label: 'Front Width', value: editedOrder.chassis_width_front, name: 'chassis_width_front' },
        { label: 'Wheel Arch Width', value: editedOrder.chassis_width_wheel_arch, name: 'chassis_width_wheel_arch' },
        { label: 'Rear Width', value: editedOrder.chassis_width_rear, name: 'chassis_width_rear' },
        { label: 'Total Length', value: editedOrder.chassis_total_length, name: 'chassis_total_length' },
        { label: 'Overhang', value: editedOrder.overhang, name: 'overhang' },
        { label: 'Floor Joint', value: editedOrder.floor_joint, name: 'floor_joint' }
      ]
    },
    {
      title: 'Frame Options',
      items: [
        { label: 'Chassis Type', value: editedOrder.chassis_type, name: 'chassis_type' },
        { label: 'Frame Type', value: editedOrder.frame_type, name: 'frame_type' },
        { label: 'Main Rail Size', value: editedOrder.main_rail_size, name: 'main_rail_size' },
        { label: 'A-Frame Size', value: editedOrder.a_frame_size, name: 'a_frame_size' }
      ]
    },
    {
      title: 'Suspension & Wheels',
      items: [
        { label: 'Suspension Type', value: editedOrder.suspension_type, name: 'suspension_type' },
        { label: 'Suspension Capacity', value: editedOrder.suspension_capacity, name: 'suspension_capacity' },
        { label: 'Airbags', value: editedOrder.airbags || 'None', name: 'airbags' },
        { label: 'Wheel Type', value: editedOrder.wheel_type, name: 'wheel_type' },
        { label: 'Wheel Size', value: editedOrder.wheel_size, name: 'wheel_size' }
      ]
    },
    {
      title: 'Water & Gas',
      items: [
        { 
          label: 'Front Tanks Quantity', 
          value: editedOrder.water_tanks.front.qty,
          name: 'water_tanks.front.qty'
        },
        { 
          label: 'Front Tanks Size', 
          value: editedOrder.water_tanks.front.size,
          name: 'water_tanks.front.size'
        },
        { 
          label: 'Between Tanks Quantity', 
          value: editedOrder.water_tanks.between.qty,
          name: 'water_tanks.between.qty'
        },
        { 
          label: 'Between Tanks Size', 
          value: editedOrder.water_tanks.between.size,
          name: 'water_tanks.between.size'
        },
        { 
          label: 'Rear Tanks Quantity', 
          value: editedOrder.water_tanks.rear.qty,
          name: 'water_tanks.rear.qty'
        },
        { 
          label: 'Rear Tanks Size', 
          value: editedOrder.water_tanks.rear.size,
          name: 'water_tanks.rear.size'
        },
        { 
          label: 'Grey Tank', 
          value: editedOrder.water_tanks.grey_tank ? 'Yes' : 'No',
          name: 'water_tanks.grey_tank'
        }
      ]
    }
  ];

  return (
    <div className="py-6 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-semibold text-gray-900">
              Order Details
            </h1>
          </div>
          <div className="flex items-center gap-3">
            {editing ? (
              <>
                <button
                  onClick={() => {
                    setEditedOrder(order);
                    setEditing(false);
                  }}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <X className="w-5 h-5" />
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  <Save className="w-5 h-5" />
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setEditing(true)}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                >
                  <Edit2 className="w-5 h-5" />
                  Edit
                </button>
                <PDFButton order={order} />
              </>
            )}
          </div>
        </div>

        {/* Status Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-medium text-gray-900">Status</h2>
              <div className="mt-2 flex items-center gap-4">
                <OrderStatusSelect
                  value={editedOrder.status}
                  onChange={handleStatusChange}
                />
                <button
                  onClick={() => setShowHistory(true)}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                >
                  <History className="w-5 h-5" />
                  View History
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((section) => (
            <div
              key={section.title}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                {section.title}
              </h2>
              <dl className="space-y-3">
                {section.items.map((item) => (
                  <div key={item.label}>
                    <dt className="text-sm font-medium text-gray-500">
                      {item.label}
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {editing && item.name ? (
                        <FormInput
                          name={item.name}
                          value={item.value}
                          onChange={handleInputChange}
                          className="mt-0"
                          disabled={item.editable === false}
                        />
                      ) : (
                        item.value || '-'
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}

          {/* Comments */}
          <div className="bg-white rounded-lg shadow-sm p-6 md:col-span-2">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Comments
            </h2>
            {editing ? (
              <textarea
                name="comments"
                value={editedOrder.comments || ''}
                onChange={handleInputChange}
                className="w-full h-32 p-2 border rounded-md"
                placeholder="Add comments..."
              />
            ) : (
              <p className="text-sm text-gray-600 whitespace-pre-wrap">
                {order.comments || 'No comments'}
              </p>
            )}
          </div>
        </div>
      </div>

      {showHistory && (
        <OrderStatusHistory
          order={order}
          onClose={() => setShowHistory(false)}
        />
      )}
    </div>
  );
}