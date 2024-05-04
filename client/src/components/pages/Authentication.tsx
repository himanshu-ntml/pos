import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import $api from "@/api";
import { decodeJwt } from "jose";
import { toast } from "../ui/use-toast";
import { Navigate } from "react-router-dom";

const formSchema = z.object({
  email: z.string().email().min(5, { message: "Required" }),
  password: z.string().min(4, { message: "Password too short" }),
});

export default function Authentication() {
  const signIn = useSignIn();
  const auth = useAuthUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  if (auth) return <Navigate to="/" />;
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await $api
      .post<{ session: string }>("/auth/login", {
        email: values.email,
        password: values.password,
      })
      .catch((e) => {
        toast({
          title: "Something went wrong...",
          description: e.response.data.message,
          variant: "destructive",
        });
      });

    if (!response?.data) {
      return;
    }
    const user = decodeJwt(response.data.session);
    signIn({
      auth: {
        token: response.data.session,
        type: "Bearer",
      },
      userState: {
        name: user.name,
        id: user.id,
      },
    });
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
            Login to your account
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
                      <Input
                        type="email"
                        autoComplete="email"
                        placeholder="example@mail.com"
                        {...field}
                      />
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
                      <Input
                        type="password"
                        autoComplete="current-password"
                        placeholder="********"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Login</Button>
            </form>
          </Form>
          <div className="flex">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Have a difficulty to login ?
            </p>
            <a
              href="mailto:manager@email.com"
              className="text-sm ml-2 underline"
            >
              Contact Manager
            </a>
          </div>
        </Card>
      </div>
    </section>
  );
}
