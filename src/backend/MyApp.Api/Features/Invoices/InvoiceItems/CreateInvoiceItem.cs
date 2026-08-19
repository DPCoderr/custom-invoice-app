using Microsoft.AspNetCore.Http.HttpResults;
using MyApp.Api.Data;
using MyApp.Api.Shared;

namespace MyApp.Api.Features.Invoices.InvoiceItems;

public class CreateInvoiceItem
{
    public record CreateInvoiceItemRequest(
        Guid? ServiceId,
        string ServiceName,
        decimal UnitPrice,
        decimal Quantity
    );
    
    public class Endpoint : IEndpoint
    {
        public void MapEndpoint(IEndpointRouteBuilder app)
        {
            app.MapPost("/Invoices/items/create", Handler.Handle)
                .WithName("CreateInvoiceItem")
                .RequireAuthorization();
        }
        
        private static class Handler
        {
            public static async Task<Ok> Handle(
                CreateInvoiceItemRequest  request,
                AppDbContext db,
                CancellationToken cancellationToken)
            {
                
               return TypedResults.Ok();
            }
        }
    }
}