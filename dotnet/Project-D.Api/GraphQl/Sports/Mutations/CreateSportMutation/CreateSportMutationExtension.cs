namespace Project_D.Api.GraphQl;

public class CreateSportMutationExtension : ObjectTypeExtension<Mutation>
{
    protected override void Configure(IObjectTypeDescriptor<Mutation> descriptor)
    {
        descriptor
            .Field("addSport")
            .ResolveWith<CreateSportMutationResolver>(m => m.AddSport(default))
            .Argument("createSport", f => f.Type<CreateSportInput>())
            .Type<SportType>();
    }
}