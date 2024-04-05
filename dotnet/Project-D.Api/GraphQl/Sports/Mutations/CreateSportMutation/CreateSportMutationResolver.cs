using IGarro.Sports.Application.Contracts;
using MassTransit;
using Project_D.Api.Services;

namespace Project_D.Api.GraphQl;

public class CreateSportMutationResolver
{
    private readonly ISportsService sportsService;

    public CreateSportMutationResolver(ISportsService sportsService)
    {
        this.sportsService = sportsService;
    }

    public async Task<SportUpdated> AddSport(CreateSport createSport)
    {
        CreateOrUpdateSport message = new CreateOrUpdateSport()
        {
            CorrelationId = NewId.NextGuid(),
            DisplayName = createSport.DisplayName,
        };
        return await this.sportsService.Add(message);
    }
}