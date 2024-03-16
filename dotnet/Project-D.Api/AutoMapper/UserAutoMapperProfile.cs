using AutoMapper;
using IGarro.Users.Application.Contracts;
using Project_D.Api.GraphQl;

namespace Project_D.Api.AutoMapper;

public class UserAutoMapperProfile : Profile
{
    public UserAutoMapperProfile()
    {
        this.CreateMap<UserUpdated, UserResponse>()
            .ForMember(dto => dto.CorrelationId, s => s.MapFrom(entity => entity.CorrelationId))
            .ForMember(dto => dto.DisplayName, s => s.MapFrom(entity => entity.DisplayName))
            .ForMember(dto => dto.Email, s => s.MapFrom(entity => entity.Email));
    }
}