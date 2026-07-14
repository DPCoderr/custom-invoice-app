using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using MyApp.Api.Data;

namespace MyApp.Api.Features.Auth;

public static class Logout
{
    public static async Task<Ok> Handle(SignInManager<AppUser> signInManager)
    {
        await signInManager.SignOutAsync();
        return TypedResults.Ok();
    }
}