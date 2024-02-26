using MassTransit;

namespace IGarro.Users.Application;

public class CreateOrUpdateUsersConsumerDefinition : ConsumerDefinition<CreateOrUpdateUsersConsumer>
{
    protected override void ConfigureConsumer(
        IReceiveEndpointConfigurator endpointConfigurator,
        IConsumerConfigurator<CreateOrUpdateUsersConsumer> consumeConfigurator,
        IRegistrationContext context)
    {
        base.ConfigureConsumer(endpointConfigurator, consumeConfigurator, context);
        endpointConfigurator.UseMessageRetry(r => r.Intervals(500, 1000));
    }
}