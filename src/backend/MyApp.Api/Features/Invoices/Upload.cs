using Microsoft.AspNetCore.Http.HttpResults;
using QuestPDF.Fluent;
using Supabase;


public static class Upload
{
	public static async Task<IResult> Handle(
		IConfiguration configuration
	)
	{
		var model = InvoiceDocumentDataSource.GetInvoiceDetails();
		var document = new InvoiceDocument(model);
		// document.GeneratePdfAndShow();

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
			.Upload(
        pdf,
				fileName,
        new Supabase.Storage.FileOptions
        {
            ContentType = "application/pdf",
						Upsert = true
        });

		return Results.Ok(new
    {
        Path = fileName
    });
	}
}