import { Router, type Request, type Response } from "express";
import * as OrderModel from "../models/order";
import * as BillModel from "../models/bill";
import { OrderStatus, newOrderWithItemsSchema, orderItemsSchema, orderStatus } from "../schemas/order";
import TableModel from "../models/table";
import { z } from "zod";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const status = req.query.status;
    if (typeof status === "string" && orderStatus.enumValues.includes(status as OrderStatus[number])) {
      const data = await OrderModel.getOrdersWithItems(status as OrderStatus[number]);
      return res.status(200).json(data);
    }
    const data = await OrderModel.getOrdersWithItems();
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
router.get("/pending", async (req: Request, res: Response) => {
  try {
    const data = await OrderModel.getPending();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
router.get("/orderItems", async (req: Request, res: Response) => {
  try {
    const data = await OrderModel.getOrderItems();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
router.get("/recent-orders", async (req, res) => {
  try {
    const data = await OrderModel.getRecentOrders();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await OrderModel.getOne(Number(id));
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.get("/byTableId/:tableId", async (req: Request, res: Response) => {
  try {
    const { tableId } = req.params;
    if (!tableId) return res.status(400).json({ message: "ID not found!" });
    const data = await OrderModel.getOneByTableId(Number(tableId));
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const validatedValues = newOrderWithItemsSchema.parse(req.body);
    const data = await OrderModel.create(validatedValues);
    if ("error" in data) {
      return res.status(400).json(data);
    }
    await BillModel.generateBill(data.orderId, 0);
    if (data && data.tableId) {
      await TableModel.updateStatus(data.tableId, "occupied");
      return res.status(200).json(data);
    }
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await OrderModel.deleteOne(Number(id));
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const data = await OrderModel.update(Number(id), body);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.post("/pay/:id", async (req, res) => {
  try {
    const id = req.params.id;
    // add logic for payment before changing db
    const data = await OrderModel.pay(Number(id));
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.post("/cancel/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await OrderModel.cancelOrder(Number(id));
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.post("/serve/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await OrderModel.serve(Number(id));
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
router.post("/complete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await OrderModel.complete(Number(id));
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
router.post("/leave/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await OrderModel.leave(Number(id));
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.post("/reinstand/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await OrderModel.reinstand(Number(id));
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
router.get("/recent/:tableId", async (req, res) => {
  try {
    const tableId = req.params.tableId;
    const data = await OrderModel.recentCompletedOrders(Number(tableId));
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
router.post("/addSpecialRequest/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;
    const validatedValues = z.string().max(100).parse(req.body);
    const data = await OrderModel.addSpecailRequest(Number(orderId), validatedValues);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
router.put("/addMore/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;
    if (!orderId) return res.status(400).json({ message: "ID not found!" });
    const validatedValues = orderItemsSchema.array().parse(req.body);
    const result = await OrderModel.addMoreItemsToOrder(validatedValues);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.post("/ready", async (req: Request, res: Response) => {
  try {
    console.log("READY : ", req.body);
    const { itemId, orderId } = z
      .object({
        itemId: z.number(),
        orderId: z.number(),
      })
      .parse(req.body);

    if (!orderId || !itemId) {
      return res.status(400).json({ message: "orderId not found!" });
    }
    const data = await OrderModel.ready({ orderId, itemId });
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});


export default router;