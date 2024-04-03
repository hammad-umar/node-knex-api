import { type Knex } from "knex";

interface IKnexConfig {
  [key: string]: Knex.Config;
}

const knexConfig: IKnexConfig = {
  development: {
    client: "pg",
    connection: {
      host: "127.0.0.1",
      port: 6006,
      user: "postgres",
      database: "postgres",
      password: "password123",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};

export { knexConfig };
