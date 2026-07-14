using MyApp.Api.Data;

namespace MyApp.Api.Features.Auth;

public static class AuthEndpoints
{
    public static IEndpointRouteBuilder MapAuthEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/auth");

        group.MapPost("/register", Register.Handle)
            .WithName("register");
        group.MapPost("/login", Login.Handle)
            .WithName("login");
        group.MapPost("/logout", Logout.Handle)
            .RequireAuthorization()
            .WithName("logout");
        group.MapGet("/me", Me.Handle)
            .RequireAuthorization()
            // .RequireAuthorization(p => p.RequireRole(Roles.Admin))
            .WithName("me");
        
        // Google endpoints
        group.MapGet("/google", Google.RedirectToGoogleLogin)
            .WithName("google");
        group.MapGet("/google-callback", Google.CallbackGoogle)
            .WithName("google-callback");
        
        return group;
    }
}