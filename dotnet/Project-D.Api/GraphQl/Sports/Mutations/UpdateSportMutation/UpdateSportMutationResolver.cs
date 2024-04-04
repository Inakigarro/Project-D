using IGarro.Sports.Application.Contracts;
using Project_D.Api.Services;

namespace Project_D.Api.GraphQl;

public class UpdateSportMutationResolver
{
    private readonly ISportsService sportsService;

    public UpdateSportMutationResolver(ISportsService sportsService)
    {
        this.sportsService = sportsService;
    }

    public async Task<SportUpdated> UpdateSport(CreateOrUpdateSport updateSport)
    {
        return await this.sportsService.Update(updateSport);
    }
}