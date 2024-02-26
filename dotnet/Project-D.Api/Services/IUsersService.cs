using IGarro.Users.Application.Contracts;

namespace Project_D.Api.Services;

public interface IUsersService
{
    Task<IEnumerable<UserUpdated>> GetAllAsync();
}