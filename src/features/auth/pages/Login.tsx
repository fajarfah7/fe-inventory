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
import { CardWrapper } from "@/components/molecules/CardWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
      <div className="h-screen flex flex-col items-center p-40 bg-gray-400">
        <Card className="w-70 md:w-sm border border-gray-700">
          <CardHeader className="justify-center">
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-8">
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
                <div className="flex flex-row justify-end">
                  <Button type="submit">Login</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};