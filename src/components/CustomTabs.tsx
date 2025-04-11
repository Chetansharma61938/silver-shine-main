"use client";

import React from "react";
import { useFormikContext } from "formik";
import { Button } from "@mui/material";

interface CustomTabsProps {
  name: string;
  options: string[];
  value?: string;
  onChange?: (val: string) => void;
}

const CustomTabs: React.FC<CustomTabsProps> = ({ name, options, value, onChange }) => {
  const { values, setFieldValue } = useFormikContext<any>();
  const currentValue = value || values[name];

  const handleClick = (option: string) => {
    const isSelected = currentValue === option;
    const newValue = isSelected ? "" : option;
    setFieldValue(name, newValue);
    if (onChange) onChange(newValue);
  };

  return (
    <div className="flex flex-wrap gap-3 mt-2">
      {options.map((label) => {
        const isSelected = currentValue === label;

        return (
          <Button
            key={label}
            variant="contained"
            onClick={() => handleClick(label)}
            sx={{
              backgroundColor: isSelected ? "#cc2e2b" : "#f3f3f3",
              color: isSelected ? "#fff" : "black",
              textTransform: "none",
              // borderRadius: "24px",
              // px: 3,
              // py: 1.5,
              fontWeight: 500,
              "&:hover": {
                backgroundColor: isSelected ? "#b82826" : "#e0e0e0",
              },
            }}
          >
            {label}
          </Button>
        );
      })}
    </div>
  );
};

export default CustomTabs;
