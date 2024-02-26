using IGarro.Users.Application.Contracts;
using MassTransit;

namespace Project_D.Api.Services;

public class UsersService : IUsersService
{
    private readonly IRequestClient<GetAllUsers> requestClient;

    public UsersService(IRequestClient<GetAllUsers> requestClient)
    {
        this.requestClient = requestClient;
    }

    public async Task<IEnumerable<UserUpdated>> GetAllAsync()
    {
        var users = await this.requestClient.GetResponse<GetAllUsersReponse>(new GetAllUsers());
        return users.Message.Users;
    }
}