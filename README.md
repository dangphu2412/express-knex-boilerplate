# THIS IS TEMPLATE RESTFUL API FOR KNEX WITH ORM OBJECTION

## Setup
### Environment
- Install nodejs
- First create .env file by this command
```bash
cp .env.example ./.env
```
- Config environment variables:
    - Configure sql connection string (DATABASE_URL in env file).
    - In this case: DATABASE_URL=postgres://{user}:{password}@{host}:{port}/{databaseName}
    - Set NODE_ENV in .env file(default is development environment)

## Start project
### With npm:
- To run project on development:
```bash
npm dev
```

- To run project on production:

```bash
npm start
```
### With yarn:
- To run project on development:
```bash
yarn dev
```

- To run project on production:

```bash
yarn start
```
