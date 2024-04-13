# Project D.

ProjectD is a web single page application which principal objective is to
facilitate the administration of members, fields, events and resources of a club.

## Technologies.

### Backend.

This project is developed using `C#` and `.Net Core` for the backend services and
APIs. In order to support `microservices`, I'm using `Masstransit` with an 
extension to communicate with `RabbitMQ` broker.

To store all the data, I've chosen `SQL Server` for the database with 
`EntityFrameworkCore` to communicate with the services.

For the API for the client, I'm using the `HotChocolate` package to support
`GraphQL`, creating a unique endpoint to make `queries` and `mutations`.

And finaly, for the authentication and authorization process, I'm using the 
integrated `AspNetCore.Identity` in the `.Net 8` version.

### Frontend.

For the front end I am using `Angular 17` with a variety of tools like `NgRx framework`
to manage the global state of the application as well as isolate side effects to
promote better component architecture.

To comunicate with the server, I'm using `apollo-angular` to support `GraphQL` in
the frontend.