using AutoMapper;
using IGarro.Users.Application.Contracts;
using MassTransit;
using Project_D.Api.Services;

namespace Project_D.Api.GraphQl;

public class CreateUserMutationResolver
{
    private readonly IUsersService usersService;
    private readonly IMapper mapper;

    public CreateUserMutationResolver(
        IUsersService usersService,
        IMapper mapper)
    {
        this.usersService = usersService;
        this.mapper = mapper;
    }

    public async Task<UserUpdated> AddUser(CreateUser createUser)
    {
        var message = new CreateOrUpdateUser()
        {
            CorrelationId = NewId.NextGuid(),
            DisplayName = createUser.DisplayName,
            Email = createUser.Email
        };
        return await this.usersService.Add(message);
    }
}