import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  type Table as TanstackTable
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useEffect, type TableHTMLAttributes } from "react"
import { DataTablePagination } from "./pagination-data-table"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  loading?: boolean,
  pageSize?: number,
  pageCount?: number
  props?: TableHTMLAttributes<HTMLTableElement>,
  onTableReady?: (table: TanstackTable<any>) => void;
  handlePerPageChange?: (size: number) => void;
  handlePageChange?: (page: number) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  loading,
  pageCount,
  pageSize,
  onTableReady,
  handlePerPageChange,
  handlePageChange,
}: DataTableProps<TData, TValue>) {

  const table = useReactTable({
    data,
    columns,
    initialState: {
      pagination: {
        pageSize: pageSize,
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getRowId: row => String((row as any).id), // or your own logic
    pageCount: pageCount,
    manualPagination: true,
  });

  const dataTablePaginationChangePage = (page: number) => {
    handlePageChange ? handlePageChange(page) : null;
  }

  // runs only once
  useEffect(() => {
    onTableReady?.(table);
  }, []);

  // runs ONLY when pagination.pageSize changes
  useEffect(() => {
    const pageSize = table.getState().pagination.pageSize;
    handlePerPageChange?.(pageSize);
  }, [table.getState().pagination.pageSize]);

  return (
    <div className="overflow-hidden rounded-md border md:max-w-160">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Loading...
              </TableCell>
            </TableRow>
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {pageCount ? <DataTablePagination table={table} handlePageChange={dataTablePaginationChangePage} /> : ""}
    </div>
  )
}