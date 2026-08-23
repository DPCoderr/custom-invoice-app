import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { namespaces, resources } from "#/i18n/resources";

export const defaultLocale = "en";

if (!i18n.isInitialized) {
  void i18n.use(initReactI18next).init({
    resources,
    lng: defaultLocale,
    fallbackLng: defaultLocale,
    supportedLngs: [defaultLocale],
    defaultNS: "common",
    ns: namespaces,
    interpolation: { escapeValue: false },
    returnNull: false,
  });
}

export default i18n;
