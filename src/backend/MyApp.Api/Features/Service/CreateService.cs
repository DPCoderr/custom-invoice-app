using System.Security.Claims;
using FluentValidation;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using MyApp.Api.Data;
using MyApp.Api.Shared;

namespace MyApp.Api.Features.Service;

public class CreateService
{
    public record CreateServiceRequest(
        string Name,
        string? Description,
        decimal DefaultUnitPrice
    );
    
    public record ServiceResponse(
        Guid Id,
        string Name,
        string? Description,
        decimal DefaultUnitPrice
    );
    
    public sealed class Endpoint : IEndpoint
    {
        public void MapEndpoint(IEndpointRouteBuilder app)
        {
            app.MapPost("/services/create", Handler.Handle)
                .WithName("CreateService")
                .AddEndpointFilter<ValidationFilter<CreateServiceRequest>>()
                .RequireAuthorization();
        }
    }
    
    public class Validator : AbstractValidator<CreateServiceRequest>
    {
        public Validator()
        {
            RuleFor(x => x.Name)
                .NotEmpty()
                .MaximumLength(100);

            RuleFor(x => x.Description)
                .MaximumLength(250);

            RuleFor(x => x.DefaultUnitPrice)
                .GreaterThanOrEqualTo(0);
        }
    }

    private static class Handler
    {
        // public async Task<Created<ServiceResponse>> Handle()
        public static async Task<Results<Ok, UnauthorizedHttpResult>> Handle(
            CreateServiceRequest request,
            AppDbContext db,
            ClaimsPrincipal claimsPrincipal,
            UserManager<AppUser> userManager,
            CancellationToken cancellationToken)
        {
            var userId = userManager.GetUserId(claimsPrincipal);

            if (userId == null)
            {
                return TypedResults.Unauthorized();
            }
            
            var service = new Data.Service
            {
                UserId = userId,
                Name = request.Name,
                Description = request.Description,
                DefaultUnitPrice = request.DefaultUnitPrice
            };
            
            db.Services.Add(service);
            await db.SaveChangesAsync(cancellationToken);

            return TypedResults.Ok();
            // return TypedResults.Created<ServiceResponse>();
        }
    }
}