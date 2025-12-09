import { FormProvider, useForm } from "react-hook-form";
import { PurchaseOrderCreateSchema, type PurchaseOrderCreateZod } from "../schemas/purchase_order.create.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { FieldGroup, FieldSet } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { SelectSearch } from "@/components/ui/select-search";
import type { SelectOption } from "../types/select";
import { PurchaseOrderTableItems } from "./supplier/table";

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
      items: [],
    }
  });

  const { errors } = form.formState
  console.log(form.watch());
  console.log(errors);

  const onSubmit = (values: PurchaseOrderCreateZod) => {
    console.log(values);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <FieldSet>
              <FieldGroup>

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

                <FormProvider {...form}>
                  <PurchaseOrderTableItems form={form}  />
                </FormProvider>
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