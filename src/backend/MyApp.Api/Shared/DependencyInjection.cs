using System.Reflection;
using FluentValidation;

namespace MyApp.Api.Shared;

public static class DependencyInjection
{
    // Scan classes in the app where IEndpoint is implemented and send them in a DI-container
    public static IServiceCollection AddFeatureServices(this IServiceCollection services)
    {
        services.AddValidatorsFromAssembly(typeof(DependencyInjection).Assembly);

        var assembly = typeof(DependencyInjection).Assembly;

        var endpointTypes = assembly.GetTypes()
            .Where(t => t.IsClass && !t.IsAbstract && typeof(IEndpoint).IsAssignableFrom(t));

        foreach (var type in endpointTypes)
        {
            services.AddTransient(typeof(IEndpoint), type);
        }

        return services;
    }

    // Get all endpoints
    public static IEndpointRouteBuilder MapFeatureEndpoints(this IEndpointRouteBuilder app)
    {
        using var scope = app.ServiceProvider.CreateScope();
        var endpoints = scope.ServiceProvider.GetRequiredService<IEnumerable<IEndpoint>>();

        foreach (var endpoint in endpoints)
        {
            endpoint.MapEndpoint(app); 
        }

        return app;
    }
}