"use client";
import { Table } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export function DataTable({ columns, data }) {
  return (
    <Table className="w-full">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.accessor} className="text-left p-4">
              {col.Header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            {columns.map((col) => (
              <td key={col.accessor} className="p-4">
                {col.Cell ? col.Cell({ value: row[col.accessor] }) : row[col.accessor]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
