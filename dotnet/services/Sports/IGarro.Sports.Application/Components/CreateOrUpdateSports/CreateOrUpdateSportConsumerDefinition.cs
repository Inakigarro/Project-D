using MassTransit;

namespace IGarro.Sports.Application ;

public class CreateOrUpdateSportConsumerDefinition : ConsumerDefinition<CreateOrUpdateSportConsumer>
{
    public CreateOrUpdateSportConsumerDefinition()
    {
        EndpointName = "create-or-update-sport";
    }

    protected override void ConfigureConsumer(
        IReceiveEndpointConfigurator endpointConfigurator,
        IConsumerConfigurator<CreateOrUpdateSportConsumer> consumerConfigurator,
        IRegistrationContext context)
    {
        base.ConfigureConsumer(endpointConfigurator, consumerConfigurator, context);
        endpointConfigurator.UseMessageRetry(r => r.Intervals(500, 1000));
    }
}