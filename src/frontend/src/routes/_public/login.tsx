import { GalleryVerticalEnd } from "lucide-react";
import { LoginForm } from "#/features/auth/login-form";

import { createFileRoute, redirect } from "@tanstack/react-router";
import { userQueryOptions } from "#/lib/queries/user-query-options";

export const Route = createFileRoute("/_public/login")({
  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.ensureQueryData(userQueryOptions);
    if (user) {
      throw redirect({ to: "/dashboard" });
    }
  },
  component: Login,
});

function Login() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Acme Inc.
        </a>
        <LoginForm />
      </div>
    </div>
  );
}
