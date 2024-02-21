using MassTransit;

namespace IGarro.Services.Addresses.Application.Consumers;

public class CreateOrUpdateAddressConsumerDefinition : ConsumerDefinition<CreateOrUpdateAddressConsumer>
{
    protected override void ConfigureConsumer(
        IReceiveEndpointConfigurator endpointConfigurator,
        IConsumerConfigurator<CreateOrUpdateAddressConsumer> consumerConfigurator,
        IRegistrationContext context)
    {
        base.ConfigureConsumer(endpointConfigurator, consumerConfigurator, context);
        endpointConfigurator.UseMessageRetry(r => r.Intervals(500, 1000));
    }
}