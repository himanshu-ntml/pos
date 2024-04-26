import {Request, Response, Router} from "express";
import * as Model from "../models/reservation";
import { getTimeSlotSchema, newReservationSchema, reservationSchema } from "../schemas/reservation";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const data = await Model.getAll();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
router.post("/get-slots", async (req: Request, res: Response) => {
  try {
    const validatedValues = getTimeSlotSchema.parse(req.body);
    const data = await Model.timeSlots(validatedValues);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
router.get("/not-assigned", async (req: Request, res: Response) => {
  try {
    const data = await Model.notAssigned();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const data = newReservationSchema.parse(req.body);
    const newReservation = await Model.create(data);
    if ("error" in newReservation) return res.status(400).json(newReservation.error);
    res.status(200).json(newReservation);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "Missing id" });
    const data = await Model.getOne(Number(id));
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "Missing id" });
    const data = reservationSchema.parse(req.body);
    const updatedReservation = await Model.update(data);
    res.status(200).json(updatedReservation);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "Missing id" });
    const data = await Model.deleteOne(Number(id));
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});


export default router;