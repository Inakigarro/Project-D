using IGarro.Sports.Domain;

namespace IGarro.Sports.Persistence;

public interface ISportsRepository
{
    Task<IEnumerable<Sport>> GetAllAsync();
    Task<Sport?> GetByIdAsync(Guid correlationId);
    Task AddAsync(Sport sport);
    Task UpdateAsync(Sport sport);
    Task DeleteAsync(Guid correlationId);
}