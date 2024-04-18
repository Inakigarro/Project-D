using System;
using System.Threading.Tasks;
using IGarro.Users.Persistence;
using Microsoft.Extensions.Hosting;
using MassTransit;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace IGarro.Users.Application;

public class Program
{
    public static async Task Main(string[] args)
    {
        var app = CreateHostBuilder(args).Build();

        using (var scope = app.Services.CreateScope())
        {
            var db = scope.ServiceProvider.GetRequiredService<UsersDbContext>();
            await db.Database.MigrateAsync();
        }

        await app.RunAsync();
    }

    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureServices((builderContext, services) =>
            {
                services.AddAutoMapper(opts =>
                {
                    opts.AddProfile(new UserAutoMapperProfile());
                });
                services.AddMassTransit(x =>
                {
                    x.SetKebabCaseEndpointNameFormatter();

                    x.AddConsumer<CreateOrUpdateUserConsumer, CreateOrUpdateUserConsumerDefinition>();
                    x.AddConsumer<GetAllUsersConsumer, GetAllUsersConsumerDefinition>();
                    
                    x.UsingRabbitMq((ctx, cfg) =>
                    {
                        bool isRunningInContainer = bool.TryParse(Environment.GetEnvironmentVariable("DOTNET_RUNNING_IN_CONTAINER"),
                            out var inDocker) && inDocker;
                        cfg.Host(isRunningInContainer ? "rabbitmq" : "localhost", "/", h =>
                        {
                            h.Username("guest");
                            h.Password("guest");
                        });
                        
                        cfg.ConfigureEndpoints(ctx);
                    });
                });
                var connectionString = builderContext.Configuration.GetConnectionString("IgClub");
                services.AddDbContext<UsersDbContext>(
                    options =>
                    {
                        options.UseSqlServer(connectionString,assembly =>
                            assembly.MigrationsAssembly(typeof(UsersDbContext).Assembly.FullName));
                    });
                
                services.AddScoped<IUsersRepository, UsersRepository>();
            });
}
