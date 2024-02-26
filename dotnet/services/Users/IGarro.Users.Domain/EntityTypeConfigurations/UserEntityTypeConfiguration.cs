using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace IGarro.Users.Domain;

public class UserEntityTypeConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.HasKey(entity => entity.CorrelationId);

        builder.Property(entity => entity.DisplayName);
        builder.Property(entity => entity.Email);
    }
}