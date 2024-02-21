using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace IGarro.Addresses.Domain;

public class AddressEntityTypeConfiguration : IEntityTypeConfiguration<Address>
{
    public void Configure(EntityTypeBuilder<Address> builder)
    {
        builder.HasKey(entity => entity.CorrelationId);

        builder.Property(entity => entity.City);
        builder.Property(entity => entity.Street);
        builder.Property(entity => entity.Number);
        builder.Property(entity => entity.Department);
    }
}