using IGarro.Sports.Application.Contracts;
using MassTransit;

namespace Project_D.Api.Services;

public class SportsService : ISportsService
{
    private readonly IRequestClient<GetAllSports> getSportsRequestClient;
    private readonly IRequestClient<CreateOrUpdateSport> createOrUpdateSportRequestClient;

    public SportsService(
        IRequestClient<GetAllSports> getSportsRequestClient,
        IRequestClient<CreateOrUpdateSport> createOrUpdateSportRequestClient)
    {
        this.getSportsRequestClient = getSportsRequestClient;
        this.createOrUpdateSportRequestClient = createOrUpdateSportRequestClient;
    }

    public async Task<SportUpdated> Add(CreateOrUpdateSport createSport)
    {
        var result = await this.createOrUpdateSportRequestClient.GetResponse<SportUpdated>(createSport);
        return result.Message;
    }

    public async Task<SportUpdated> Update(CreateOrUpdateSport updateSport)
    {
        var result = await this.createOrUpdateSportRequestClient.GetResponse<SportUpdated>(updateSport);
        return result.Message;
    }

    public async Task<IQueryable<SportUpdated>> GetAllAsync()
    {
        var sports = await this.getSportsRequestClient.GetResponse<GetAllSportsResponse>(new GetAllSports());

        return sports.Message.Sports.AsQueryable();
    }
}