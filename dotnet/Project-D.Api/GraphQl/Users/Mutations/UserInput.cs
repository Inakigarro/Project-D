using IGarro.Users.Application.Contracts;

namespace Project_D.Api.GraphQl;

public class UserInput : InputObjectType<CreateUser>
{
    protected override void Configure(IInputObjectTypeDescriptor<CreateUser> descriptor)
    {
        descriptor
            .Name("CreateUserInput");
            
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