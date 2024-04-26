import { Router, type Request, type Response } from "express";
import Model from "../models/user";

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
  try {
    const data = await Model.create(req.body);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const data = await Model.deleteOne(Number(req.params.id));
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
