import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
} from "@/components/ui/field";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { FormInput } from "./form-input";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { register } from "#/lib/api/auth";

export const registerSchema = z
  .object({
    firstName: z.string().trim().min(1),
    lastName: z.string().trim().min(1),
    email: z.email().trim(),
    password: z
      .string()
      .min(6)
      .regex(/[a-z]/)
      .regex(/[A-Z]/)
      .regex(/\d/)
      .regex(/[^a-zA-Z0-9]/),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type RegisterSchemaValues = z.infer<typeof registerSchema>;

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();

  const form = useForm<RegisterSchemaValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: () => navigate({ to: "/dashboard" }),
    onError: (error) => form.setError("root", { message: error.message }),
  });

  function onSubmit(data: RegisterSchemaValues) {
    form.clearErrors("root");
    mutation.mutate(data);
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="signup-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <FormInput
                name="firstName"
                control={form.control}
                label="Firstname"
                placeholder="John"
                type="text"
              />
              <FormInput
                name="lastName"
                control={form.control}
                label="Lastname"
                placeholder="Doe"
                type="text"
              />

              <FormInput
                name="email"
                control={form.control}
                label="Email"
                placeholder="j.doe@gmail.com"
                type="email"
              />
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <FormInput
                    name="password"
                    control={form.control}
                    label="Password"
                    type="password"
                  />
                  <FormInput
                    name="confirmPassword"
                    control={form.control}
                    label="Confirm Password"
                    type="password"
                  />
                </Field>
                <FieldDescription>
                  Must be at least 6 characters long.
                </FieldDescription>
              </Field>
              <Field>
                <Button type="submit">Create Account</Button>
                <FieldDescription className="text-center">
                  Already have an account? <a href="#">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
