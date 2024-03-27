namespace Project_D.Api.GraphQl.UpdateUserMutation;

public class UpdateUserMutationExtension: ObjectTypeExtension<Mutation>
{
    protected override void Configure(IObjectTypeDescriptor<Mutation> descriptor)
    {
        descriptor
            .Field("updateUser")
            .ResolveWith<UpdateUserMutationResolver>(m => m.UpdateUser(default))
            .Argument("updateUser", f => f.Type<UpdateUserInput>())
            .Type<UserType>();
    }
}