import { useForm } from "react-hook-form";
import { LoginSchema, type LoginZod } from "../schemas/main";
import { zodResolver } from "@hookform/resolvers/zod";
import type { LoginValue } from "@/features/auth/types/Login";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type LoginFormProps = {
  onSubmit: (data: LoginValue) => void;
}

export function Login({ onSubmit }: LoginFormProps) {
  const form = useForm<LoginZod>({
    resolver: zodResolver(LoginSchema),
    disabled: false,
    defaultValues: {
      username: "",
      password: "",
    }
  });
  form.watch
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormDescription>
                  Input your username.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormDescription>
                  Input your password.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Login</Button>
        </form>
      </Form>
    </>
  );
};