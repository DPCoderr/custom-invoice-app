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
  FieldSeparator,
} from "@/components/ui/field";
import { FormInput } from "../../components/form/form-input";
import { Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "#/lib/api/auth";
import { loginSchema, type LoginSchemaType } from "./schema";
import { userQueryOptions } from "#/lib/queries/user-query-options";
import { useTranslation } from "react-i18next";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { t } = useTranslation("auth");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: userQueryOptions.queryKey });
      navigate({ to: "/dashboard" });
    },
    onError: (error) => form.setError("root", { message: error.message }),
  });

  function onSubmit(data: LoginSchemaType) {
    form.clearErrors("root");
    mutation.mutate(data);
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">{t("login.title")}</CardTitle>
          <CardDescription>{t("login.description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              {/* External login */}
              <Field>
                {/* Google */}
                <Button
                  nativeButton={false}
                  variant="outline"
                  type="button"
                  render={
                    <a href={"http://localhost:5050/api/auth/google"}>
                      <svg
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                          fill="currentColor"
                        />
                      </svg>
                      {t("login.google")}
                    </a>
                  }
                ></Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                {t("login.divider")}
              </FieldSeparator>

              {/* Manual inputs */}
              <FormInput
                name="email"
                control={form.control}
                label={t("fields.email")}
                type="email"
              />
              <FormInput
                name="password"
                control={form.control}
                label={t("fields.password")}
                type="password"
              />
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
                  {t("login.submit")}
                </Button>
                <FieldDescription className="text-center">
                  {t("login.noAccount")} {" "}
                  <Link to="/signup">{t("login.signupLink")}</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
