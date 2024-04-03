import knex from "knex";
import { knexConfig } from "../knexfile";

declare module "knex/types/tables" {
  interface User {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
  }

  interface Tables {
    users: User;
  }
}

export const db = knex(knexConfig.development);
