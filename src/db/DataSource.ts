import { DataSource } from "typeorm";
import * as path from "path";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: `${path.resolve(__dirname, "..", "..")}/data/sqlite`,
  entities: ["src/entities/*.ts"],
  synchronize: true,
});
