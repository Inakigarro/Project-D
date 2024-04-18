FROM mcr.microsoft.com/dotnet/runtime:8.0 AS base
USER $APP_UID
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["services/Sports/IGarro.Sports.Application/IGarro.Sports.Application.csproj", "services/Sports/IGarro.Sports.Application/"]
COPY ["services/Sports/IGarro.Sports.Application.Contracts/IGarro.Sports.Application.Contracts.csproj", "services/Sports/IGarro.Sports.Application.Contracts/"]
COPY ["services/Sports/IGarro.Sports.Persistence/IGarro.Sports.Persistence.csproj", "services/Sports/IGarro.Sports.Persistence/"]
COPY ["services/Sports/IGarro.Sports.Domain/IGarro.Sports.Domain.csproj", "services/Sports/IGarro.Sports.Domain/"]
RUN dotnet restore "services/Sports/IGarro.Sports.Application/IGarro.Sports.Application.csproj"
COPY . .
WORKDIR "/src/services/Sports/IGarro.Sports.Application"
RUN dotnet build "IGarro.Sports.Application.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "IGarro.Sports.Application.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "IGarro.Sports.Application.dll"]
