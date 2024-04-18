using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using IGarro.Sports.Application.Contracts;
using IGarro.Sports.Persistence;
using MassTransit;
using Microsoft.Extensions.Logging;

namespace IGarro.Sports.Application;

public class GetAllSportsConsumer : IConsumer<GetAllSports>
{
    private readonly ISportsRepository sportsRepository;
    private readonly ILogger<GetAllSportsConsumer> logger;
    private readonly IMapper mapper;

    public GetAllSportsConsumer(
        ISportsRepository sportsRepository,
        ILogger<GetAllSportsConsumer> logger,
        IMapper mapper)
    {
        this.sportsRepository = sportsRepository;
        this.logger = logger;
        this.mapper = mapper;
    }

    public async Task Consume(ConsumeContext<GetAllSports> context)
    {
        this.logger.LogInformation("Requesting all the sports");
        var sports = await this.sportsRepository.GetAllAsync();

        var response = new GetAllSportsResponse()
        {
            CorrelationId = NewId.NextGuid(),
            Sports = this.mapper.Map<IEnumerable<SportUpdated>>(sports),
        };

        await context.Publish(response);
        await context.RespondAsync(response);
    }
}