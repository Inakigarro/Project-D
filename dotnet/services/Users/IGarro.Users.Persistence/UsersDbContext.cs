using IGarro.Users.Domain;
using Microsoft.EntityFrameworkCore;

namespace IGarro.Users.Persistence;

public class UsersDbContext : DbContext
{
    public DbSet<User> Users { get; set; }
    
    protected UsersDbContext()
    {}

    public UsersDbContext(DbContextOptions options)
        : base(options)
    {}

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.HasDefaultSchema("Users");
        modelBuilder.ApplyConfiguration(new UserEntityTypeConfiguration());
    }
}