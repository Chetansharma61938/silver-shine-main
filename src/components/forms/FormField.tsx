import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface FormFieldProps {
  label: string;
  name: string;
  error?: string;
  touched?: boolean;
  required?: boolean;
  children: React.ReactNode;
}

export function FormField({ 
  label, 
  name, 
  error, 
  touched, 
  required, 
  children 
}: FormFieldProps) {
  const labelClass = `
    block text-sm font-medium 
    ${touched && error ? 'text-red-700' : 'text-gray-700'}
  `;

  return (
    <div>
      <label className={labelClass}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {touched && error && (
        <div className="mt-1 text-sm text-red-600 flex items-center gap-1">
          <AlertTriangle className="w-4 h-4" />
          {error}
        </div>
      )}
    </div>
  );
}