using System.Reflection;
using IGarro.Addresses.Application.Contracts;
using MassTransit;
using Project_D.Api.GraphQl;
using Project_D.Api.Services;

const string allowedOrigin = "allowedOrigin";

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
        cfg.Host("localhost", "/", h =>
        {
            h.Username("guest");
            h.Password("guest");
        });
                        
        cfg.ConfigureEndpoints(ctx);
    });
    x.AddRequestClient<CreateOrUpdateAddress>(new Uri("exchange:create-or-update-address"));
});

builder.Services.AddControllers();
builder.Services.AddScoped<IUsersService, UsersService>();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddGraphQLServer()
    .AddQueryType<Query>()
    .AddType<UserType>()
    .AddTypeExtension<AddressQueryExtension>()
    .AddTypeExtension<UsersQueryResolver>()
    .AddMutationType<Mutation>();


var app = builder.Build();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(options => options.WithOrigins("http://localhost:4200").AllowAnyMethod());
app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers();
app.MapGraphQL();

app.Run();