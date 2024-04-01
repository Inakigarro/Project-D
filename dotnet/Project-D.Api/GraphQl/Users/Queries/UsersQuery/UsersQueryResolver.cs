using IGarro.Users.Application.Contracts;
using Project_D.Api.Services;

namespace Project_D.Api.GraphQl;

public class UsersQueryResolver : ObjectTypeExtension<Query>
{
    protected override void Configure(IObjectTypeDescriptor<Query> descriptor)
    {
        descriptor
            .Field("users")
            .Type<ListType<UserType>>()
            .Resolve(async context =>
            {
                var userService = context.RequestServices.GetRequiredService<IUsersService>();
                var users = await userService.GetAllAsync();
                return users;
            })
            .UseFiltering<UsersFilterType>();
    }
}