import  { ReactNode } from "react";
import "./DataTable.css";

export interface Column<T> {
  key: string;
  header: string;
  width?: string;
  render?: (row: T) => ReactNode;
  accessor?: (row: T) => ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  rowKey: (row: T) => string | number;
  className?: string;
}

 const DataTable = <T,>({
  columns,
  data,
  rowKey,
  className,
}: DataTableProps<T>) => {
  return (
    <div className={`data-table-wrapper ${className ?? ""}`.trim()}>
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                style={col.width ? { width: col.width } : undefined}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="data-table__empty">
                No records found.
              </td>
            </tr>
          )}

          {data.map((row) => (
            <tr key={rowKey(row)}>
              {columns.map((col) => (
                <td key={col.key}>
                  {col.render
                    ? col.render(row)
                    : col.accessor
                    ? col.accessor(row)
                    : (row as any)[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default DataTable;