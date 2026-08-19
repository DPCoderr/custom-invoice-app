using MyApp.Api.Data;
using MyApp.Api.Data.Invoices;

public class Invoice
{
    public Guid Id { get; set; }

    public string UserId { get; set; } = string.Empty;

    public Guid InvoiceNumber { get; set; }

    public string CustomerName { get; set; } = string.Empty;

    public string? CustomerEmail { get; set; }

    public string? CustomerAddress { get; set; }

    public DateOnly IssueDate { get; set; }

    public DateOnly DueDate { get; set; }

    public string Currency { get; set; } = "EUR";

    public string? Notes { get; set; }

    public decimal TotalAmount { get; set; }

    public string? PdfPath { get; set; }

    public bool IsPaid { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    

    public AppUser User { get; set; } = null!;
    public ICollection<InvoiceItem> Items { get; set; } = new List<InvoiceItem>();
}
