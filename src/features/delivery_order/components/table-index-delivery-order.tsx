import { type PaginationQueryParamZodSchema } from "@/schemas/pagination-request.schema";
import { useState } from "react";
import type { DeliveryOrderRow } from "../types/delivery-order-response";
import { Button } from "@/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { useDeliveryOrderGetDataIndex } from "../api/delivery-order-index.api";
import { Link } from "react-router-dom";

export function DeliveryOrderIndexTable() {

  const [queryParam, setQueryParam] = useState<PaginationQueryParamZodSchema>({
    page: 1,
    perPage: 1,
    search: "",
    sort: ""
  });

  const { loading, data, errors, totalPage } = useDeliveryOrderGetDataIndex(queryParam);

  const handlePageSize = (size: number) => {
    if (size !== queryParam.perPage) setQueryParam((prev) => ({ ...prev, perPage: size }));
  };

  const handlePageChange = (pageChange: number) => {
    if (pageChange !== queryParam.page) setQueryParam((prev) => ({ ...prev, page: pageChange }));
  };

  const columns: ColumnDef<DeliveryOrderRow>[] = [
    {
      accessorKey: "do_number",
      header: "SO Number"
    },
    {
      accessorKey: "buyer_company_name",
      header: "Buyer Company"
    },
    {
      accessorKey: "expected_date",
      header: "Expected Date"
    },
    {
      accessorKey: "status",
      header: "Status"
    },
    {
      id: "action",
      header: "Action",
      cell: ({ row }) => {
        console.log(row);
        return (
          <div className="flex flex-row gap-2">
            <Link to="/delivery-order/create">Process</Link>
            <Button>View</Button>
          </div>
        );
      }
      ,
      enableSorting: false,
      enableHiding: false,
    }
  ]

  return (
    <>
      {errors && <ul>{errors.map((v) => <li className="text-red-400">{v}</li>)}</ul>}
      <DataTable
        columns={columns}
        loading={loading}
        data={data}
        handlePageChange={handlePageChange}
        handlePerPageChange={handlePageSize}
        pageCount={totalPage ? totalPage : 0}
        pageSize={queryParam.perPage}
      />
    </>
  );
};