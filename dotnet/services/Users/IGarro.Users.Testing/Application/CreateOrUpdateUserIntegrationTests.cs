using IGarro.Users.Application;
using IGarro.Users.Application.Contracts;
using IGarro.Users.Persistence;
using MassTransit;
using MassTransit.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace IGarro.Users.Testing.Application;

public class CreateOrUpdateUserIntegrationTests
{
    [Fact]
    public async Task CreateOrUpdateUser_WithValidData_ShouldCreate()
    {
        // Arrange.
        await using var serviceProvider = new ServiceCollection()
            .AddDbContext<UsersDbContext>(
                options =>
                {
                    options.UseSqlServer(
                        "Server=localhost;Database=IG.Club;User Id=sa;Password=Development001;Trusted_Connection=True;TrustServerCertificate=True",
                        assembly => assembly.MigrationsAssembly(typeof(UsersDbContext).Assembly.FullName));
                })
            .AddScoped<IUsersRepository, UsersRepository>()
            .AddMassTransitTestHarness(cfg =>
            {
                cfg.AddConsumer<CreateOrUpdateUserConsumer, CreateOrUpdateUserConsumerDefinition>();
                cfg.AddConsumer<GetAllUsersConsumer, GetAllUsersConsumerDefinition>();
                cfg.UsingInMemory((ctx, cfg) =>
                {
                    cfg.ConfigureEndpoints(ctx);
                });
            })
            .BuildServiceProvider(true);
        
        var testHarness = serviceProvider.GetRequiredService<ITestHarness>();
        await testHarness.Start();
        var createOrUpdateConsumerHarness = testHarness.GetConsumerHarness<CreateOrUpdateUserConsumer>();
        var publishEndpoint = serviceProvider.GetRequiredService<IPublishEndpoint>();
        
        Guid userId = NewId.NextGuid();
        string displayName = "Test User";
        string email = "email@email.com";
        
        // Act.
        await publishEndpoint.Publish(new CreateOrUpdateUser()
        {
            CorrelationId = userId,
            DisplayName = displayName,
            Email = email
        });
        
        // Assert.
        Assert.True(await testHarness.Published.Any<CreateOrUpdateUser>(m =>
            m.Context.Message.CorrelationId == userId &&
            m.Context.Message.DisplayName == displayName &&
            m.Context.Message.Email == email));
        Assert.True(await createOrUpdateConsumerHarness.Consumed.Any<CreateOrUpdateUser>(m =>
            m.Context.Message.CorrelationId == userId &&
            m.Context.Message.DisplayName == displayName &&
            m.Context.Message.Email == email));
        Assert.True(await testHarness.Published.Any<UserUpdated>(m =>
            m.Context.Message.CorrelationId == userId &&
            m.Context.Message.DisplayName == displayName &&
            m.Context.Message.Email == email));
    }
}