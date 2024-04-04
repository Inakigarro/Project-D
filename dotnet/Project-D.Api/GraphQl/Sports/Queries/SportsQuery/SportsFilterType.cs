using HotChocolate.Data.Filters;
using IGarro.Sports.Application.Contracts;

namespace Project_D.Api.GraphQl;

public class SportsFilterType : FilterInputType<SportUpdated>
{
    protected override void Configure(IFilterInputTypeDescriptor<SportUpdated> descriptor)
    {
        base.Configure(descriptor);
        descriptor.BindFieldsImplicitly();
    }
}