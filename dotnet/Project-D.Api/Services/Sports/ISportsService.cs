using IGarro.Sports.Application.Contracts;

namespace Project_D.Api.Services;

public interface ISportsService
{
    Task<SportUpdated> Add(CreateOrUpdateSport createSport);
    Task<SportUpdated> Update(CreateOrUpdateSport updateUser);
    Task<IQueryable<SportUpdated>> GetAllAsync();
}