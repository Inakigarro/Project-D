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
        this.CreateMap<CreateSport, CreateOrUpdateSport>()
            .ForMember(dto => dto.DisplayName, s => s.MapFrom(entity => entity.DisplayName))
            .ForMember(dto => dto.CorrelationId, s => s.Ignore());
        this.CreateMap<UpdateSport, CreateOrUpdateSport>()
            .ForMember(dto => dto.CorrelationId, s => s.MapFrom(entity => entity.CorrelationId))
            .ForMember(dto => dto.DisplayName, s => s.MapFrom(entity => entity.DisplayName));
    }
}