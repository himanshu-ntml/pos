import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useAuth from "@/hooks/useAuth";

const formSchema = z.object({
  email: z.string().email().min(5, { message: "Required" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

export default function Authentication() {
  const { login, isAuthenticated } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  if (isAuthenticated) {
    return <div>You are logged in</div>;
  }
  function onSubmit(values: z.infer<typeof formSchema>) {
    login(values.email, values.password);
  }
  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
        <p className="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
          <ExclamationTriangleIcon className="w-8 h-8 mr-2" />
          Rest-App
        </p>
      </div>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
        <Card className="w-full mx-auto md:w-[500px] p-6 space-y-4">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Sign in to your account
          </h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" autoComplete="email" placeholder="example@mail.com" {...field} />
                    </FormControl>
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
                      <Input type="password" autoComplete="current-password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
          <div className="flex">
            <p className="text-sm text-gray-500 dark:text-gray-400">Have a difficulty to login ?</p>
            <a href="mailto:manager@email.com" className="text-sm ml-2 underline">
              Contact Manager
            </a>
          </div>
        </Card>
      </div>
    </section>
  );
}
