import React from 'react';

interface FormCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function FormCheckbox({ label, className = '', ...props }: FormCheckboxProps) {
  return (
    <label className="flex items-center">
      <input
        type="checkbox"
        className={`rounded border-gray-300 text-blue-600 focus:ring-blue-500 ${className}`}
        {...props}
      />
      <span className="ml-2">{label}</span>
    </label>
  );
}