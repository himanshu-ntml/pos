import { Router, type Request, type Response } from "express";
import * as Model from "../models/bill";
import { billSchema, newBillSchema } from "../schemas";

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
router.get("/paid", async (req: Request, res: Response) => {
  try {
    const data = await Model.getAllPaid({ paid: true });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
router.get("/unpaid", async (req: Request, res: Response) => {
  try {
    const data = await Model.getAllPaid({ paid: false });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = await Model.getOneByOrderId(Number(id));
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const validatedData = newBillSchema.parse(req.body);
    const response = await Model.create(validatedData);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Model.deleteOne(Number(id));
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const validatedData = billSchema.parse(req.body);
    const data = await Model.update(validatedData);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post("/generate/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;
    const { tipsAmount } = req.body;

    const data = await Model.generateBill(Number(orderId), Number(tipsAmount));
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.get("/paid/this-week", async (req, res) => {
  try {
    const data = await Model.paidThisWeek();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
router.get("/paid/this-month", async (req, res) => {
  try {
    const data = await Model.paidThisMonth();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

export default router;
