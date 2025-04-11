import React from 'react';

interface RadioOption {
  value: string;
  label: string;
}

interface FormRadioGroupProps {
  options: RadioOption[];
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function FormRadioGroup({ 
  options, 
  name, 
  value, 
  onChange 
}: FormRadioGroupProps) {
  return (
    <div className="mt-2 space-x-4">
      {options.map(option => (
        <label key={option.value} className="inline-flex items-center">
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={onChange}
            className="form-radio text-blue-600"
          />
          <span className="ml-2">{option.label}</span>
        </label>
      ))}
    </div>
  );
}