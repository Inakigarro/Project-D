using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Project_D.Api.Persistence;

public class IdentityDbContext : IdentityDbContext<IdentityUser>
{
    protected IdentityDbContext() {}
    
    public IdentityDbContext(DbContextOptions<IdentityDbContext> options)
        : base(options)
    {
    }
}