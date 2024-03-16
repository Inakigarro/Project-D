using IGarro.Users.Application.Contracts;
using MassTransit;
using Project_D.Api.GraphQl;

namespace Project_D.Api.Services;

public class UsersService : IUsersService
{
    private readonly IPublishEndpoint publishEndpoint;
    private readonly IRequestClient<GetAllUsers> getUsersRequestClient;
    private readonly IRequestClient<CreateOrUpdateUser> createUserRequestClient;
    

    public UsersService(
        IPublishEndpoint publishEndpoint,
        IRequestClient<GetAllUsers> getUsersRequestClient,
        IRequestClient<CreateOrUpdateUser> createUserRequestClient)
    {
        this.publishEndpoint = publishEndpoint;
        this.getUsersRequestClient = getUsersRequestClient;
        this.createUserRequestClient = createUserRequestClient;
    }

    public async Task<UserUpdated> Add(CreateOrUpdateUser createUser)
    {
        var result = await this.createUserRequestClient.GetResponse<UserUpdated>(createUser);
        return result.Message;
    }
    
    public async Task<IEnumerable<UserUpdated>> GetAllAsync()
    {
        var users = await this.getUsersRequestClient.GetResponse<GetAllUsersReponse>(new GetAllUsers());
        return users.Message.Users;
    }
}