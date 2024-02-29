import { Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import DescriptionService from "../services/Description.service";
import OpenaiService from "../services/Openai.service";

const OpenaiController = Router();

OpenaiController.post("/description", async (req: Request, res: Response) => {
  const { name, year } = req.body;

  if (!name || typeof name !== "string") {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Required property name must be a valid movie name" });
  }

  if (!year || typeof year !== "number") {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "Required property year must be of type number and a valid year",
    });
  }

  const savedDescription = await DescriptionService.find(name, year);

  if (savedDescription) {
    return res.status(StatusCodes.OK).json(savedDescription);
  }

  const description = await OpenaiService.generateDescription({
    name,
    year,
  });

  const newDescription = await DescriptionService.save({
    name,
    release: year,
    value: description,
  });
  return res.status(StatusCodes.CREATED).json(newDescription);
});

export default OpenaiController;
