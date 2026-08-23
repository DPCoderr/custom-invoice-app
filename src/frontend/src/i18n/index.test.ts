import { describe, expect, it } from "vitest";
import i18n, { defaultLocale } from "#/i18n";
import { formatCurrency, formatDate } from "#/i18n/formatters";
import { resources } from "#/i18n/resources";

describe("English localization", () => {
  it("initializes the fixed English namespaces", () => {
    expect(i18n.isInitialized).toBe(true);
    expect(i18n.language).toBe(defaultLocale);
    expect(Object.keys(resources.en)).toEqual([
      "common",
      "auth",
      "profile",
      "services",
      "invoices",
    ]);
    expect(i18n.t("login.title", { ns: "auth" })).toBe("Welcome back");
    expect(i18n.t("common:errors.connection")).toBe(
      "Failed to connect to the backend. Please try again later.",
    );
    expect(i18n.t("invoices:errors.invalidResponse")).toBe(
      "Invalid response from server",
    );
    expect(i18n.t("missing.key", { ns: "common" })).toBe("missing.key");
  });

  it("formats dates and EUR with the selected locale", () => {
    expect(formatDate(new Date(2026, 7, 23))).toBe("August 23, 2026");
    expect(formatCurrency(1240.5)).toBe("€1,240.50");
  });
});
