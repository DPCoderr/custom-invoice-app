import { useTranslation } from "react-i18next";

export function HomePage() {
  const { t } = useTranslation("common");

  return (
    <main className="mx-auto flex max-w-2xl flex-col items-center gap-4 px-6 py-24 text-center">
      <h1 className="text-4xl font-bold">{t("appName")}</h1>
      <p className="text-lg text-muted-foreground">{t("home.description")}</p>
    </main>
  );
}
