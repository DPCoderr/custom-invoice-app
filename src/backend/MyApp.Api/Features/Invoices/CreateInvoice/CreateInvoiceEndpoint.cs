using Microsoft.AspNetCore.Http.HttpResults;
using MyApp.Api.Data;
using MyApp.Api.Shared;

public class CreateInvoiceEndpoint : IEndpoint 
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
	    // app.MapPost("/invoices", Handle)
		   //  .WithName("CreateInvoice");
    }

    // private static async Task<Ok<string>> Handle(
    // 	InvoiceDto request,
    // 	CancellationToken cancellationToken,
    // 	IConfiguration configuration
    // )
    // {
    // 	// Implementation for handling the create invoice request
    // 	var invoice = await CreateInvoiceHandler.Handle(request, cancellationToken, configuration);
    // 	
    // 	return TypedResults.Ok("Invoice created successfully");
    // }
}
