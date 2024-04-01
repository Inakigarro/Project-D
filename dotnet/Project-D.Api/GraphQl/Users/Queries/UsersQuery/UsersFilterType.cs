using HotChocolate.Data.Filters;
using IGarro.Users.Application.Contracts;

namespace Project_D.Api.GraphQl;

public class UsersFilterType : FilterInputType<UserUpdated>
{
    protected override void Configure(IFilterInputTypeDescriptor<UserUpdated> descriptor)
    {
        base.Configure(descriptor);
        descriptor.BindFieldsImplicitly();
    }
}