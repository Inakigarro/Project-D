using System.Reflection;
using MassTransit;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Project_D.Api.GraphQl;
using Project_D.Api.GraphQl.UpdateUserMutation;
using Project_D.Api.Persistence;
using Project_D.Api.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors();

builder.Services.AddMassTransit(x =>
{
    x.SetKebabCaseEndpointNameFormatter();
    x.SetInMemorySagaRepositoryProvider();
    var entryAssembly = Assembly.GetEntryAssembly();
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

builder.Services.AddControllers();
builder.Services.AddScoped<IUsersService, UsersService>();
builder.Services.AddScoped<ISportsService, SportsService>();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddGraphQLServer()
    .AddAuthorization()
    .AddQueryType<Query>()
    .AddMutationType<Mutation>()
    // Users
    .AddType<UserType>()
    .AddTypeExtension<UsersQueryResolver>()
    .AddTypeExtension<CreateUserMutationExtension>()
    .AddTypeExtension<UpdateUserMutationExtension>()
    // Sports
    .AddType<SportType>()
    .AddTypeExtension<SportsQueryResolver>()
    .AddTypeExtension<CreateSportMutationExtension>()
    .AddTypeExtension<UpdateSportMutationExtension>()
    .AddFiltering();

builder.Services
    .AddAuthorization()
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer();
var connectionString = builder.Configuration.GetConnectionString("IgClub");
builder.Services.AddDbContext<IdentityDbContext>(opts
    => opts.UseSqlServer(connectionString,
        assembly=>
            assembly.MigrationsAssembly(typeof(IdentityDbContext).Assembly.FullName)));
builder.Services
    .AddIdentityApiEndpoints<IdentityUser>()
    .AddEntityFrameworkStores<IdentityDbContext>();

var app = builder.Build();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<IdentityDbContext>();
    db.Database.Migrate();
}


app.UseCors(policyBuilder =>
{
    policyBuilder.WithOrigins("http://localhost:4200").AllowAnyMethod();
    policyBuilder.WithHeaders("content-type", "authorization");
});
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers()
    .WithOpenApi()
    .RequireAuthorization();
app.MapGraphQL()
    .RequireAuthorization();

app.MapIdentityApi<IdentityUser>();

app.Run();