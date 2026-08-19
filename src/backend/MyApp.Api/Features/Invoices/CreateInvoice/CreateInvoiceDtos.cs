public record CreateInvoiceItemRequest(
    Guid? ServiceId,
    string ServiceName,
    decimal UnitPrice,
    decimal Quantity
);

public record CreateInvoiceRequest(
    DateOnly IssueDate,
    DateOnly DueDate,
    string CustomerName,
    string? CustomerEmail,
    string? CustomerAddress,
    string Currency,
    string? Notes,
    IReadOnlyList<CreateInvoiceItemRequest> Items
);

public record InvoiceResponse(
    Guid Id,
    string InvoiceNumber,
    DateOnly IssueDate,
    DateOnly DueDate,
    decimal TotalAmount,
    string Currency,
    string? PdfPath
);


