using MassTransit;

namespace IGarro.Sports.Application;

public class GetAllSportsConsumerDefinition : ConsumerDefinition<GetAllSportsConsumer>
{
    protected override void ConfigureConsumer(
        IReceiveEndpointConfigurator endpointConfigurator,
        IConsumerConfigurator<GetAllSportsConsumer> consumeConfigurator,
        IRegistrationContext context)
    {
        base.ConfigureConsumer(endpointConfigurator, consumeConfigurator, context);
        endpointConfigurator.UseMessageRetry(r => r.Intervals(500, 1000));
    }
}