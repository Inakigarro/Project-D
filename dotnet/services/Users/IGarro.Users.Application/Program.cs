using System.Threading.Tasks;
using IGarro.Users.Persistence;
using Microsoft.Extensions.Hosting;
using MassTransit;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace IGarro.Users.Application;

public class Program
{
    public static async Task Main(string[] args)
    {
        await CreateHostBuilder(args).Build().RunAsync();
    }

    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureServices((_, services) =>
            {
                services.AddAutoMapper(opts =>
                {
                    opts.AddProfile(new UserAutoMapperProfile());
                });
                services.AddMassTransit(x =>
                {
                    x.SetKebabCaseEndpointNameFormatter();

                    x.AddConsumer<CreateOrUpdateUsersConsumer, CreateOrUpdateUsersConsumerDefinition>();
                    x.AddConsumer<GetAllUsersConsumer, GetAllUsersConsumerDefinition>();
                    
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

                services.AddDbContext<UsersDbContext>(
                    options =>
                    {
                        options.UseSqlServer(
                            "Server=localhost;Database=IG.Club;User Id=sa;Password=Development001;Trusted_Connection=True;TrustServerCertificate=True",
                            assembly => assembly.MigrationsAssembly(typeof(UsersDbContext).Assembly.FullName));
                    });

                services.AddScoped<IUsersRepository, UsersRepository>();
            });
}
