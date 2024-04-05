using System.Threading.Tasks;
using IGarro.Sports.Application.Contracts;
using IGarro.Sports.Domain;
using IGarro.Sports.Persistence;
using MassTransit;
using Microsoft.Extensions.Logging;

namespace IGarro.Sports.Application;

public class CreateOrUpdateSportConsumer : IConsumer<CreateOrUpdateSport>
{
    private readonly ISportsRepository sportsRepository;
    private readonly ILogger<CreateOrUpdateSportConsumer> logger;

    public CreateOrUpdateSportConsumer(
        ISportsRepository sportsRepository,
        ILogger<CreateOrUpdateSportConsumer> logger)
    {
        this.sportsRepository = sportsRepository;
        this.logger = logger;
    }

    public async Task Consume(ConsumeContext<CreateOrUpdateSport> context)
    {
        var data = context.Message;

        var sport = await this.sportsRepository.GetByIdAsync(data.CorrelationId);

        if (sport is null)
        {
            this.logger.LogInformation($"Creating a new sport with data: {data}");
            sport = new Sport(data.CorrelationId);
            this.UpdateSport(data, sport);

            await this.sportsRepository.AddAsync(sport);
        }
        else
        {
            this.logger.LogInformation($"Updating sport with data: {data}");
            this.UpdateSport(data, sport);

            await this.sportsRepository.UpdateAsync(sport);
        }

        var sportUpdated = new SportUpdated()
        {
            CorrelationId = sport.CorrelationId,
            DisplayName = sport.DisplayName
        };

        await context.Publish(sportUpdated);
        await context.RespondAsync(sportUpdated);
    }

    private void UpdateSport(CreateOrUpdateSport data, Sport sport)
    {
        sport.SetDisplayName(data.DisplayName);
    }
}