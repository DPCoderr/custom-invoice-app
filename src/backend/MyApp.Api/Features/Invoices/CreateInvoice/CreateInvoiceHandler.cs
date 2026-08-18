using Microsoft.AspNetCore.Http.HttpResults;
using MyApp.Api;
using QuestPDF.Fluent;
using Supabase;

public static class CreateInvoiceHandler
{
	public static async Task<Result<string>> Handle(
		InvoiceDto request,
		CancellationToken cancellationToken,
		IConfiguration configuration
	)
	{
		var model = InvoiceDocumentDataSource.GetInvoiceDetails();
		var document = new InvoiceDocument(model);

		byte[] pdf = document.GeneratePdf();

		var options = new SupabaseOptions
		{
			AutoConnectRealtime = true
		};

		var supabase = new Client(
			configuration["Supabase:SupabaseUrl"]!,
			configuration["Supabase:SupabaseKey"]!,
			options
		);
		
		await supabase.InitializeAsync();
		var fileName = $"invoices/{Guid.NewGuid()}.pdf";

		await supabase.Storage
			.From("invoices")
			.Upload(pdf, fileName, new Supabase.Storage.FileOptions
			{
	            ContentType = "application/pdf",
		        Upsert = true
			}, cancellationToken:  cancellationToken);

		return Result<string>.Success("File successfully made");
	}
}