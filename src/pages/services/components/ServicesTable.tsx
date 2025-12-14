import React from "react";
import DataTable, { Column } from "../../../components/datatabel/DataTable";
import { RowActions } from "../../../components/RowActions";

export interface Service {
  id: string;
  name: string;
  description: string;
  status: "Active" | "Inactive";
}

export interface ServicesTableProps {
  services: Service[];
  onEdit?: (service: Service) => void;
  onDelete?: (service: Service) => void;
}

const ServicesTable: React.FC<ServicesTableProps> = ({
  services,
  onEdit,
  onDelete,
}) => {
  const columns: Column<Service>[] = [
    {
      key: "name",
      header: "Service Name",
      accessor: (s) => s.name,
    },
    {
      key: "description",
      header: "Description",
      accessor: (s) => s.description,
    },
    {
      key: "status",
      header: "Status",
      accessor: (s) => s.status,
    },
    {
      key: "actions",
      header: "Actions",
      width: "110px",
      render: (s) => (
        <RowActions
          onEdit={onEdit ? () => onEdit(s) : undefined}
          onDelete={onDelete ? () => onDelete(s) : undefined}
        />
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={services}
      rowKey={(s) => s.id}
    />
  );
};

export default ServicesTable;
