import React from "react";

interface StatusBadgeProps {
  label: string;
  variant?: "active"; // extend later (inactive, pending, etc.)
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  label,
  variant = "active",
}) => {
  return (
    <span className={`status-badge status-badge--${variant}`}>
      {label}
    </span>
  );
};
