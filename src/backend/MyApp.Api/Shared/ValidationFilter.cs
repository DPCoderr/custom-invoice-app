using FluentValidation;

namespace MyApp.Api.Shared;

public sealed class ValidationFilter<TRequest> : IEndpointFilter
{
    public async ValueTask<object?> InvokeAsync(
        EndpointFilterInvocationContext context,
        EndpointFilterDelegate next)
    {
        // Get the validator for this request type from DI
        var validator = context.HttpContext.RequestServices
            .GetService<IValidator<TRequest>>();

        // If no validator exists, continue to the endpoint
        if (validator is null)
        {
            return await next(context);
        }

        // Find the request object in the endpoint arguments
        var request = context.Arguments
            .OfType<TRequest>()
            .FirstOrDefault();

        // If no request object was found, continue to the endpoint
        if (request is null)
        {
            return await next(context);
        }

        // Validate the request
        var result = await validator.ValidateAsync(
            request,
            context.HttpContext.RequestAborted);

        // Return HTTP 400 if validation failed
        if (!result.IsValid)
        {
            return Results.ValidationProblem(
                result.ToDictionary());
        }

        return await next(context);
    }
}