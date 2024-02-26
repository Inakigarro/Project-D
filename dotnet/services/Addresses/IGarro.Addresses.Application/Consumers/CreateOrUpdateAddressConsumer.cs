using System.Threading.Tasks;
using IGarro.Addresses.Application.Contracts;
using IGarro.Addresses.Domain;
using IGarro.Addresses.Persistence;
using MassTransit;
using Microsoft.Extensions.Logging;

namespace IGarro.Services.Addresses.Application.Consumers;

public class CreateOrUpdateAddressConsumer : IConsumer<CreateOrUpdateAddress>
{
    private readonly IAddressesRepository addressesRepository;
    private readonly ILogger<CreateOrUpdateAddressConsumer> logger;

    public CreateOrUpdateAddressConsumer(
        IAddressesRepository addressesRepository,
        ILogger<CreateOrUpdateAddressConsumer> logger)
    {
        this.addressesRepository = addressesRepository;
        this.logger = logger;
    }

    public async Task Consume(ConsumeContext<CreateOrUpdateAddress> context)
    {
        var data = context.Message;

        var address = await this.addressesRepository.GetByIdAsync(data.CorrelationId);

        if (address is null)
        {
            this.logger.LogInformation($"Creating a new address with data: {data}");
            address = new Address(data.CorrelationId);
            this.UpdateAddress(data, address);

            await this.addressesRepository.AddAsync(address);
        }
        else
        {
            this.logger.LogInformation($"Updating Address with data: {data}");
            this.UpdateAddress(data, address);
            await this.addressesRepository.UpdateAsync(address);
        }

        await context.Publish(new AddressUpdated()
        {
            CorrelationId = address.CorrelationId,
            City = address.City,
            Street = address.Street,
            Number = address.Number,
            Department = address.Department,
        });

        await context.RespondAsync(new AddressUpdated()
        {
            CorrelationId = address.CorrelationId,
            City = address.City,
            Street = address.Street,
            Number = address.Number,
            Department = address.Department,
        });
    }

    private void UpdateAddress(CreateOrUpdateAddress data, Address address)
    {
        address.SetCity(data.City);
        address.SetStreet(data.Street);
        address.SetNumber(data.Number);
        address.SetDepartment(data.Department);
    }
}