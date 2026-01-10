import React from "react";
import "./CustomButton.css";

type ButtonVariant = "primary" | "danger" | "success" | "ghost";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const CustomButton: React.FC<ButtonProps> = ({
  variant = "primary",
  className = "",
  children,
  ...props
}) => {
  return (
    <button
      className={`btn btn--${variant} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default CustomButton;
