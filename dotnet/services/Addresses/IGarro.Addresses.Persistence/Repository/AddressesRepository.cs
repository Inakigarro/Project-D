using IGarro.Addresses.Domain;
using Microsoft.EntityFrameworkCore;

namespace IGarro.Addresses.Persistence;

public class AddressesRepository : IAddressesRepository
{
    private readonly AddressesDbContext dbContext;
    private bool disposed = false;
    
    public AddressesRepository(AddressesDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    public async Task<IEnumerable<Address>> GetAll()
    {
        return await this.dbContext.Addresses.ToListAsync();
    }

    public async Task<Address?> GetByIdAsync(Guid correlationId)
    {
        return await this.dbContext.Addresses.FindAsync(correlationId);
    }

    public async Task AddAsync(Address address)
    {
        await this.dbContext.Addresses.AddAsync(address);
        await this.dbContext.SaveChangesAsync();
    }

    public async Task UpdateAsync(Address address)
    {
        this.dbContext.Addresses.Update(address);
        await this.dbContext.SaveChangesAsync();
    }

    public async Task DeleteAsync(Guid correlationId)
    {
        var address = await this.dbContext.Addresses.FindAsync(correlationId);

        if (address is not null)
        {
            this.dbContext.Addresses.Remove(address);
            await this.dbContext.SaveChangesAsync();
        }
    }
}