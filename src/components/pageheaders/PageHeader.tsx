import "./PageHeader.css"
import React from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onActionClick?: () => void;
  showPlusIcon?: boolean;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  actionLabel,
  onActionClick,
  showPlusIcon = true,
  className,
}) => {
  return (
    <div className={`page-header ${className ?? ""}`.trim()}>
      <div className="page-header__left">
        <h1 className="page-header__title">{title}</h1>
        {subtitle && <p className="page-header__subtitle">{subtitle}</p>}
      </div>

      {actionLabel && (
        <button
          type="button"
          className="primary-action-btn"
          onClick={onActionClick}
        >
          {showPlusIcon && <span className="primary-action-btn__icon">+</span>}
          <span>{actionLabel}</span>
        </button>
      )}
    </div>
  );
};
