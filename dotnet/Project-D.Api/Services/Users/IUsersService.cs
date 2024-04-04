using IGarro.Users.Application.Contracts;

namespace Project_D.Api.Services;

public interface IUsersService
{
    Task<UserUpdated> Add(CreateOrUpdateUser createUser);
    Task<UserUpdated> Update(CreateOrUpdateUser updateUser);
    Task<IQueryable<UserUpdated>> GetAllAsync();
}