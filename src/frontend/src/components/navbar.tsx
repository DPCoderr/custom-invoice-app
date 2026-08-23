import { Button } from "#/components/ui/button";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export function Navbar() {
  const { t } = useTranslation("common");

  return (
    <nav
      aria-label={t("navigation.mainLabel")}
      className="h-16 flex items-center justify-between px-6 bg-white border-b border-gray-200"
    >
      <Link to="/" className="text-lg font-semibold text-black">
        {t("appName")}
      </Link>
      <div className="flex items-center gap-3">
        <Button
          nativeButton={false}
          variant="ghost"
          render={<Link to="/login">{t("actions.logIn")}</Link>}
        />
        <Button
          nativeButton={false}
          render={<Link to="/signup">{t("actions.createAccount")}</Link>}
        />
      </div>
    </nav>
  );
}
