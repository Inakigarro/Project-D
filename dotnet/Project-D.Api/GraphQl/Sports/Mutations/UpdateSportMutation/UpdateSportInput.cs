using IGarro.Sports.Application.Contracts;

namespace Project_D.Api.GraphQl;

public class UpdateSportInput : InputObjectType<UpdateSport>
{
    protected override void Configure(IInputObjectTypeDescriptor<UpdateSport> descriptor)
    {
        descriptor
            .Name("UpdateSportInput");

        descriptor
            .Field(i => i.CorrelationId)
            .Type<UuidType>()
            .Name("correlationId");
        descriptor
            .Field(i => i.DisplayName)
            .Type<StringType>()
            .Name("displayName");
    }
}