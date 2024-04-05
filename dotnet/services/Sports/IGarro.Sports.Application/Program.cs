using System.Threading.Tasks;
using IGarro.Sports.Persistence;
using Microsoft.Extensions.Hosting;
using MassTransit;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace IGarro.Sports.Application;

public class Program
{
    public static async Task Main(string[] args)
    {
        await CreateHostBuilder(args).Build().RunAsync();
    }

    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureServices((hostContext, services) =>
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
                        cfg.Host("localhost", "/", h =>
                        {
                            h.Username("guest");
                            h.Password("guest");
                        });
                        
                        cfg.ConfigureEndpoints(ctx);
                    });
                });
                
                services.AddDbContext<SportsDbContext>(
                    options =>
                    {
                        options.UseSqlServer(
                            "Server=localhost;Database=IG.Club;User Id=sa;Password=Development001;Trusted_Connection=True;TrustServerCertificate=True",
                            assembly => assembly.MigrationsAssembly(typeof(SportsDbContext).Assembly.FullName));
                    });

                services.AddScoped<ISportsRepository, SportsRepository>();
            });
}
