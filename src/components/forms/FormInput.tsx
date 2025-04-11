import React from 'react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  touched?: boolean;
}

export function FormInput({ error, touched, className = '', ...props }: FormInputProps) {
  const inputClass = `
    mt-1 block w-full rounded-md shadow-sm
    ${touched && error
      ? 'border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500'
      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
    }
    ${className}
  `;

  return <input className={inputClass} {...props} />;
}