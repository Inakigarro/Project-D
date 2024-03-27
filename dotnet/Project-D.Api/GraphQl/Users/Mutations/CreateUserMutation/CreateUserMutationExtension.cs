namespace Project_D.Api.GraphQl;

public class CreateUserMutationExtension : ObjectTypeExtension<Mutation>
{
    protected override void Configure(IObjectTypeDescriptor<Mutation> descriptor)
    {
        descriptor
            .Field("addUser")
            .ResolveWith<CreateUserMutationResolver>(m => m.AddUser(default))
            .Argument("createUser", f => f.Type<CreateUserInput>())
            .Type<UserType>();
    }
}