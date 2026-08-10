namespace MyApp.Api.Shared;

public interface IEndpoint
{
    void MapEndpoint(IEndpointRouteBuilder app);
}