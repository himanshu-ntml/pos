import { Router, type Request, type Response } from "express";
import * as PaymentModel from "../models/payment";
import { newPaymentSchema } from "../schemas";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const validatedData = newPaymentSchema.parse(req.body);
    const payment = await PaymentModel.create(validatedData);
    res.json(payment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error making a payment" });
  }
});

export default router;
