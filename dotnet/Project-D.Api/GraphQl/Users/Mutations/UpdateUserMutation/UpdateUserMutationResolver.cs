using AutoMapper;
using IGarro.Users.Application.Contracts;
using Project_D.Api.Services;

namespace Project_D.Api.GraphQl.UpdateUserMutation;

public class UpdateUserMutationResolver
{
    private readonly IUsersService usersService;
    private readonly IMapper mapper;

    public UpdateUserMutationResolver(
        IUsersService usersService,
        IMapper mapper)
    {
        this.usersService = usersService;
        this.mapper = mapper;
    }

    public async Task<UserUpdated> UpdateUser(UpdateUser updateUser)
    {
        var message = new CreateOrUpdateUser()
        {
            CorrelationId = updateUser.CorrelationId,
            DisplayName = updateUser.DisplayName,
            Email = updateUser.Email
        };

        return await this.usersService.Update(message);
    }
}