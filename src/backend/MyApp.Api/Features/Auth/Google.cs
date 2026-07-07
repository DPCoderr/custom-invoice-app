using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Identity;
using MyApp.Api.Data;

namespace MyApp.Api.Features.Auth;

public static class Google
{
    public static IResult RedirectToGoogleLogin(
        string? returnUrl,
        LinkGenerator links,
        HttpContext ctx)
    {
        var redirectUri = links.GetPathByName("google-callback", new { returnUrl });
        var props = new AuthenticationProperties { RedirectUri = redirectUri };
        
        return TypedResults.Challenge(props, ["Google"]);
    }
    
    public static async Task<IResult> CallbackGoogle(
        string? returnUrl,
        HttpContext ctx,
        UserManager<AppUser> userManager,
        SignInManager<AppUser> signInManager)
    {
        // Retrieve google cookie data
        var resultGoogle = await ctx.AuthenticateAsync(GoogleDefaults.AuthenticationScheme);
        var principal = resultGoogle.Principal!;
        
        var email = principal.FindFirstValue(ClaimTypes.Email)!; 
        var firstName = principal.FindFirstValue(ClaimTypes.GivenName)!; 
        var lastName = principal.FindFirstValue(ClaimTypes.Surname)!; 
        
        // Search user, create if user doesn't exist in the database
        var user = await userManager.FindByEmailAsync(email);
        
        if (user == null)
        {
            user = new AppUser()
            {
                FirstName = firstName,
                LastName = lastName,                
                Email = email,
                UserName = email,
            };
            
            var resultCreateUser = await userManager.CreateAsync(user);
            
            if (!resultCreateUser.Succeeded)
            {
                return TypedResults.BadRequest(
                    resultCreateUser.Errors.Select(e => e.Description)
                );
            }
            
            await userManager.AddToRoleAsync(user, Roles.Member);
        }
        
        await signInManager.SignInAsync(user, isPersistent: false);

        // Redirect frontend url
        const string frontendBase = "http://localhost:3000";
        
        var redirectTo = returnUrl != null && returnUrl.StartsWith("/")
            ? $"{frontendBase}{returnUrl}" 
            : $"{frontendBase}";   
        
         return TypedResults.Redirect(redirectTo);
    }
}