using System;
using System.Threading.Tasks;
using IGarro.Sports.Persistence;
using Microsoft.Extensions.Hosting;
using MassTransit;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace IGarro.Sports.Application;

public class Program
{
    public static async Task Main(string[] args)
    {
        var app = CreateHostBuilder(args).Build();

        using (var scope = app.Services.CreateScope())
        {
            var db = scope.ServiceProvider.GetRequiredService<SportsDbContext>();
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
                    opts.AddProfile(new SportAutoMapperProfile());
                });
                
                services.AddMassTransit(x =>
                {
                    x.SetKebabCaseEndpointNameFormatter();

                    x.AddConsumer<CreateOrUpdateSportConsumer, CreateOrUpdateSportConsumerDefinition>();
                    x.AddConsumer<GetAllSportsConsumer, GetAllSportsConsumerDefinition>();
                    
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
                services.AddDbContext<SportsDbContext>(
                    options =>
                    {
                        options.UseSqlServer(connectionString,assembly =>
                            assembly.MigrationsAssembly(typeof(SportsDbContext).Assembly.FullName));
                    });

                services.AddScoped<ISportsRepository, SportsRepository>();
            });
}
