import { buttonVariants } from "#/components/ui/button";
import { Link } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { useTranslation } from "react-i18next";

export function Navbar() {
  const { t } = useTranslation("common");

  return (
    <nav
      aria-label={t("navigation.mainLabel")}
      className="border-b bg-background"
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex min-h-11 items-center gap-2 text-lg font-semibold text-foreground"
        >
          <FileText aria-hidden="true" className="size-6" />
          <span>{t("appName")}</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className={buttonVariants({
              variant: "outline",
              className: "h-11 px-4 text-base",
            })}
          >
            {t("actions.logIn")}
          </Link>
          <Link
            to="/signup"
            className={buttonVariants({
              className: "h-11 px-4 text-base max-sm:hidden",
            })}
          >
            {t("actions.createAccount")}
          </Link>
        </div>
      </div>
    </nav>
  );
}
