using IGarro.Addresses.Application.Contracts;
using MassTransit;
using MassTransit.Clients;

namespace Project_D.Api.GraphQl;

public class AddressQueryExtension : ObjectTypeExtension<Query>
{
    protected override void Configure(IObjectTypeDescriptor<Query> descriptor)
    {
        
    }
}