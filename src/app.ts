import express from "express";
import WatchmodeController from "./controllers/Watchmode.controller";
import dotenv from "dotenv";
import OpenaiController from "./controllers/Openai.controller";
import OpenaiService from "./services/Openai.service";

dotenv.config();
OpenaiService.init();

const app = express();
const port = 3000;

app.use(express.json());

app.use("/watchmode", WatchmodeController);
app.use("/openai", OpenaiController);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
