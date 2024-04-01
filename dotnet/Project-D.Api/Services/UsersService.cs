using IGarro.Users.Application.Contracts;
using MassTransit;
using Project_D.Api.GraphQl;

namespace Project_D.Api.Services;

public class UsersService : IUsersService
{
    private readonly IPublishEndpoint publishEndpoint;
    private readonly IRequestClient<GetAllUsers> getUsersRequestClient;
    private readonly IRequestClient<CreateOrUpdateUser> createOrUpdateUserRequestClient;
    
    public UsersService(
        IPublishEndpoint publishEndpoint,
        IRequestClient<GetAllUsers> getUsersRequestClient,
        IRequestClient<CreateOrUpdateUser> createOrUpdateUserRequestClient)
    {
        this.publishEndpoint = publishEndpoint;
        this.getUsersRequestClient = getUsersRequestClient;
        this.createOrUpdateUserRequestClient = createOrUpdateUserRequestClient;
    }

    public async Task<UserUpdated> Add(CreateOrUpdateUser createUser)
    {
        var result = await this.createOrUpdateUserRequestClient.GetResponse<UserUpdated>(createUser);
        return result.Message;
    }

    public async Task<UserUpdated> Update(CreateOrUpdateUser updateUser)
    {
        var result = await this.createOrUpdateUserRequestClient.GetResponse<UserUpdated>(updateUser);
        return result.Message;
    }
    
    public async Task<IQueryable<UserUpdated>> GetAllAsync()
    {
        var users = await this.getUsersRequestClient.GetResponse<GetAllUsersReponse>(new GetAllUsers());
        
        return users.Message.Users.AsQueryable();
    }
}