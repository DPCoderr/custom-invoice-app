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
    eyebrow: "Simple invoicing for independent work",
    title: "Create clear invoices without the clutter.",
    description:
      "Set up your business profile, reuse services, and generate downloadable PDF invoices in one focused workflow.",
    benefits: {
      reusableServices: "Reusable services",
      serverTotals: "Server-calculated totals",
      securePdf: "Secure PDF download",
    },
    preview: {
      caption: "A clean invoice, ready to download.",
      seller: "Pixel & Paper Studio",
      invoice: "INVOICE",
      numberLabel: "Invoice number",
      number: "INV-2026-3654B204",
      dateLabel: "Issue date",
      date: "Aug 23, 2026",
      billTo: "Bill to",
      customer: "Example Customer B.V.",
      tableLabel: "Invoice preview",
      description: "Description",
      amount: "Amount",
      website: "Website development",
      websiteAmount: "€850.00",
      architecture: "Architecture review",
      architectureAmount: "€250.00",
      total: "Total",
      totalAmount: "€1,100.00",
    },
    features: {
      label: "Why use Invoice Generator",
      setup: {
        title: "Set up once",
        description:
          "Complete your business profile so your invoice details are always ready.",
      },
      services: {
        title: "Reuse services",
        description: "Add your services once and use them across your invoices.",
      },
      pdf: {
        title: "Download PDFs",
        description: "Generate clean, professional PDF invoices in a focused flow.",
      },
    },
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
