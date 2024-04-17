FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["Project-D.Api/Project-D.Api.csproj", "Project-D.Api/"]
COPY ["services/Sports/IGarro.Sports.Application.Contracts/IGarro.Sports.Application.Contracts.csproj", "services/Sports/IGarro.Sports.Application.Contracts/"]
COPY ["services/Users/IGarro.Users.Application.Contracts/IGarro.Users.Application.Contracts.csproj", "services/Users/IGarro.Users.Application.Contracts/"]
RUN dotnet restore "Project-D.Api/Project-D.Api.csproj"
COPY . .
WORKDIR "/src/Project-D.Api"
RUN dotnet build "Project-D.Api.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "Project-D.Api.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Project-D.Api.dll"]
