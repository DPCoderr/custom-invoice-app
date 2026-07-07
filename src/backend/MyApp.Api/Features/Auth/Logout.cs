using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using MyApp.Api.Data;

namespace MyApp.Api.Features.Auth;

public static class Logout
{
    public static async Task<RedirectHttpResult> Handle(SignInManager<AppUser> signInManager)
    {
        await signInManager.SignOutAsync();
        
        // Redirect frontend url
        const string urlFrontend = "http://localhost:3000";
        
        return TypedResults.Redirect(urlFrontend);
    }
}