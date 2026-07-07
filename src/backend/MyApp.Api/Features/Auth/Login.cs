using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using MyApp.Api.Data;

namespace MyApp.Api.Features.Auth;

public class Login
{
    public sealed record LoginRequest(string Email, string Password, bool RememberMe = false);
    
    public static async Task<Results<Ok, BadRequest<string>>> Handle(
        LoginRequest request,
        AppDbContext db,
        SignInManager<AppUser> signInManager
    )
    {
        var user = await signInManager.UserManager.FindByEmailAsync(request.Email);
        
        if (user == null)
        {
            return TypedResults.BadRequest("Email or password is incorrect");
        }
        
        var result = await signInManager.PasswordSignInAsync(
            request.Email, 
            request.Password, 
            request.RememberMe, 
            false
        );

        if (!result.Succeeded)
        {
            return TypedResults.BadRequest("Email or password is incorrect");
        }
        
        return TypedResults.Ok();
    }
}