using IGarro.Users.Application.Contracts;
using MassTransit;

namespace Project_D.Api.Services;

public class UsersService : IUsersService
{
    private readonly IRequestClient<GetAllUsers> getUsersRequestClient;
    private readonly IRequestClient<CreateOrUpdateUser> createOrUpdateUserRequestClient;
    
    public UsersService(
        IRequestClient<GetAllUsers> getUsersRequestClient,
        IRequestClient<CreateOrUpdateUser> createOrUpdateUserRequestClient)
    {
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