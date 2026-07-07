using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace MyApp.Api.Data;

public sealed class AppDbContext(DbContextOptions<AppDbContext> options) 
    : IdentityDbContext<AppUser>(options)
{
    
}
