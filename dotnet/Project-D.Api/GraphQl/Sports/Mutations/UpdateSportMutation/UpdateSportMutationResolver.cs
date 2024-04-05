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

    public async Task<SportUpdated> UpdateSport(UpdateSport updateSport)
    {
        CreateOrUpdateSport message = new CreateOrUpdateSport()
        {
            CorrelationId = updateSport.CorrelationId,
            DisplayName = updateSport.DisplayName,
        };
        return await this.sportsService.Update(message);
    }
}