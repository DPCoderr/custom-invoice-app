namespace MyApp.Api.Data.Invoices;

public class InvoiceItem
{
    public Guid Id { get; set; }

    public Guid InvoiceId { get; set; }

    public Guid? ServiceId { get; set; }

    // Snapshot values so old invoices never change.
    public string ServiceName { get; set; } = string.Empty;

    public decimal UnitPrice { get; set; }

    public decimal Quantity { get; set; }

    public decimal LineTotal { get; set; }

    public Invoice Invoice { get; set; } = null!;

    public Service? Service { get; set; }
}
