using IGarro.Users.Application.Contracts;

namespace Project_D.Api.Services;

public interface IUsersService
{
    Task<UserUpdated> Add(CreateOrUpdateUser createUser);
    Task<IEnumerable<UserUpdated>> GetAllAsync();
}