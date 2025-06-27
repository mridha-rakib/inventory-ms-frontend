import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "@/redux/slices/usersApiSlice";
import { setCredentials } from "@/redux/slices/authSlice";
import { toast } from "sonner";
import { Loader } from "lucide-react";

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email("Invalid email address"),
  password: z.string().trim().min(1, {
    message: "Password is required",
  }),
});

const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState();
  const [isPending, startTransition] = useTransition();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      router.push("/home");
    }
  }, [userInfo, router]);

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  if (isLoading) {
    return <Loader className="animate-spin" />;
  }

  const onSubmit = (values) => {
    setError("");
    startTransition(async () => {
      try {
        const userData = await login(values).unwrap();
        dispatch(setCredentials(userData));
        toast.success("Successfully login");
        router.push("/home");
      } catch (error) {
        console.log(error);
        setError(
          error?.data?.message ||
            error?.error ||
            "Login failed. Please check your credentials."
        );
        toast.error(
          error?.data?.message || "Login failed. Please check your credentials."
        );
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        {error && <p className="text-center text-destructive">{error}</p>}
        <div className="grid gap-6">
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="m@example.com"
                      className="!h-[48px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input type="password" className="!h-[48px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={isLoading} type="submit" className="w-full">
            {isLoading && <Loader className="animate-spin" />}
            Login
          </Button>
          <div className="text-center text-sm">
            Don&apos;t have an account?
            <Link href="/sign-up" className="underline underline-offset-4">
              Sign up
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
