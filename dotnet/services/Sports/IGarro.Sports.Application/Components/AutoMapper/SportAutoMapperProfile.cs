using AutoMapper;
using IGarro.Sports.Application.Contracts;
using IGarro.Sports.Domain;

namespace IGarro.Sports.Application;

public class SportAutoMapperProfile : Profile
{
    public SportAutoMapperProfile()
    {
        this.CreateMap<Sport, SportUpdated>()
            .ForMember(dto => dto.CorrelationId, s => s.MapFrom(entity => entity.CorrelationId))
            .ForMember(dto => dto.DisplayName, s => s.MapFrom(entity => entity.DisplayName));
        
    }
}