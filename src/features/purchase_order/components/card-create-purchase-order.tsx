import { useFieldArray } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import type { ColumnDef, Table } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import type { PurchaseOrderCreateZod } from "../schemas/purchase_order.create.schema";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { ProductResponse, PurchaseOrderTableItemsProps } from "../types/purchase-order.type";
import type { PaginationQueryParamZodSchema } from "@/schemas/pagination-request.schema";
import { usePurchaseOrderGetProductLists } from "../api/purchase-order.api";

export function PurchaseOrderTableItems({ form }: PurchaseOrderTableItemsProps<PurchaseOrderCreateZod>) {
  const supplierId = form.watch("supplier_id");

  const [table, setTable] = useState<Table<ProductResponse> | null>(null);

  const [queryParam, setQueryParam] = useState<PaginationQueryParamZodSchema>({
    page: 1,
    perPage: 1,
    search: "",
    sort: "",
  });

  const { loading, data, errors, totalPage } = usePurchaseOrderGetProductLists(supplierId, queryParam);

  useEffect(() => {
    if (!supplierId) return;
    table?.reset();
    selectedItemFieldArray.replace([]);
  }, [supplierId]);

  const handlePageSize = (size: number) => {
    if (size !== queryParam.perPage) setQueryParam((prev) => ({ ...prev, perPage: size }));
  };

  const handlePageChange = (pageChange: number) => {
    if (pageChange !== queryParam.page) setQueryParam((prev) => ({ ...prev, page: pageChange }));
  };

  const selectedItemFieldArray = useFieldArray({ control: form.control, name: "products" });

  const [rowSelection, setRowSelection] =
    useState<Record<string, boolean>>({});

  const columns: ColumnDef<ProductResponse>[] = [
    {
      id: "id",
      header: "#",
      cell: ({ row }) => {
        return (
          <Checkbox
            checked={rowSelection[row.original.id]}
            onCheckedChange={(value) => {
              if (value) {

                selectedItemFieldArray.append({
                  product_id: String(row.original.id),
                  name: row.original.name,
                  sku: row.original.sku,
                  qty_ordered: 0,
                  description: ""
                });

                setRowSelection(prev => ({
                  ...prev,
                  [String(row.original.id)]: true,
                }));

              } else {
                const i = selectedItemFieldArray.fields.findIndex((x) => x.product_id === String(row.original.id));
                
                if (i !== -1) selectedItemFieldArray.remove(i);

                setRowSelection(prev => ({
                  ...prev,
                  [String(row.original.id)]: false,
                }));
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

  if (errors) return (<ul>{errors.map((msg, idx) => <li key={idx}>{msg}</li>)}</ul>);

  return (
    <>
      <DataTable
        columns={columns}
        data={data}
        pageCount={totalPage ? totalPage : 0}
        pageSize={queryParam.perPage}
        onTableReady={setTable}
        handlePerPageChange={handlePageSize}
        handlePageChange={handlePageChange}
        loading={loading}
      />

      <div className="flex flex-col gap-2 mt-2">
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
                      // const row = table?.getRow(product.product_id);
                      // row?.toggleSelected(false);

                      setRowSelection(prev => ({
                        ...prev,
                        [String(product.product_id)]: false,
                      }));
                    }}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}