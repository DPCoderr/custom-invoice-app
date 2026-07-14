import { useNavigate } from "@tanstack/react-router";
import { loginSchema, registerSchema } from "./schema";
import { login, logout, register } from "#/lib/api/auth";
import { useFormMutation } from "#/lib/hooks/use-form-mutation";
import { useMutation } from "@tanstack/react-query";

export function useLoginForm() {
  const navigate = useNavigate();

  return useFormMutation({
    schema: loginSchema,
    defaultValues: {
      email: "",
      password: "",
    },
    mutationFn: login,
    onSuccess: () => navigate({ to: "/dashboard" }),
  });
}

export function useRegisterForm() {
  const navigate = useNavigate();

  return useFormMutation({
    schema: registerSchema,
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mutationFn: register,
    onSuccess: () => navigate({ to: "/dashboard" }),
  });
}

export function useLogout() {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: logout,
    onSuccess: () => navigate({ to: "/" }),
  });

  const onSubmit = () => mutation.mutate();

  return { mutation, onSubmit}
}