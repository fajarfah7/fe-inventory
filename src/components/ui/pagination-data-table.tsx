import { type Table } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import { ScrollArea, ScrollBar } from "./scroll-area"

interface DataTablePaginationProps<TData> {
  table: Table<TData>
  handlePageChange?: (page: number) => void
}

export function DataTablePagination<TData>({ table, handlePageChange }: DataTablePaginationProps<TData>) {
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
  return (
    <div className="flex flex-row justify-between px-2 py-2">
      <div className="flex items-center space-x-2">
        <p className="text-sm font-medium">Rows per page</p>
        <Select
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={(value) => {
            table.setPageSize(Number(value));
            setCurrentPageNumber(1);
          }}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={table.getState().pagination.pageSize} />
          </SelectTrigger>
          <SelectContent side="top">
            {[1, 5, 10, 20].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {/* <div className="flex w-[100px] items-center justify-center text-sm font-medium">
        Page {currentPageNumber} of{" "}
        {table.getPageCount()}
      </div> */}
      <ScrollArea className="max-w-35 rounded-md border whitespace-nowrap p-1">
        <div className="flex items-center space-x-2">
          {Array.
            from({ length: table.getPageCount() ? table.getPageCount() : 0 }).
            map((_, idx) => (
              <Button
                key={idx + 1}
                variant={currentPageNumber === idx + 1 ? "default" : "outline"}
                size="icon"
                className="size-8 lg:flex"
                onClick={() => {
                  setCurrentPageNumber(idx + 1);
                  handlePageChange ? handlePageChange(idx + 1) : null;
                }}
              >
                {idx + 1}
              </Button>
            ))}
        </div>
        <ScrollBar orientation="horizontal"/>
      </ScrollArea>
    </div>
  )
}
