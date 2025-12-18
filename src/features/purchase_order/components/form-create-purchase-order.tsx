import { FormProvider, useForm } from "react-hook-form";
import { PurchaseOrderCreateSchema, type PurchaseOrderCreateZod } from "../schemas/purchase_order.create.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { FieldGroup, FieldSet } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { SelectSearch } from "@/components/ui/select-search";
import { PurchaseOrderTableItems } from "./card-create-purchase-order";
import { DateYYYYMMDD } from "../../../components/ui/date";
import { Textarea } from "@/components/ui/textarea";
import type { SelectOption } from "@/types/select-options.type";

const suppliers: SelectOption[] = [
  {
    value: "1",
    label: "Next.js",
  },
  {
    value: "2",
    label: "SvelteKit",
  },
  {
    value: "3",
    label: "Nuxt.js",
  },
  {
    value: "4",
    label: "Remix",
  },
  {
    value: "5",
    label: "Astro",
  },
  {
    value: "aaa",
    label: "zxc",
  },
]

export function PurchaseOrderCreateForm() {

  const form = useForm<PurchaseOrderCreateZod>({
    resolver: zodResolver(PurchaseOrderCreateSchema),
    disabled: false,
    defaultValues: {
      supplier_id: "",
      expected_date: "",
      products: [],
    }
  });

  const onSubmit = (values: PurchaseOrderCreateZod) => {
    console.log("FORM_VALUES:", values);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <FieldSet>
              <FieldGroup>

                <div className="flex flex-col md:flex-row gap-2">
                  <FormField
                    control={form.control}
                    name="supplier_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Supplier</FormLabel>
                        <FormControl>
                          <SelectSearch
                            options={suppliers}
                            value={field.value}
                            placeholder="Select supplier"
                            onChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="expected_date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expected Date</FormLabel>
                        <FormControl>
                          <DateYYYYMMDD onSelect={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Address" />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className={form.watch("supplier_id") !== "" ? "block" : "hidden"}>
                  <FormProvider {...form}>
                    <PurchaseOrderTableItems form={form} />
                  </FormProvider>
                </div>

              </FieldGroup>
            </FieldSet>
          </FieldGroup>
          {/* ACTION AREA */}
          <div className="flex justify-end mt-4">
            <Button type="submit" className="w-auto">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}