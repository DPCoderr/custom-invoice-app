import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";
import { FormInput } from "#/components/form/form-input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createInvoiceSchema, type CreateInvoiceType } from "../schema";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { createInvoice } from "./mutation";
import { FormDatePicker } from "#/components/form/form-date-picker";
import { useTranslation } from "react-i18next";

export function CreateInvoiceForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { t } = useTranslation("invoices");
  const form = useForm({
    defaultValues: {
      clientName: "",
      issueDate: new Date(),
      dueDate: new Date(),
      notes: "",
    },
    resolver: zodResolver(createInvoiceSchema),
  });

  const mutation = useMutation({
    mutationFn: createInvoice,
    onSuccess: () => toast.success(t("create.success")),
    onError: (error) => form.setError("root", { message: error.message }),
  });

  function onSubmit(data: CreateInvoiceType) {
    form.clearErrors("root");
    mutation.mutate(data);
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardContent>
          <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <FormInput
                name="clientName"
                control={form.control}
                label={t("fields.clientName")}
                type="text"
              />
              <FormDatePicker
                name="issueDate"
                control={form.control}
                label={t("fields.issueDate")}
              />
              <FormDatePicker
                name="dueDate"
                control={form.control}
                label={t("fields.dueDate")}
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
                  {t("create.submit")}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
