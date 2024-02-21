using IGarro.Addresses.Domain;

namespace IGarro.Addresses.Persistence;

public interface IAddressesRepository
{
    Task<IEnumerable<Address>> GetAll();
    Task<Address?> GetByIdAsync(Guid correlationId);
    Task AddAsync(Address address);
    Task UpdateAsync(Address address);
    Task DeleteAsync(Guid correlationId);
}