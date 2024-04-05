using IGarro.Sports.Application.Contracts;

namespace Project_D.Api.GraphQl;

public class CreateSportInput : InputObjectType<CreateSport>
{
    protected override void Configure(IInputObjectTypeDescriptor<CreateSport> descriptor)
    {
        descriptor
            .Name("CreateSportInput");

        descriptor
            .Field(i => i.DisplayName)
            .Type<StringType>()
            .Name("displayName");
    }
}