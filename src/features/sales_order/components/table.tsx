import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import type { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { axiosClient } from "@/api/http";
import type { ResponseSalesOrderIndex } from "../types/sales-order-response";
import { formatTimestamptToDDMMYYYY } from "@/lib/helper";
import { PopupConfirmAction, SalesOrderDetailItems } from "./popup";

const getSalesOrders = async (page: number, limit: number): Promise<any> => {
  const res = await axiosClient.get(`/sales-orders?_page=${page}&_per_page=${limit}`);
  return res.data;
}

const getButtonTexts = (status: string) => {
  switch (status) {
    case "ORDERED":
      return { text: "New" };

    case "PROCESSING":
      return { text: "Processing" };

    case "SHIPPING":
      return { text: "Shipping" };

    default:
      return { text: "Done" };
  }
};

const getButtonStyle = (status: string) => {
  switch (status) {
    case "ORDERED":
      return "bg-gray-700 hover:bg-yellow-700";

    case "PROCESSING":
      return "bg-yellow-700 hover:bg-blue-700";

    case "SHIPPING":
      return "bg-blue-700 hover:bg-blue-700";

    default:
      return "bg-green-700 hover:bg-green-700";
  }
};


export function SalesOrderTableItems() {
  const [totalPage, setTotalPage] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(5);
  const [salesOrders, setSalesOrders] = useState<ResponseSalesOrderIndex[]>([]);

  useEffect(() => {
    getSalesOrders(page, perPage).then((res) => {
      setTotalPage(res.pages);
      if (res.data) {
        if (Array.isArray(res.data)) {
          const data = (res.data as ResponseSalesOrderIndex[]).map((item) => ({
            ...item,
            date: formatTimestamptToDDMMYYYY(item.date, "/"),
            expected_date: formatTimestamptToDDMMYYYY(item.expected_date, "/")
          }));
          setSalesOrders(data);
        }
      }
    });
  }, [page, perPage]);

  const handlePageSize = (size: number) => {
    if (size !== perPage) setPerPage(size);
  };
  const handlePageChange = (pageChange: number) => {
    if (pageChange !== page) setPage(pageChange);
  };


  const columns: ColumnDef<ResponseSalesOrderIndex>[] = [
    {
      accessorKey: "so_number",
      header: "SO Number"
    },
    {
      accessorKey: "buyer_company_name",
      header: "Buyer Company"
    },
    {
      accessorKey: "date",
      header: "Date"
    },
    {
      accessorKey: "expected_date",
      header: "Expected Date"
    },
    {
      id: "action",
      header: "Action",
      cell: ({ row }) => {
        const status = row.original.status;
        const { text } = getButtonTexts(status);
        const classes = getButtonStyle(status);

        return (
          <div className="flex flex-row gap-2">
            <PopupConfirmAction
              triggerComponent={
                <Button className={`w-25 h-6 ${classes}`}>
                  <span>{text}</span>
                </Button>
              }
            />
            
            <SalesOrderDetailItems
              soId={row.original.id}
              triggerComponent={
                <Button className="w-25 h-6">View Items</Button>
              }
            />
          </div>
        );
      }
      ,
      enableSorting: false,
      enableHiding: false,
    }
  ]

  // const [table, setTable] = useState<Table<ProductResponse> | null>(null);

  return (
    <>
      <DataTable
        columns={columns}
        data={salesOrders}
        pageCount={totalPage}
        pageSize={perPage}
        // onTableReady={setTable}
        handlePerPageChange={handlePageSize}
        handlePageChange={handlePageChange}
      />
    </>
  );
}