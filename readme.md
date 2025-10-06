## Database

This project uses a PostgreSQL database to store and manage data. Below are the details for setting up and connecting to the database.

### Database Configuration
- **Database Type**: PostgreSQL
- **Host**: localhost

### Run migrations

To set up the database schema, run the following command:
```
docker compose exec api npm run typeorm -- migration:revert

docker compose exec api npm run migration:run

docker compose exec db psql -U myuser -d mydatabase
```