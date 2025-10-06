## Database

This project uses a PostgreSQL database to store and manage data. Below are the details for setting up and connecting to the database.

### Database Configuration
- **Database Type**: PostgreSQL
- **Host**: localhost

## Installation

1- Clone repository
```
git clone <repository_url>
cd <repository_directory>
```

2- Create a `.env` file in the root directory and add the following environment variables:
```
DB_HOST=localhost
DB_PORT=5432
DB_USER=myuser
DB_PASSWORD=mypassword
DB_NAME=mydatabase
```

3- Install dependencies
```
npm install
```

4- Start services using Docker Compose
```
docker compose up -d
```

5- Verify that the services are running
```
docker compose ps
```

6- Verify project is up and running
```
curl http://localhost:3000/health
```


### Run migrations

To set up the database schema, run the following command:
```
docker compose exec api npm run typeorm -- migration:revert

docker compose exec api npm run migration:run

docker compose exec db psql -U myuser -d mydatabase
```

## Architecture decisions: Structure
The project is structured in a modular way, with each module representing a specific feature or functionality. Each module contains its own controllers, services, and models.
Also the project follows the principles of Clean Architecture, with a clear separation of concerns between different layers of the application. Implementting DDD principles.
With 3 main layers:
- Domain Layer: Contains the core business logic and domain entities.
- Application Layer: Contains the application services and use cases.
- Infrastructure Layer: Contains the implementation details for external systems, such as databases and APIs.


- src  
- - modules
    - user
      - application
      - - UseCases[ApplicationServices]
      - domain
      - - Domain entities
      - - Repositories[Interfaces]
      - - Services[DomainServices]
      - - ValueObjects
      - infrastructure
      - - controllers
      - - middlewares
      - - persistence
      - - - repositories[Implementations]
      - - - entities[TypeORM entities]
      - - - mappers
      - - routes
- database


## Documentation
There's the postman collection in the root directory of the project. You can import it into Postman to test the API endpoints.