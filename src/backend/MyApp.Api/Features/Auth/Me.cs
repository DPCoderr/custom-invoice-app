using System.Security.Claims;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using MyApp.Api.Data;

namespace MyApp.Api.Features.Auth;

public static class Me
{
  public sealed record MeResponseDto(string FirstName, string LastName, string Email, IEnumerable<string> Roles);
  
  public static async Task<Results<Ok<MeResponseDto>, UnauthorizedHttpResult>> Handle(
    ClaimsPrincipal claimsPrincipal,
    UserManager<AppUser> userManager
    )
  {
    var user = await userManager.GetUserAsync(claimsPrincipal);

    if (user == null)
    {
      return TypedResults.Unauthorized();
    }
    
    var roles = await userManager.GetRolesAsync(user);

    var userDtoResponse = new MeResponseDto(
      FirstName: user.FirstName,
      LastName: user.LastName,
      Email: user.Email!,
      Roles: roles
    );
    
    return TypedResults.Ok(userDtoResponse);
  }
}