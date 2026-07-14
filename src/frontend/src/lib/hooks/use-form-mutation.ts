import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm, type FieldValues } from "react-hook-form";
import type z from "zod";
import type { FormMutationOptions } from "./types";

export function useFormMutation<
  TSchema extends z.ZodType<FieldValues, FieldValues>,
  TData = unknown,
>(options: FormMutationOptions<TSchema, TData>) {
  const form = useForm<z.input<TSchema>, any, z.output<TSchema>>({
    resolver: zodResolver(options.schema),
    defaultValues: options.defaultValues,
  });

  const mutation = useMutation({
    mutationFn: options.mutationFn,
    onSuccess: options.onSuccess,
    onError: (error) => form.setError("root", { message: error.message }),
  });

  function onSubmit(data: z.infer<TSchema>) {
    form.clearErrors("root");
    mutation.mutate(data);
  }

  return { form, onSubmit, mutation };
}
