import React from 'react';
import { FormSection } from '../FormSection';
import { FormField } from '../FormField';
import { FormInput } from '../FormInput';
import { FormSelect } from '../FormSelect';
import { Customer } from '../../../types';

interface BasicInformationProps {
  formData: {
    order_date: string;
    delivery_date: string;
    customer_id: string;
    chassis_no: string;
    model_name: string;
    signature: string;
    quote_amount: string;
    order_by: string;
  };
  customers: Customer[];
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onBlur: (name: string) => void;
}

export function BasicInformation({
  formData,
  customers,
  errors,
  touched,
  onChange,
  onBlur
}: BasicInformationProps) {
  return (
    <FormSection title="Basic Information">
      <div className="grid grid-cols-2 gap-6">
        <FormField
          label="Order Date"
          name="order_date"
          error={errors.order_date}
          touched={touched.order_date}
          required
        >
          <FormInput
            type="date"
            name="order_date"
            value={formData.order_date}
            onChange={onChange}
            onBlur={() => onBlur('order_date')}
            required
          />
        </FormField>
        <FormField
          label="Delivery Date"
          name="delivery_date"
          error={errors.delivery_date}
          touched={touched.delivery_date}
          required
        >
          <FormInput
            type="date"
            name="delivery_date"
            value={formData.delivery_date}
            onChange={onChange}
            onBlur={() => onBlur('delivery_date')}
            required
          />
        </FormField>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-4">
        <FormField
          label="Customer"
          name="customer_id"
          error={errors.customer_id}
          touched={touched.customer_id}
          required
        >
          <FormSelect
            name="customer_id"
            value={formData.customer_id}
            onChange={onChange}
            onBlur={() => onBlur('customer_id')}
            required
            options={[
              { value: '', label: 'Select a customer' },
              ...customers.map(customer => ({
                value: customer.id,
                label: customer.name
              }))
            ]}
          />
        </FormField>
        <FormField
          label="Quote Amount"
          name="quote_amount"
          error={errors.quote_amount}
          touched={touched.quote_amount}
        >
          <FormInput
            type="number"
            name="quote_amount"
            value={formData.quote_amount}
            onChange={onChange}
            onBlur={() => onBlur('quote_amount')}
            step="0.01"
          />
        </FormField>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-4">
        <FormField
          label="SS Chassis No"
          name="chassis_no"
          error={errors.chassis_no}
          touched={touched.chassis_no}
          required
        >
          <FormInput
            type="text"
            name="chassis_no"
            value={formData.chassis_no}
            onChange={onChange}
            onBlur={() => onBlur('chassis_no')}
            required
          />
        </FormField>
        <FormField
          label="Model Name"
          name="model_name"
          error={errors.model_name}
          touched={touched.model_name}
          required
        >
          <FormInput
            type="text"
            name="model_name"
            value={formData.model_name}
            onChange={onChange}
            onBlur={() => onBlur('model_name')}
            required
          />
        </FormField>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-4">
        <FormField
          label="Order By"
          name="order_by"
          error={errors.order_by}
          touched={touched.order_by}
        >
          <FormInput
            type="text"
            name="order_by"
            value={formData.order_by}
            onChange={onChange}
            onBlur={() => onBlur('order_by')}
          />
        </FormField>
        <FormField
          label="Signature"
          name="signature"
          error={errors.signature}
          touched={touched.signature}
        >
          <FormInput
            type="text"
            name="signature"
            value={formData.signature}
            onChange={onChange}
            onBlur={() => onBlur('signature')}
          />
        </FormField>
      </div>
    </FormSection>
  );
}