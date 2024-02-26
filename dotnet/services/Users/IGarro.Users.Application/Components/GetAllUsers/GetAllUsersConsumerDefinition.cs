using MassTransit;

namespace IGarro.Users.Application;

public class GetAllUsersConsumerDefinition : ConsumerDefinition<GetAllUsersConsumer>
{
    protected override void ConfigureConsumer(
        IReceiveEndpointConfigurator endpointConfigurator,
        IConsumerConfigurator<GetAllUsersConsumer> consumeConfigurator,
        IRegistrationContext context)
    {
        base.ConfigureConsumer(endpointConfigurator, consumeConfigurator, context);
        endpointConfigurator.UseMessageRetry(r => r.Intervals(500, 1000));
    }
}