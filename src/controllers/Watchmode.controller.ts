import { Request, Response, Router } from "express";
import WatchmodeService from "../services/Watchmode.service";
import { StatusCodes } from "http-status-codes";

const WatchmodeController = Router();

WatchmodeController.get("/", async (req: Request, res: Response) => {
  const { type, name } = req.query;

  if (!WatchmodeService.isTypeValid(type)) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error:
        "Required query parameter 'type' must be either 'movie' or 'person'",
    });
  }

  if (!WatchmodeService.isNameValid(name)) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error:
        "Required query parameter 'name' must be at least 3 and at most 20 characters",
    });
  }

  const response = await WatchmodeService.search(type, name);

  if (!response) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: `No ${
        type === "movie" ? "movie" : "person"
      } found with name ${name}`,
    });
  }

  return res.send(response);
});

export default WatchmodeController;
