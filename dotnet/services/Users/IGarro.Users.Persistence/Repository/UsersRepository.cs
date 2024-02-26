using IGarro.Users.Domain;
using Microsoft.EntityFrameworkCore;

namespace IGarro.Users.Persistence;

public class UsersRepository: IUsersRepository
{
    private readonly UsersDbContext dbContext;

    public UsersRepository(UsersDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    public async Task<IEnumerable<User>> GetAllAsync()
    {
        return await this.dbContext.Users.ToListAsync();
    }

    public async Task<User?> GetByIdAsync(Guid correlationId)
    {
        return await this.dbContext.Users.FindAsync(correlationId);
    }

    public async Task AddAsync(User user)
    {
        await this.dbContext.Users.AddAsync(user);
        await this.dbContext.SaveChangesAsync();
    }

    public async Task UpdateAsync(User user)
    {
        this.dbContext.Users.Update(user);
        await this.dbContext.SaveChangesAsync();
    }

    public async Task DeleteAsync(Guid correlationId)
    {
        var user = await this.dbContext.Users.FindAsync(correlationId);

        if (user is not null)
        {
            this.dbContext.Users.Remove(user);
            await this.dbContext.SaveChangesAsync();
        }
    }
}