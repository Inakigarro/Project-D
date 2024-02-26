using IGarro.Users.Domain;

namespace IGarro.Users.Persistence;

public interface IUsersRepository
{
    Task<IEnumerable<User>> GetAllAsync();
    Task<User?> GetByIdAsync(Guid correlationId);
    Task AddAsync(User user);
    Task UpdateAsync(User user);
    Task DeleteAsync(Guid correlationId);
}