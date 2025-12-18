import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { FormProvider, useForm } from "react-hook-form";
import { DeliveryOrderCreateSchema, type DeliveryOrderCreateZod } from "../schemas/delivery-order-create.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldGroup, FieldSet } from "@/components/ui/field";
import { SelectSearch } from "@/components/ui/select-search";
import { DateYYYYMMDD } from "@/components/ui/date";
import { DeliveryOrderProducts } from "./table-create-delivery-order";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getDeliveryOrderProducts } from "../api/delivery-order-create.api";
import { useEffect } from "react";
import type { SelectOption } from "@/types/select-options.type";

const warehouses: SelectOption[] = [
  {
    value: "1",
    label: "Warehouse Cikarang I",
  },
  {
    value: "2",
    label: "Warehouse Cikarang II",
  },
  {
    value: "3",
    label: "Warehouse Bandung I",
  },
  {
    value: "4",
    label: "Warehouse Semarang I",
  },
  {
    value: "5",
    label: "Warehouse Semarang II",
  },
  {
    value: "6",
    label: "Warehouse Surabayar I",
  },
  {
    value: "7",
    label: "Warehouse Surabayar II",
  },
]

const couriers: SelectOption[] = [
  {
    value: "1",
    label: "Adam",
  },
  {
    value: "2",
    label: "Andre",
  },
  {
    value: "3",
    label: "Basyir",
  },
  {
    value: "4",
    label: "Bayu",
  },
  {
    value: "5",
    label: "Candra",
  },
  {
    value: "6",
    label: "Dani",
  },
  {
    value: "7",
    label: "Erwin",
  },
]

export function DeliveryOrderCreateForm() {

  const { loading, data, errors } = getDeliveryOrderProducts();

  const form = useForm<DeliveryOrderCreateZod>({
    resolver: zodResolver(DeliveryOrderCreateSchema),
    disabled: false,
    defaultValues: {
      warehouse_id: "",
      shipped_date: "",
      courier_user_id: "",
      vehicle_number: "",
      products: [],
    }
  });

  useEffect(() => {
    if (!data?.products) return;
    form.reset({
      warehouse_id: "",
      shipped_date: "",
      courier_user_id: "",
      vehicle_number: "",
      products: data?.products.map((product) => ({
        ...product,
        qty_ordered: product.qty_ordered,
        quantity: 0,
      })),
    });
  }, [data]);

  const onSubmit = (values: DeliveryOrderCreateZod) => {
    console.log("FORM_VALUES:", values);
  }

  if (loading) return <p className="flex flex-row justify-center pt-10">Loading...</p>;
  if (errors) return (<ul>{errors.map((msg, idx) => <li key={idx}>{msg}</li>)}</ul>)

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <FieldSet>
              <FieldGroup>

                <div className="flex flex-col md:flex-row gap-4 md:gap-2 flex-wrap">
                  <FormField
                    control={form.control}
                    name="warehouse_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Warehouse</FormLabel>
                        <FormControl>
                          <SelectSearch
                            options={warehouses}
                            value={String(field.value)}
                            placeholder="Select Warehouse"
                            onChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="shipped_date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Shipped Date</FormLabel>
                        <FormControl>
                          <DateYYYYMMDD onSelect={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="courier_user_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Courier</FormLabel>
                        <FormControl>
                          <SelectSearch
                            options={couriers}
                            value={String(field.value)}
                            placeholder="Select Courier"
                            onChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="vehicle_number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Vehicle Number</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <FormProvider {...form}>
                  <DeliveryOrderProducts form={form} />
                </FormProvider>

                <div>
                  <Button type="submit">Submit</Button>
                </div>

              </FieldGroup>
            </FieldSet>
          </FieldGroup>
        </form>
      </Form>
    </>
  )
}