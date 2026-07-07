using Microsoft.AspNetCore.Identity;

namespace MyApp.Api.Data;

public sealed class AppUser : IdentityUser
{
    public required string  FirstName { get; set; }
    public required string  LastName { get; set; }
}