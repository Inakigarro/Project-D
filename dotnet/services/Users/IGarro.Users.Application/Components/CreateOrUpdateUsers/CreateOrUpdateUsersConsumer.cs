using System.Threading.Tasks;
using IGarro.Users.Application.Contracts;
using IGarro.Users.Domain;
using IGarro.Users.Persistence;
using MassTransit;
using Microsoft.Extensions.Logging;

namespace IGarro.Users.Application;

public class CreateOrUpdateUsersConsumer : IConsumer<CreateOrUpdateUser>
{
    private readonly IUsersRepository userRepository;
    private readonly ILogger<CreateOrUpdateUsersConsumer> logger;
    
    public CreateOrUpdateUsersConsumer(
        IUsersRepository userRepository,
        ILogger<CreateOrUpdateUsersConsumer> logger)
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

        await context.Publish(new UserUpdated()
        {
            CorrelationId = user.CorrelationId,
            DisplayName = user.DisplayName,
            Email = user.Email,
        });

        await context.RespondAsync(new UserUpdated()
        {
            CorrelationId = user.CorrelationId,
            DisplayName = user.DisplayName,
            Email = user.Email,
        });
    }

    private void UpdateUser(CreateOrUpdateUser data, User user)
    {
        user.SetDisplayName(data.DisplayName);
        user.SetEmail(data.Email);
    }
}