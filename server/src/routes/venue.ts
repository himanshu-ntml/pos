import { Router, type Request, type Response } from "express";
import * as Model from "../models/venue";
import { newVenueSettingsSchema } from "../schemas";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const bills = await Model.getSettings();
    res.status(200).json(bills);
  } catch (error) {
    res.status(500).json({ error: "Error fetching bills" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const validatedData = newVenueSettingsSchema.parse(req.body);
    const response = await Model.createSettings(validatedData);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.put("/", async (req: Request, res: Response) => {
  try {
    const validatedData = newVenueSettingsSchema.parse(req.body);
    const response = await Model.updateSettings(validatedData);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
