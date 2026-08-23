export const common = {
  appName: "Invoice Generator",
  navigation: {
    mainLabel: "Main navigation",
    home: "Home",
    dashboard: "Dashboard",
    invoices: "Invoices",
  },
  actions: {
    logIn: "Log in",
    createAccount: "Create account",
  },
  dashboard: {
    description:
      "Use the invoice workspace while the remaining MVP features are built.",
    viewInvoices: "View invoices",
  },
  home: {
    description:
      "A focused learning app for creating reusable services and invoices.",
  },
  states: {
    loading: "Waiting",
    error: "Something went wrong",
  },
  errors: {
    generic: "Something went wrong",
    connection: "Failed to connect to the backend. Please try again later.",
  },
  datePicker: {
    placeholder: "Choose a date",
  },
  select: {
    placeholder: "Choose an option",
  },
} as const;
