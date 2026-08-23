import { buttonVariants } from "#/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Check, FileDown, FileText, Tag, UserRound } from "lucide-react";
import { useTranslation } from "react-i18next";

const benefitKeys = [
  "reusableServices",
  "serverTotals",
  "securePdf",
] as const;

const featureItems = [
  { key: "setup", icon: UserRound },
  { key: "services", icon: Tag },
  { key: "pdf", icon: FileDown },
] as const;

function InvoicePreview() {
  const { t } = useTranslation("common");

  return (
    <figure className="rounded-xl bg-muted/60 p-4 sm:p-7">
      <figcaption className="mb-4 text-center text-sm text-muted-foreground sm:text-base">
        {t("home.preview.caption")}
      </figcaption>
      <div className="mx-auto max-w-xl rounded-md border bg-card p-5 shadow-lg shadow-black/5 sm:p-8">
        <div className="flex items-start justify-between gap-4 border-b pb-5">
          <div className="flex items-center gap-2.5 font-semibold">
            <FileText aria-hidden="true" className="size-6" />
            <span>{t("home.preview.seller")}</span>
          </div>
          <p className="text-xl font-bold tracking-wide sm:text-2xl">
            {t("home.preview.invoice")}
          </p>
        </div>

        <dl className="mt-4 flex flex-wrap justify-between gap-x-6 gap-y-2 text-sm text-muted-foreground sm:text-base">
          <div>
            <dt className="sr-only">{t("home.preview.numberLabel")}</dt>
            <dd>{t("home.preview.number")}</dd>
          </div>
          <div>
            <dt className="sr-only">{t("home.preview.dateLabel")}</dt>
            <dd>{t("home.preview.date")}</dd>
          </div>
        </dl>

        <div className="my-5">
          <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase sm:text-sm">
            {t("home.preview.billTo")}
          </p>
          <p className="mt-1 font-semibold">{t("home.preview.customer")}</p>
        </div>

        <table
          aria-label={t("home.preview.tableLabel")}
          className="w-full border-collapse text-left text-sm sm:text-base"
        >
          <thead>
            <tr className="bg-muted/70 text-xs tracking-wide text-muted-foreground uppercase sm:text-sm">
              <th className="px-3 py-2 font-medium">
                {t("home.preview.description")}
              </th>
              <th className="px-3 py-2 text-right font-medium">
                {t("home.preview.amount")}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="px-3 py-3">{t("home.preview.website")}</td>
              <td className="px-3 py-3 text-right tabular-nums">
                {t("home.preview.websiteAmount")}
              </td>
            </tr>
            <tr className="border-b">
              <td className="px-3 py-3">{t("home.preview.architecture")}</td>
              <td className="px-3 py-3 text-right tabular-nums">
                {t("home.preview.architectureAmount")}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr className="bg-muted/70 text-base font-bold sm:text-lg">
              <th className="px-3 py-3 text-left">{t("home.preview.total")}</th>
              <td className="px-3 py-3 text-right tabular-nums">
                {t("home.preview.totalAmount")}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </figure>
  );
}

export function HomePage() {
  const { t } = useTranslation("common");

  return (
    <main className="overflow-x-hidden">
      <section className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16 lg:px-8 lg:py-20">
        <div>
          <p className="text-base text-muted-foreground sm:text-lg">
            {t("home.eyebrow")}
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl leading-tight font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {t("home.title")}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            {t("home.description")}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/signup"
              className={buttonVariants({
                size: "lg",
                className: "h-12 px-6 text-base",
              })}
            >
              {t("actions.createAccount")}
            </Link>
            <Link
              to="/login"
              className={buttonVariants({
                size: "lg",
                variant: "outline",
                className: "h-12 px-6 text-base max-sm:hidden",
              })}
            >
              {t("actions.logIn")}
            </Link>
          </div>

          <ul className="mt-8 grid gap-3 text-base sm:grid-cols-3 sm:text-sm lg:text-base">
            {benefitKeys.map((key) => (
              <li key={key} className="flex items-center gap-2">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-emerald-600 text-emerald-700">
                  <Check aria-hidden="true" className="size-4" />
                </span>
                <span>{t(`home.benefits.${key}`)}</span>
              </li>
            ))}
          </ul>
        </div>

        <InvoicePreview />
      </section>

      <section
        aria-label={t("home.features.label")}
        className="border-y bg-muted/20"
      >
        <div className="mx-auto grid max-w-7xl divide-y px-4 sm:px-6 md:grid-cols-3 md:divide-x md:divide-y-0 lg:px-8">
          {featureItems.map(({ key, icon: Icon }) => (
            <article className="flex gap-4 py-8 md:px-8" key={key}>
              <span className="flex size-12 shrink-0 items-center justify-center rounded-lg border bg-background">
                <Icon aria-hidden="true" className="size-6" />
              </span>
              <div>
                <h2 className="text-lg font-semibold">
                  {t(`home.features.${key}.title`)}
                </h2>
                <p className="mt-2 leading-7 text-muted-foreground">
                  {t(`home.features.${key}.description`)}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
