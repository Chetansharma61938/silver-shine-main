import React from 'react';

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
  touched?: boolean;
  options: { value: string; label: string }[];
}

export function FormSelect({ 
  error, 
  touched, 
  options, 
  className = '', 
  ...props 
}: FormSelectProps) {
  const selectClass = `
    mt-1 block w-full rounded-md shadow-sm
    ${touched && error
      ? 'border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500'
      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
    }
    ${className}
  `;

  return (
    <select className={selectClass} {...props}>
      {options.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}