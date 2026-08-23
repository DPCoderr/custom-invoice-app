export const invoices = {
  title: "Invoices",
  create: {
    title: "Create an invoice",
    submit: "Create invoice",
    success: "Invoice created successfully",
  },
  fields: {
    clientName: "Client name",
    issueDate: "Issue date",
    dueDate: "Due date",
  },
  validation: {
    descriptionRequired: "Description is required",
    issueDateRequired: "Issue date is required",
    dueDateRequired: "Due date is required",
    dueDateAfterIssue: "Due date must be on or after the issue date",
    lineRequired: "At least one invoice line is required",
  },
  errors: {
    invalidResponse: "Invalid response from server",
  },
} as const;
