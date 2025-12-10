import { useFieldArray } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import type { ColumnDef, Table } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { axiosClient } from "@/api/http";
import type { PurchaseOrderTableItemsProps } from "../types/table";
import type { PurchaseOrderCreateZod } from "../schemas/purchase_order.create.schema";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type ProductResponse = {
  id: number;
  name: string;
  sku: string;
}

const getItems = async (page: number, limit: number): Promise<any> => {
  const res = await axiosClient.get(`/items?_page=${page}&_per_page=${limit}`);
  return res.data;
}

export function PurchaseOrderTableItems({ form }: PurchaseOrderTableItemsProps<PurchaseOrderCreateZod>) {
  const supplierId = form.watch("supplier_id");
  useEffect(() => {
    if (!supplierId) return;
    table?.reset();
    selectedItemFieldArray.replace([]);
  }, [supplierId])

  const [totalPage, setTotalPage] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(1);
  const [productResponses, setProductResponses] = useState<ProductResponse[]>([]);

  useEffect(() => {
    if (!supplierId) return;
    getItems(page, perPage).then((res) => {
      setTotalPage(Number(res.pages) as number);
      setProductResponses(res.data as ProductResponse[]);
    }).catch((err: Error) => {
      throw err;
    });
  }, [page, perPage, supplierId]);

  const handlePageSize = (size: number) => {
    if (size !== perPage) setPerPage(size);
  };
  const handlePageChange = (pageChange: number) => {
    if (pageChange !== page) setPage(pageChange);
  };


  const selectedItemFieldArray = useFieldArray({ control: form.control, name: "products" });

  const columns: ColumnDef<ProductResponse>[] = [
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
                  product_id: String(row.original.id),
                  name: row.original.name,
                  sku: row.original.sku,
                  qty_ordered: 0,
                  description: ""
                })
              } else {
                const i = selectedItemFieldArray.fields.findIndex((x) => x.product_id === String(row.original.id));
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

  const [table, setTable] = useState<Table<ProductResponse> | null>(null);

  return (
    <>
      <DataTable
        columns={columns}
        data={productResponses}
        pageCount={totalPage}
        pageSize={perPage}
        onTableReady={setTable}
        handlePerPageChange={handlePageSize}
        handlePageChange={handlePageChange}
      />

      {selectedItemFieldArray.fields.map((product, idx) => (
        <Card key={idx}>
          <CardHeader>
            <CardTitle>{product.name}</CardTitle>
            <CardDescription>{product.sku}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-2">
                <FormLabel>Quantity</FormLabel>
                <FormField
                  control={form.control}
                  name={`products.${idx}.qty_ordered`}
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
              </div>
              <div className="flex flex-col gap-1">
                <FormField
                  control={form.control}
                  name={`products.${idx}.special_instruction`}
                  render={({ field }) => (
                    <FormItem>
                      <FormItem>
                        <FormControl>
                          <Textarea placeholder="Special Instruction" {...field} className="max-h-2" />
                        </FormControl>
                      </FormItem>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-row items-end justify-end">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    selectedItemFieldArray.remove(idx);
                    const row = table?.getRow(product.product_id);
                    row?.toggleSelected(false);
                  }}
                >
                  Remove
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}