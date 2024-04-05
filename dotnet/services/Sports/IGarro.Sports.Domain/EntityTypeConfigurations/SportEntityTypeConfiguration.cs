using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace IGarro.Sports.Domain;

public class SportEntityTypeConfiguration : IEntityTypeConfiguration<Sport>
{
    public void Configure(EntityTypeBuilder<Sport> builder)
    {
        builder.HasKey(entity => entity.CorrelationId);

        builder.Property(entity => entity.DisplayName);
    }
}