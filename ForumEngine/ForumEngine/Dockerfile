FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
RUN apt-get update
RUN apt-get install -y apt-utils
RUN apt-get install -y libgdiplus
RUN apt-get install -y libc6-dev 
RUN ln -s /usr/lib/libgdiplus.so/usr/lib/gdiplus.dll
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["ClassifiedEngine.csproj", ""]
RUN dotnet restore "./ClassifiedEngine.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "ClassifiedEngine.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ClassifiedEngine.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ClassifiedEngine.dll"]
