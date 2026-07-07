using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using MyApp.Api.Data;

namespace MyApp.Api.Features.Auth;

public static class Register
{
    public sealed record RegisterRequestDto(
        string FirstName, 
        string LastName, 
        string Email, 
        string Password, 
        bool RememberMe = false
    );

    public static async Task<Results<Ok, BadRequest<IEnumerable<string>>>> Handle(
        RegisterRequestDto request,
        AppDbContext db,
        UserManager<AppUser> userManager,
        SignInManager<AppUser> signInManager)
    {
        var user = new AppUser()
        {
            FirstName =  request.FirstName,
            LastName =  request.LastName,
            Email = request.Email,
            UserName =  request.Email,
        };
        
        var result = await userManager.CreateAsync(user, request.Password);

        if (!result.Succeeded)
        {
            return TypedResults.BadRequest(result.Errors.Select(e => e.Description));
        }
        
        // Assign role and sign in
        await userManager.AddToRoleAsync(user, Roles.Member);
        await signInManager.SignInAsync(user, isPersistent: request.RememberMe);
        
        return TypedResults.Ok();
    }
}