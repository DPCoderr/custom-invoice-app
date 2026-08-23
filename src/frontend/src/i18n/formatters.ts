import i18n, { defaultLocale } from "#/i18n";

function currentLocale() {
  return i18n.resolvedLanguage ?? i18n.language ?? defaultLocale;
}

export function formatDate(value: Date) {
  return new Intl.DateTimeFormat(currentLocale(), {
    dateStyle: "long",
  }).format(value);
}

export function formatCurrency(value: number, currency = "EUR") {
  return new Intl.NumberFormat(currentLocale(), {
    style: "currency",
    currency,
  }).format(value);
}
