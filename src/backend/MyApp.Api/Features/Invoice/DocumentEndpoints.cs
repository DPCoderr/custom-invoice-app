using Microsoft.AspNetCore.Http.HttpResults;

public static class InvoiceEndpoints
{
	public static IEndpointRouteBuilder MapInvoiceEndpoints(this IEndpointRouteBuilder app)
	{
		var group = app.MapGroup("invoices");

		group.MapPost("/", Upload.Handle);

		return group;
	}
}