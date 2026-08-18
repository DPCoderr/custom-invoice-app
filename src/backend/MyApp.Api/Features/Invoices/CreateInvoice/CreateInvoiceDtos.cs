public sealed record InvoiceDto(
    int Id,
    string InvoiceNumber,
    DateTime IssueDate,
    DateTime DueDate,
    CustomerDto Customer,
    List<InvoiceLineDto> Lines,
    string? Notes,
    Guid OwnerUserId,
    bool IsPaid,
    DateTime CreatedAt
);

public sealed record CustomerDto(
    string Name,
    string Street,
    string PostalCode,
    string City,
    string Email
);

public sealed record InvoiceLineDto(
    string Description,
    decimal UnitPrice,
    int Quantity,
    decimal VatRate = 0.21m
);