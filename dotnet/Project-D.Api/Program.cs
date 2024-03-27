using System.Reflection;
using MassTransit;
using Project_D.Api.GraphQl;
using Project_D.Api.GraphQl.UpdateUserMutation;
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
});

builder.Services.AddControllers();
builder.Services.AddScoped<IUsersService, UsersService>();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddGraphQLServer()
    .AddQueryType<Query>()
    .AddMutationType<Mutation>()
    .AddType<UserType>()
    .AddTypeExtension<UsersQueryResolver>()
    .AddTypeExtension<CreateUserMutationExtension>()
    .AddTypeExtension<UpdateUserMutationExtension>();

var app = builder.Build();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(policyBuilder =>
{
    policyBuilder.WithOrigins("http://localhost:4200").AllowAnyMethod();
    policyBuilder.WithHeaders("content-type");
});
app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers();
app.MapGraphQL();

app.Run();