import { Router, type Request, type Response } from "express";
import * as Model from "../models/item";
import { newItemSchema } from "../schemas";

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

router.get("/stop-items", async (req, res) => {
  try {
    const data = await Model.getStopItems();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
router.put("/add-stop-items/:itemId", async (req, res) => {
  try {
    const itemId = req.params.itemId;
    if (!itemId) return res.status(400).json({ message: "itemId is required" });
    const data = await Model.addItemToStopList(itemId);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
router.put("/remove-stop-items/:itemId", async (req, res) => {
  try {
    const itemId = req.params.itemId;
    if (!itemId) return res.status(400).json({ message: "itemId is required" });
    const data = await Model.removeItemFromStopList(itemId);
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
    const data = newItemSchema.parse(req.body);
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
