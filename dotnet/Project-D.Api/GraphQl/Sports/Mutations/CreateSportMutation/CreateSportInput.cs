using IGarro.Sports.Application.Contracts;

namespace Project_D.Api.GraphQl;

public class CreateSportInput : InputObjectType<CreateOrUpdateSport>
{
    protected override void Configure(IInputObjectTypeDescriptor<CreateOrUpdateSport> descriptor)
    {
        descriptor
            .Name("CreateSportInput");

        descriptor
            .Field(i => i.DisplayName)
            .Type<StringType>()
            .Name("displayName");
    }
}