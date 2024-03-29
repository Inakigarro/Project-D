using System.Threading.Tasks;
using IGarro.Addresses.Persistence;
using IGarro.Services.Addresses.Application.Consumers;
using Microsoft.Extensions.Hosting;
using MassTransit;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace IGarro.Services.Addresses.Application;

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
                services.AddMassTransit(x =>
                {
                    x.SetKebabCaseEndpointNameFormatter();

                    x.AddConsumer<CreateOrUpdateAddressConsumer, CreateOrUpdateAddressConsumerDefinition>();

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

                services.AddDbContext<AddressesDbContext>(
                    options =>
                    {
                        options.UseSqlServer(
                            "Server=localhost;Database=IG.Club;User Id=sa;Password=Development001;Trusted_Connection=True;TrustServerCertificate=True",
                            assembly => assembly.MigrationsAssembly(typeof(AddressesDbContext).Assembly.FullName));
                    });

                services.AddScoped<IAddressesRepository, AddressesRepository>();
            });
}