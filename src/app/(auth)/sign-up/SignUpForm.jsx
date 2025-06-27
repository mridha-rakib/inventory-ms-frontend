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
import { useRegisterMutation } from "@/redux/slices/usersApiSlice";
import { setCredentials } from "@/redux/slices/authSlice";
import { toast } from "sonner";
import { useRef } from "react";
import { Loader2 } from "lucide-react";

const registerSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }),
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .min(1, { message: "Email is required" }),
  password: z.string().trim().min(1, { message: "Password is required" }),
  image: z
    .instanceof(File)
    .optional()
    .refine((file) => {
      if (!file) return true;
      return true;
    })
    .refine((file) => {
      if (!file) return true;
      return file.size <= 5 * 1024 * 1024;
    }, "File size must be less than 5MB")
    .refine((file) => {
      if (!file) return true;
      return ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
        file.type
      );
    }, "Only JPEG, PNG, and WebP images are allowed"),
});

const SignUpForm = () => {
  const fileInputRef = useRef(null);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const dispatch = useDispatch();
  const router = useRouter();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      router.push("/home");
    }
  }, [userInfo, router]);

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      image: undefined,
    },
  });

  const onSubmit = (values) => {
    setError("");
    startTransition(async () => {
      try {
        const formData = new FormData();

        formData.append("name", values.name);
        formData.append("email", values.email);
        formData.append("password", values.password);

        if (values.image instanceof File) {
          formData.append("image", values.image);
        }

        const userData = await register(formData).unwrap();
        dispatch(setCredentials(userData));
        toast.success("User registration successfully");
        router.push("/home");
      } catch (error) {
        console.log(error);
        const errorMessage =
          error?.data?.message ||
          error?.error ||
          "Registration failed. Try again.";
        setError(errorMessage);
        toast.error(errorMessage);
      }
    });
  };

  if (userInfo) {
    return null;
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-6">
            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
              <span className="relative z-10 bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John Doe"
                        className="!h-[48px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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

              <FormField
                control={form.control}
                name="image"
                render={({ field: { onChange, value, ...field } }) => (
                  <FormItem>
                    <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                      Image
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        ref={fileInputRef}
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        className="!h-[48px]"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          onChange(file || undefined);
                        }}
                        {...field}
                        value={undefined}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={isPending || isLoading}
                className="w-full"
              >
                {(isPending || isLoading) && (
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                )}
                Sign up
              </Button>
            </div>
            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/" className="underline underline-offset-4">
                Sign in
              </Link>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SignUpForm;
