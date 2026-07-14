import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import { FormInput } from "../../components/form-input";
import { useRegisterForm } from "./mutations";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { form, mutation, onSubmit } = useRegisterForm();

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
                {form.formState.errors.root && (
                  <p
                    role="alert"
                    className="text-sm text-destructive text-center"
                  >
                    {form.formState.errors.root.message}
                  </p>
                )}
                <Button type="submit" disabled={mutation.isPending}>
                  Create Account
                </Button>
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
