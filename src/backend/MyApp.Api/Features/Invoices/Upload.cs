using Microsoft.AspNetCore.Http.HttpResults;
using QuestPDF.Fluent;

public static class Upload
{
	public static FileContentHttpResult Handle()
	{
		var model = InvoiceDocumentDataSource.GetInvoiceDetails();
		var document = new InvoiceDocument(model);
		// document.GeneratePdfAndShow();

		byte[] pdf = document.GeneratePdf();

		return TypedResults.File(
			pdf,
			contentType: "application/pdf",
			fileDownloadName: "invoice.pdf"
		);
	}
}