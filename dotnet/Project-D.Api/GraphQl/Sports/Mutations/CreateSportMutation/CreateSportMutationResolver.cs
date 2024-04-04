using IGarro.Sports.Application.Contracts;
using Project_D.Api.Services;

namespace Project_D.Api.GraphQl;

public class CreateSportMutationResolver
{
    private readonly ISportsService sportsService;

    public CreateSportMutationResolver(ISportsService sportsService)
    {
        this.sportsService = sportsService;
    }

    public async Task<SportUpdated> AddSport(CreateOrUpdateSport createSport)
    {
        return await this.sportsService.Add(createSport);
    }
}