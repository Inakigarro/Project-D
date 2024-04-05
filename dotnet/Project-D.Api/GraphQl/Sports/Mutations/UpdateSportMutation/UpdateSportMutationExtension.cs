namespace Project_D.Api.GraphQl;

public class UpdateSportMutationExtension : ObjectTypeExtension<Mutation>
{
    protected override void Configure(IObjectTypeDescriptor<Mutation> descriptor)
    {
        descriptor
            .Field("updateSport")
            .ResolveWith<UpdateSportMutationResolver>(m => m.UpdateSport(default))
            .Argument("updateSport", f => f.Type<UpdateSportInput>())
            .Type<SportType>();
    }
}