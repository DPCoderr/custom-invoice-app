import type { DefaultValues, FieldValues } from "react-hook-form";
import type z from "zod";

export type FormMutationOptions<
  TSchema extends z.ZodType<FieldValues, FieldValues>,
  TData = unknown,
> = {
  schema: TSchema;
  defaultValues: DefaultValues<z.input<TSchema>>;
  mutationFn: (values: z.infer<TSchema>) => Promise<TData>;
  onSuccess?: (data: TData) => void;
};
