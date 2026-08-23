import { auth } from "#/i18n/locales/en/auth";
import { common } from "#/i18n/locales/en/common";
import { invoices } from "#/i18n/locales/en/invoices";
import { profile } from "#/i18n/locales/en/profile";
import { services } from "#/i18n/locales/en/services";

export const namespaces = [
  "common",
  "auth",
  "profile",
  "services",
  "invoices",
] as const;

export const resources = {
  en: { common, auth, profile, services, invoices },
} as const;
