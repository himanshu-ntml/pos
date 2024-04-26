import { Router, type Request, type Response } from "express";
import Model from "../models/ingredient";

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

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = await Model.getOne(Number(id));
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  const data = req.body;
  try {
    const response = await Model.create(data);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Model.deleteOne(Number(id));
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const data = await Model.update(Number(id), body);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

export default router;
