using IGarro.Addresses.Application.Contracts;
using MassTransit;
using Microsoft.AspNetCore.Mvc;

namespace Project_D.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class AddressesController
{
    private readonly ILogger<AddressesController> logger;
    private readonly IRequestClient<CreateOrUpdateAddress> requestClient;
    public AddressesController(
        ILogger<AddressesController> logger,
        IRequestClient<CreateOrUpdateAddress> requestClient)
    {
        this.logger = logger;
        this.requestClient = requestClient;
    }

    [HttpPost("CreateOrUpdateAddress")]
    public async Task<AddressUpdated> CreateOrUpdateAddress(CreateOrUpdateAddress address)
    {
        var result = await this.requestClient.GetResponse<AddressUpdated>(address);
        return result.Message;
    }
}