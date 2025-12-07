import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FieldGroup, FieldSet } from "@/components/ui/field";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomerEditSchema, type CustomerEditZod } from "../schemas/customer.edit.schema";

export function CustomerFormEdit() {
  const form = useForm<CustomerEditZod>({
    resolver: zodResolver(CustomerEditSchema),
    disabled: false,
    defaultValues: {
      id: "",
      name: "",
      address: "",
      phone_number: "",
      email: "",
    }
  });
  return (
    <>
      <Form {...form}>
        <form>
          <FieldGroup>
            <FieldSet>
              <FieldGroup>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Input customer name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Input customer phone number" />
                      </FormControl>
                      <FormDescription>
                        Min phone number is 10 digits
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Input customer email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Input customer address" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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