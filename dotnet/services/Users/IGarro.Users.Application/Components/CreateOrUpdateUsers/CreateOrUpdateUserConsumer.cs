using System.Threading.Tasks;
using IGarro.Users.Application.Contracts;
using IGarro.Users.Domain;
using IGarro.Users.Persistence;
using MassTransit;
using Microsoft.Extensions.Logging;

namespace IGarro.Users.Application;

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