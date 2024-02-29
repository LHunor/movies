import express from "express";
import WatchmodeController from "./controllers/Watchmode.controller";
import dotenv from "dotenv";
import OpenaiController from "./controllers/Openai.controller";
import OpenaiService from "./services/Openai.service";
import { AppDataSource } from "./db/DataSource";
import "reflect-metadata";
import DescriptionController from "./controllers/Description.controller";

dotenv.config();
OpenaiService.init();

AppDataSource.initialize()
  .then(() => {
    const app = express();
    const port = 3000;

    app.use(express.json());

    app.use("/watchmode", WatchmodeController);
    app.use("/openai", OpenaiController);
    app.use("/descriptions", DescriptionController);

    app.listen(port, () => {
      console.log(`Movie app listening on port ${port}`);
    });
  })
  .catch((error) => console.log(error));
