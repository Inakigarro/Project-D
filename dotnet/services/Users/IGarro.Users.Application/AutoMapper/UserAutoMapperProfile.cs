using AutoMapper;
using IGarro.Users.Application.Contracts;
using IGarro.Users.Domain;

namespace IGarro.Users.Application;

public class UserAutoMapperProfile : Profile
{
    public UserAutoMapperProfile()
    {
        this.CreateMap<User, UserUpdated>()
            .ForMember(dto => dto.CorrelationId, s => s.MapFrom(entity => entity.CorrelationId))
            .ForMember(dto => dto.DisplayName, s => s.MapFrom(entity => entity.DisplayName))
            .ForMember(dto => dto.Email, s => s.MapFrom(entity => entity.Email));
    }
}