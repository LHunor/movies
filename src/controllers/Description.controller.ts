import { Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import DescriptionService from "../services/Description.service";

const DescriptionController = Router();

DescriptionController.get("/", async (req: Request, res: Response) => {
  const { name, release } = req.query;

  if (!req.query.name || typeof req.query.name !== "string") {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Required property name must be a valid movie name" });
  }

  if (!req.query.release || typeof Number(req.query.release) !== "number") {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error:
        "Required property release must be of type number and a valid year",
    });
  }

  const description = await DescriptionService.find(
    name as string,
    Number(release)
  );

  if (!description) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: `Description not found for movie ${name} (${release})`,
    });
  }

  res.status(StatusCodes.OK).json(description);
});

export default DescriptionController;
