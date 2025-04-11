import React from 'react';
import { Button } from '@mui/material';

interface CustomTabsProps {
  options: string[];
  selected: string;
  onChange: (value: string) => void;
  value: string;
}

const CustomTabs: React.FC<CustomTabsProps> = ({
  options,
  selected,
  onChange,
  value,
}) => {
  return (
    <div className="flex gap-3">
      {options.map((option) => (
        <Button
          key={option}
          variant="contained"
          sx={{
            backgroundColor: selected === option ? "#cc2e2b" : "#f3f3f3",
            color: selected === option ? "#fff" : "black",
            '&:hover': {
              backgroundColor: selected === option ? "#cc2e2b" : "#e0e0e0",
            },
          }}
          onClick={() => onChange(option)}
        >
          {option}
        </Button>
      ))}
    </div>
  );
};

export default CustomTabs; 