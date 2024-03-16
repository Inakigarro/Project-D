using MassTransit;

namespace IGarro.Users.Application;

public class CreateOrUpdateUserConsumerDefinition : ConsumerDefinition<CreateOrUpdateUserConsumer>
{
    public CreateOrUpdateUserConsumerDefinition()
    {
        EndpointName = "create-or-update-user";
    }
    protected override void ConfigureConsumer(
        IReceiveEndpointConfigurator endpointConfigurator,
        IConsumerConfigurator<CreateOrUpdateUserConsumer> consumeConfigurator,
        IRegistrationContext context)
    {
        base.ConfigureConsumer(endpointConfigurator, consumeConfigurator, context);
        endpointConfigurator.UseMessageRetry(r => r.Intervals(500, 1000));
    }
}