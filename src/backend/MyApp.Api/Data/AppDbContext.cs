using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using MyApp.Api.Data.Invoices;

namespace MyApp.Api.Data;

public sealed class AppDbContext(DbContextOptions<AppDbContext> options) 
    : IdentityDbContext<AppUser>(options)
{
    public DbSet<Invoice> Invoices => Set<Invoice>();
    public DbSet<InvoiceItem> InvoiceItems => Set<InvoiceItem>();
    public DbSet<Service> Services => Set<Service>();
}
