import { useFieldArray } from "react-hook-form";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import type { ColumnDef, Table } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { axiosClient } from "@/api/http";
import type { PurchaseOrderTableItemsProps } from "../../types/table";
import type { PurchaseOrderCreateZod } from "../../schemas/purchase_order.create.schema";

type ItemResponse = {
  id: number;
  name: string;
  sku: string;
}

const getItems = async (page: number, limit: number): Promise<any> => {
  const res = await axiosClient.get(`/items?_page=${page}&_per_page=${limit}`);
  return res.data;
}

export function PurchaseOrderTableItems({form}: PurchaseOrderTableItemsProps<PurchaseOrderCreateZod>) {

  const [totalPage, setTotalPage] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(1);
  const [itemResponses, setItemResponses] = useState<ItemResponse[]>([]);
  useEffect(() => {
    getItems(page, perPage).then((res) => {
      setTotalPage(Number(res.pages) as number);
      setItemResponses(res.data as ItemResponse[]);
    }).catch((err: Error) => {
      throw err;
    });
  }, [page, perPage]);
  const handlePageSize = (size: number) => {
    if (size !== perPage) setPerPage(size);
  };
  const handlePageChange = (pageChange: number) => {
    if (pageChange !== page) setPage(pageChange);
  };
  

  const selectedItemFieldArray = useFieldArray({ control: form.control, name: "items" });

  const columns: ColumnDef<ItemResponse>[] = [
    {
      id: "select",
      header: "#",
      cell: ({ row }) => {
        return (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => {
              if (value) {
                selectedItemFieldArray.append({
                  item_id: String(row.original.id),
                  name: row.original.name,
                  sku: row.original.sku,
                  qty_ordered: 0,
                  description: ""
                })
              } else {
                const i = selectedItemFieldArray.fields.findIndex((x) => x.item_id === String(row.original.id));
                if (i !== -1) selectedItemFieldArray.remove(i);
              }
              row.toggleSelected(!!value);
            }}
            aria-label="Select row"
          />
        )
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: "Name"
    },
    {
      accessorKey: "sku",
      header: "SKU"
    }
  ]

  const { errors } = form.formState
  console.log(form.watch());
  console.log(errors);

  const [table, setTable] = useState<Table<ItemResponse> | null>(null);

  return (
    <>
      <DataTable
        columns={columns}
        data={itemResponses}
        pageCount={totalPage}
        pageSize={perPage}
        onTableReady={setTable}
        handlePerPageChange={handlePageSize}
        handlePageChange={handlePageChange}
      />
      <table className="w-full border border-collapse max-w-84 md:max-w-160">
        <thead>
          <tr className="bg-muted">
            <th className="p-2 text-left">Item</th>
            <th className="p-2 text-left">Quantity</th>
            <th className="p-2 text-left">Remove</th>
          </tr>
        </thead>

        <tbody>
          {selectedItemFieldArray.fields.map((item, idx) => (
            <tr key={item.id} className="border-t">

              {/* ITEM NAME */}
              <td className="p-2">
                {item.name} ({item.sku})
              </td>

              {/* QUANTITY INPUT */}
              <td className="p-2">
                <FormField
                  control={form.control}
                  name={`items.${idx}.qty_ordered`}
                  render={({ field }) => (
                    <FormItem className="m-0">
                      <FormControl>
                        <Input
                          className="max-w-24"
                          type="number"
                          {...field}
                          onChange={(e) => {
                            const v = e.target.value;
                            field.onChange(v === "" ? "" : Number(v));
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </td>

              {/* REMOVE BUTTON */}
              <td className="p-2">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    selectedItemFieldArray.remove(idx);
                    const row = table?.getRow(item.item_id);
                    row?.toggleSelected(false);
                  }}
                >
                  Remove
                </Button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}