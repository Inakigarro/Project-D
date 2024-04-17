FROM mcr.microsoft.com/dotnet/runtime:8.0 AS base
USER $APP_UID
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["services/Users/IGarro.Users.Application/IGarro.Users.Application.csproj", "services/Users/IGarro.Users.Application/"]
COPY ["services/Users/IGarro.Users.Application.Contracts/IGarro.Users.Application.Contracts.csproj", "services/Users/IGarro.Users.Application.Contracts/"]
COPY ["services/Users/IGarro.Users.Persistence/IGarro.Users.Persistence.csproj", "services/Users/IGarro.Users.Persistence/"]
COPY ["services/Users/IGarro.Users.Domain/IGarro.Users.Domain.csproj", "services/Users/IGarro.Users.Domain/"]
RUN dotnet restore "services/Users/IGarro.Users.Application/IGarro.Users.Application.csproj"
COPY . .
WORKDIR "/src/services/Users/IGarro.Users.Application"
RUN dotnet build "IGarro.Users.Application.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "IGarro.Users.Application.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "IGarro.Users.Application.dll"]
