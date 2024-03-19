# Consumers

A consumer is a common tool used to communicate between services. This tool
consume messages published within the service or from another service to do
something.

Here is an example of the `CreateOrUpdateUserConsumer` that you can find in
the users service.

```csharp
public class CreateOrUpdateUserConsumer : IConsumer<CreateOrUpdateUser>
{
    private readonly IUsersRepository userRepository;
    private readonly ILogger<CreateOrUpdateUserConsumer> logger;
    
    public CreateOrUpdateUserConsumer(
        IUsersRepository userRepository,
        ILogger<CreateOrUpdateUserConsumer> logger)
    {
        this.userRepository = userRepository;
        this.logger = logger;
    }

    public async Task Consume(ConsumeContext<CreateOrUpdateUser> context)
    {
        var data = context.Message;

        var user = await this.userRepository.GetByIdAsync(data.CorrelationId);

        if (user is null)
        {
            this.logger.LogInformation($"Creating a new user with data: {data}");
            user = new User(data.CorrelationId);
            this.UpdateUser(data, user);

            await this.userRepository.AddAsync(user);
        }
        else
        {
            this.logger.LogInformation($"Updating user with data: {data}");
            this.UpdateUser(data, user);

            await this.userRepository.UpdateAsync(user);
        }

        var userUpdated = new UserUpdated()
        {
            CorrelationId = user.CorrelationId,
            DisplayName = user.DisplayName,
            Email = user.Email,
        };
        
        await context.Publish(userUpdated);

        await context.RespondAsync(userUpdated);
    }

    private void UpdateUser(CreateOrUpdateUser data, User user)
    {
        user.SetDisplayName(data.DisplayName);
        user.SetEmail(data.Email);
    }
} 

```

This is the most common consumer type. A simple class that, for each message
that consumes, needs to implement `IConsumer<TMessage>` and the corresponding Consume method.

Here we are injecting a repository to obtain, create and update the corresponding entity, and publishing a message that indicates that the operation was completed successfuly. This last step is recommended to notice other services to update related data.

## Registering the consumer

To add the consumer and automatically configure a receive endpoint, we need to register the consumer in the masstransit pipeline.

```csharp
public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureServices((_, services) =>
            {
                services.AddMassTransit(x =>
                {
                    x.SetKebabCaseEndpointNameFormatter();

                    x.AddConsumer<CreateOrUpdateUserConsumer, CreateOrUpdateUserConsumerDefinition>();
                });
            });
```

## Configuring the consumer

You can configure a consumer in two different ways. In the masstransit pipeline