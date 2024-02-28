import express from "express";
import WatchmodeController from "./controllers/Watchmode.controller";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;

app.use("/watchmode", WatchmodeController);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
