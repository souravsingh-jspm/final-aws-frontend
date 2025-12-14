import React from "react";

interface RowActionsProps {
  onEdit?: () => void;
  onDelete?: () => void;
}

export const RowActions: React.FC<RowActionsProps> = ({
  onEdit,
  onDelete,
}) => {
  return (
    <div className="table-actions">
      {onEdit && (
        <button
          type="button"
          className="table-action-btn table-action-btn--edit"
          onClick={onEdit}
          aria-label="Edit"
        >
          ✏️
        </button>
      )}
      {onDelete && (
        <button
          type="button"
          className="table-action-btn table-action-btn--delete"
          onClick={onDelete}
          aria-label="Delete"
        >
          🗑
        </button>
      )}
    </div>
  );
};
