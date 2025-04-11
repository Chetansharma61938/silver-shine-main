// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { supabase } from '../lib/supabase';
// import { Customer } from '../types';
// import toast from 'react-hot-toast';
// import { FormSection } from '../components/forms/FormSection';
// import { BasicInformation } from '../components/forms/order/BasicInformation';
// import { ChassisTypeSection } from '../components/forms/order/ChassisTypeSection';
// import { SuspensionSection } from '../components/forms/order/SuspensionSection';
// import { FormActions } from '../components/forms/order/FormActions';
// import { initialFormState } from '../utils/initialFormState';

import ChassisOrderForm from "@/components/forms/order/ChassisOrderForm"
import { Button } from "@/components/ui/CustomButton"

// export function NewOrder() {
//   const navigate = useNavigate();
//   const [customers, setCustomers] = useState<Customer[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [touched, setTouched] = useState<Record<string, boolean>>({});
//   const [formData, setFormData] = useState(initialFormState);

//   useEffect(() => {
//     fetchCustomers();
//   }, []);

//   async function fetchCustomers() {
//     try {
//       const { data, error } = await supabase
//         .from('customers')
//         .select('*')
//         .order('name');

//       if (error) throw error;
//       setCustomers(data || []);
//     } catch (error) {
//       toast.error('Error fetching customers');
//       console.error('Error:', error);
//     }
//   }

//   const validateForm = () => {
//     const newErrors: Record<string, string> = {};

//     // Required fields validation
//     if (!formData.customer_id) newErrors.customer_id = 'Customer is required';
//     if (!formData.chassis_no) newErrors.chassis_no = 'Chassis number is required';
//     if (!formData.model_name) newErrors.model_name = 'Model name is required';
//     if (!formData.order_date) newErrors.order_date = 'Order date is required';
//     if (!formData.delivery_date) newErrors.delivery_date = 'Delivery date is required';
//     if (!formData.wheel_type) newErrors.wheel_type = 'Wheel type is required';
//     if (!formData.suspension_type) newErrors.suspension_type = 'Suspension type is required';

//     // Numeric validations
//     if (formData.chassis_width_front && isNaN(Number(formData.chassis_width_front))) {
//       newErrors.chassis_width_front = 'Must be a number';
//     }
//     if (formData.chassis_width_wheel_arch && isNaN(Number(formData.chassis_width_wheel_arch))) {
//       newErrors.chassis_width_wheel_arch = 'Must be a number';
//     }
//     if (formData.chassis_width_rear && isNaN(Number(formData.chassis_width_rear))) {
//       newErrors.chassis_width_rear = 'Must be a number';
//     }
//     if (formData.chassis_total_length && isNaN(Number(formData.chassis_total_length))) {
//       newErrors.chassis_total_length = 'Must be a number';
//     }
//     if (formData.overhang && isNaN(Number(formData.overhang))) {
//       newErrors.overhang = 'Must be a number';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       toast.error('Please fill in all required fields correctly');
//       return;
//     }

//     setLoading(true);

//     try {
//       const orderData = {
//         ...formData,
//         chassis_width_front: formData.chassis_width_front ? Number(formData.chassis_width_front) : null,
//         chassis_width_wheel_arch: formData.chassis_width_wheel_arch ? Number(formData.chassis_width_wheel_arch) : null,
//         chassis_width_rear: formData.chassis_width_rear ? Number(formData.chassis_width_rear) : null,
//         chassis_total_length: formData.chassis_total_length ? Number(formData.chassis_total_length) : null,
//         overhang: formData.overhang ? Number(formData.overhang) : null,
//         status: 'QUOTE_SENT'
//       };

//       const { error } = await supabase
//         .from('orders')
//         .insert([orderData]);

//       if (error) throw error;

//       toast.success('Order created successfully');
//       navigate('/orders');
//     } catch (error) {
//       console.error('Error:', error);
//       toast.error('Error creating order');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleBlur = (name: string) => {
//     setTouched(prev => ({ ...prev, [name]: true }));
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     const { name, value, type } = e.target;

//     if (name.startsWith('extras.')) {
//       const extraName = name.split('.')[1];
//       setFormData(prev => ({
//         ...prev,
//         extras: {
//           ...prev.extras,
//           [extraName]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
//         }
//       }));
//     } else if (name.includes('.')) {
//       const [section, field] = name.split('.');
//       setFormData(prev => ({
//         ...prev,
//         [section]: {
//           ...prev[section as keyof typeof prev],
//           [field]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
//         }
//       }));
//     } else {
//       setFormData(prev => ({
//         ...prev,
//         [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
//       }));
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-6">
//       <div className="bg-white shadow-sm rounded-lg p-6">
//         <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">
//           SILVER SHINE CHASSIS ORDER FORM
//         </h1>

//         <form onSubmit={handleSubmit} className="space-y-8">
//           <BasicInformation
//             formData={formData}
//             customers={customers}
//             errors={errors}
//             touched={touched}
//             onChange={handleChange}
//             onBlur={handleBlur}
//           />

//           <ChassisTypeSection
//             formData={formData}
//             errors={errors}
//             touched={touched}
//             onChange={handleChange}
//             onBlur={handleBlur}
//           />

//           <SuspensionSection
//             formData={formData}
//             errors={errors}
//             touched={touched}
//             onChange={handleChange}
//             onBlur={handleBlur}
//           />

//           <FormActions
//             loading={loading}
//             onCancel={() => navigate('/orders')}
//           />
//         </form>
//       </div>
//     </div>
//   );
// }



export const NewOrder = () => {
  return (
    <>
      <div>
        <ChassisOrderForm />
      </div>
    </>
  )
}


