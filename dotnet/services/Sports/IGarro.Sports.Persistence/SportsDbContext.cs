using IGarro.Sports.Domain;
using Microsoft.EntityFrameworkCore;

namespace IGarro.Sports.Persistence;

public class SportsDbContext : DbContext
{
    public DbSet<Sport> Sports { get; set; }
    
    protected SportsDbContext()
    {}

    public SportsDbContext(DbContextOptions options)
        : base(options)
    {}

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.HasDefaultSchema("Sports");
        modelBuilder.ApplyConfiguration(new SportEntityTypeConfiguration());
    }
}