import { HomePage } from "#/features/home/home-page";
import i18n from "#/i18n";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/")({
  component: HomePage,
  pendingComponent: () => <div>{i18n.t("states.loading")}</div>,
  errorComponent: () => <div>{i18n.t("states.error")}</div>,
});
