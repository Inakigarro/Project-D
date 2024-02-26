using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using IGarro.Users.Application.Contracts;
using IGarro.Users.Persistence;
using MassTransit;
using Microsoft.Extensions.Logging;

namespace IGarro.Users.Application;

public class GetAllUsersConsumer : IConsumer<GetAllUsers>
{
    private readonly IUsersRepository usersRepository;
    private readonly ILogger<GetAllUsersConsumer> logger;
    private readonly IMapper mapper;

    public GetAllUsersConsumer(
        IUsersRepository usersRepository,
        ILogger<GetAllUsersConsumer> logger,
        IMapper mapper)
    {
        this.usersRepository = usersRepository;
        this.logger = logger;
        this.mapper = mapper;
    }

    public async Task Consume(ConsumeContext<GetAllUsers> context)
    {
        this.logger.LogInformation("Requesting all the users");
        var users = await this.usersRepository.GetAllAsync();

        var response = new GetAllUsersReponse()
        {
            CorrelationId = NewId.NextGuid(),
            Users = this.mapper.Map<IEnumerable<UserUpdated>>(users)
        };
        
        await context.RespondAsync(response);
        await context.Publish(response);
    }
}