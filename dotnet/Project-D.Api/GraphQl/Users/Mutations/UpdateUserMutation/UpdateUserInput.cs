using IGarro.Users.Application.Contracts;

namespace Project_D.Api.GraphQl.UpdateUserMutation;

public class UpdateUserInput : InputObjectType<UpdateUser>
{
    protected override void Configure(IInputObjectTypeDescriptor<UpdateUser> descriptor)
    {
        descriptor
            .Name("UpdateUserInput");

        descriptor
            .Field(i => i.CorrelationId)
            .Type<UuidType>()
            .Name("correlationId");
        
        descriptor
            .Field(i => i.DisplayName)
            .Type<StringType>()
            .Name("displayName");
        
        descriptor
            .Field(i => i.Email)
            .Type<StringType>()
            .Name("email");
    }
}