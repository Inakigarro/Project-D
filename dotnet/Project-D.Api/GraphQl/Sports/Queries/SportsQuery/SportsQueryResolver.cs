using Project_D.Api.Services;

namespace Project_D.Api.GraphQl;

public class SportsQueryResolver : ObjectTypeExtension<Query>
{
    protected override void Configure(IObjectTypeDescriptor<Query> descriptor)
    {
        descriptor
            .Field("sports")
            .Type<ListType<SportType>>()
            .Resolve(async context =>
            {
                var sportService = context.RequestServices.GetRequiredService<ISportsService>();
                var sports = await sportService.GetAllAsync();
                return sports;
            })
            .UseFiltering<SportsFilterType>();
    }
}