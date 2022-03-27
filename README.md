# Tetris RS Clone
## Frontend technologies
- Vanilla TS
- SPA with hash routing
- ESLint
- Webpack
- SCSS (https://www.npmjs.com/package/sass). The SCSS preprocessor was used as a tool for describing styles. Preference was given to this preprocessor for several reasons: clear and simple syntax, advanced CSS capabilities, team members had experience working with this preprocessor.
- SignalR library (https://www.npmjs.com/package/@microsoft/signalr). This library was chosen due to the fact that communication is taking place with a server developed on .NET Core. This library is the most popular for .NET Core applications, thus managed to ensure the greatest compatibility. The advantage of this library is the availability of good documentation, a large number of features provided, ease of configuration and use

## Backend technologies
- .NET Core 5 (https://docs.microsoft.com/ru-ru/dotnet/core/whats-new/dotnet-5). This technology was chosen because the team has extensive experience working with it, which ensured that in a short time it would be possible to create the infrastructure necessary for the implementation of the project.
- SignalR library (https://www.nuget.org/packages/Microsoft.AspNetCore.SignalR.Client.Core/)
- ORM Entity Framework (https://www.nuget.org/packages/Microsoft.EntityFrameworkCore). Entity Framework Core was used as the ORM library. This library allows you to work with the database using the Code First approach, which greatly simplifies the process of working with the database.

## Database
- MS SQL Server (https://www.microsoft.com/ru-ru/sql-server/sql-server-2019). This database was chosen for the same reason as the .NET platform. The team members had experience working with this database.

## Deploy
- Frontend - GitHub Pages (https://kostenkojr.github.io)
- Backend - Azure Cloud (https://tetriscloners.azurewebsites.net)
