using IGarro.Sports.Domain;
using Microsoft.EntityFrameworkCore;

namespace IGarro.Sports.Persistence;

public class SportsRepository : ISportsRepository
{
    private readonly SportsDbContext dbContext;

    public SportsRepository(SportsDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    public async Task<IEnumerable<Sport>> GetAllAsync()
    {
        return await this.dbContext.Sports.ToListAsync();
    }

    public async Task<Sport?> GetByIdAsync(Guid correlationId)
    {
        return await this.dbContext.Sports.FindAsync(correlationId);
    }

    public async Task AddAsync(Sport sport)
    {
        await this.dbContext.Sports.AddAsync(sport);
        await this.dbContext.SaveChangesAsync();
    }

    public async Task UpdateAsync(Sport sport)
    {
        this.dbContext.Sports.Update(sport);
        await this.dbContext.SaveChangesAsync();
    }

    public async Task DeleteAsync(Guid correlationId)
    {
        var sport = await this.dbContext.Sports.FindAsync(correlationId);
        
        if (sport is not null)
        {
            this.dbContext.Sports.Remove(sport);
            await this.dbContext.SaveChangesAsync();
        }
    }
}