import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";

interface CustomButtonProps extends ButtonProps {
  children: React.ReactNode;
  customColor?: string; // custom text color
  customBgColor?: string; // custom background color
  customHoverColor?: string; // custom hover background
  textTransform?: "uppercase" | "lowercase" | "capitalize" | "none";
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  customColor,
  customBgColor,
  customHoverColor,
  textTransform = "none", // default value
  ...props
}) => {
  return (
    <Button
      variant="outlined"
      {...props}
      sx={{
        appearance: "none",
        backgroundColor: customBgColor || "#FAFBFC",
        border: "1px solid rgba(27, 31, 35, 0.15)",
        borderRadius: "6px",
        boxShadow:
          "rgba(27, 31, 35, 0.04) 0 1px 0, rgba(255, 255, 255, 0.25) 0 1px 0 inset",
        boxSizing: "border-box",
        color: customColor || "#24292E",
        cursor: "pointer",
        display: "inline-block",
        fontFamily:
          '-apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
        fontSize: "14px",
        fontWeight: 500,
        lineHeight: "20px",
        padding: "6px 16px",
        position: "relative",
        transition: "background-color 0.2s cubic-bezier(0.3, 0, 0.5, 1)",
        userSelect: "none",
        verticalAlign: "middle",
        whiteSpace: "nowrap",
        wordWrap: "break-word",
        textTransform,
        "&:hover": {
          backgroundColor: customHoverColor || "#F3F4F6",
          textDecoration: "none",
          transitionDuration: "0.1s",
        },
        "&:disabled": {
          backgroundColor: "#FAFBFC",
          borderColor: "rgba(27, 31, 35, 0.15)",
          color: "#959DA5",
          cursor: "default",
        },
        "&:active": {
          backgroundColor: "#EDEFF2",
          boxShadow: "rgba(225, 228, 232, 0.2) 0 1px 0 inset",
          transition: "none 0s",
        },
        "&:focus": {
          outline: "1px transparent",
        },
      }}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
