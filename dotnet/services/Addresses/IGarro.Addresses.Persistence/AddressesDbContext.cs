using IGarro.Addresses.Domain;
using Microsoft.EntityFrameworkCore;

namespace IGarro.Addresses.Persistence;

public class AddressesDbContext : DbContext
{
    public DbSet<Address> Addresses { get; set; }
    
    protected AddressesDbContext()
    {}

    public AddressesDbContext(DbContextOptions options)
        : base(options)
    {}

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.HasDefaultSchema("Addresses");
        modelBuilder.ApplyConfiguration(new AddressEntityTypeConfiguration());
    }
}