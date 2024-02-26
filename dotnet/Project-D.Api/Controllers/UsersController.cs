using IGarro.Users.Application.Contracts;
using MassTransit;
using Microsoft.AspNetCore.Mvc;

namespace Project_D.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class UsersController
{
    private readonly ILogger<UsersController> logger;
    private readonly IRequestClient<CreateOrUpdateUser> requestClient;

    public UsersController(
        ILogger<UsersController> logger,
        IRequestClient<CreateOrUpdateUser> requestClient)
    {
        this.logger = logger;
        this.requestClient = requestClient;
    }

    [HttpPost("CreateOrUpdateUser")]
    public async Task<UserUpdated> CreateOrUpdateUser(CreateOrUpdateUser user)
    {
        var result = await this.requestClient.GetResponse<UserUpdated>(user);
        return result.Message;
    }
}