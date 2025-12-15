import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import type { DeliveryOrderCardProps } from "../types/delivery-order-response";
import type { DeliveryOrderCreateZod } from "../schemas/delivery-order-create.schema";
import { Input } from "@/components/ui/input";
import { useFieldArray } from "react-hook-form";

export function DeliveryOrderProducts({ form }: DeliveryOrderCardProps<DeliveryOrderCreateZod>) {
  const itemFieldArray = useFieldArray({ control: form.control, name: "products" });
  console.log("field", itemFieldArray.fields)
  return (
    <>
      {itemFieldArray.fields.map((product, idx) => (
        <Card key={idx}>
          <CardHeader>
            <CardTitle>{product.product_name}</CardTitle>
            <CardDescription>{product.product_sku}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex md:flex-row flex-col justify-between gap-4 md:gap-2">
              <div>
                <FormItem className="md:w-90 w-full">
                  <FormLabel>Special Instruction</FormLabel>
                  <FormDescription>{product.special_instruction}</FormDescription>
                </FormItem>
              </div>
              <div>
                <FormItem className="flex flex-col md:items-end">
                  <FormLabel>Shipped Quantity (max {product.qty_ordered})</FormLabel>
                  <FormField
                    control={form.control}
                    name={`products.${idx}.quantity`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="w-35"
                            type="number" {...field}
                            min={1}
                            max={product.qty_ordered}
                            onChange={(e) => {
                              const v = e.target.value;
                              field.onChange(v === "" ? "" : (Number(v) > product.qty_ordered ? product.qty_ordered:Number(v)));
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </FormItem>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}