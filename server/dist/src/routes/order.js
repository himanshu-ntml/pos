"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const OrderModel = __importStar(require("../models/order"));
const BillModel = __importStar(require("../models/bill"));
const order_1 = require("../schemas/order");
const table_1 = __importDefault(require("../models/table"));
const zod_1 = require("zod");
const router = (0, express_1.Router)();
router.get("/", async (req, res) => {
    try {
        const status = req.query.status;
        if (typeof status === "string" && order_1.orderStatus.enumValues.includes(status)) {
            const data = await OrderModel.getOrdersWithItems(status);
            return res.status(200).json(data);
        }
        const data = await OrderModel.getOrdersWithItems();
        return res.status(200).json(data);
    }
    catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});
router.get("/pending", async (req, res) => {
    try {
        const data = await OrderModel.getPending();
        res.status(200).json(data);
    }
    catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});
router.get("/orderItems", async (req, res) => {
    try {
        const data = await OrderModel.getOrderItems();
        res.status(200).json(data);
    }
    catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});
router.get("/recent-orders", async (req, res) => {
    try {
        const data = await OrderModel.getRecentOrders();
        res.status(200).json(data);
    }
    catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});
router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const data = await OrderModel.getOne(Number(id));
        res.status(200).json(data);
    }
    catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});
router.get("/byTableId/:tableId", async (req, res) => {
    try {
        const { tableId } = req.params;
        if (!tableId)
            return res.status(400).json({ message: "ID not found!" });
        const data = await OrderModel.getOneByTableId(Number(tableId));
        res.status(200).json(data);
    }
    catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});
router.post("/", async (req, res) => {
    try {
        const validatedValues = order_1.newOrderWithItemsSchema.parse(req.body);
        const data = await OrderModel.create(validatedValues);
        if ("error" in data) {
            return res.status(400).json(data);
        }
        await BillModel.generateBill(data.orderId, 0);
        if (data && data.tableId) {
            await table_1.default.updateStatus(data.tableId, "occupied");
            return res.status(200).json(data);
        }
        res.status(200).json(data);
    }
    catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});
router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const data = await OrderModel.deleteOne(Number(id));
        res.status(200).json(data);
    }
    catch (error) {
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
    }
    catch (error) {
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});
router.post("/cancel/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const data = await OrderModel.cancelOrder(Number(id));
        res.status(200).json(data);
    }
    catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});
router.post("/serve/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const data = await OrderModel.serve(Number(id));
        res.status(200).json(data);
    }
    catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});
router.post("/complete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const data = await OrderModel.complete(Number(id));
        res.status(200).json(data);
    }
    catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});
router.post("/leave/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const data = await OrderModel.leave(Number(id));
        res.status(200).json(data);
    }
    catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});
router.post("/reinstand/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const data = await OrderModel.reinstand(Number(id));
        res.status(200).json(data);
    }
    catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});
router.get("/recent/:tableId", async (req, res) => {
    try {
        const tableId = req.params.tableId;
        const data = await OrderModel.recentCompletedOrders(Number(tableId));
        res.status(200).json(data);
    }
    catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});
router.post("/addSpecialRequest/:orderId", async (req, res) => {
    try {
        const { orderId } = req.params;
        const validatedValues = zod_1.z.string().max(100).parse(req.body);
        const data = await OrderModel.addSpecailRequest(Number(orderId), validatedValues);
        res.status(200).json(data);
    }
    catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});
router.put("/addMore/:orderId", async (req, res) => {
    try {
        const { orderId } = req.params;
        if (!orderId)
            return res.status(400).json({ message: "ID not found!" });
        const validatedValues = order_1.orderItemsSchema.array().parse(req.body);
        const result = await OrderModel.addMoreItemsToOrder(validatedValues);
        res.status(200).json(result);
    }
    catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});
router.post("/ready", async (req, res) => {
    try {
        console.log("READY : ", req.body);
        const { itemId, orderId } = zod_1.z
            .object({
            itemId: zod_1.z.number(),
            orderId: zod_1.z.number(),
        })
            .parse(req.body);
        if (!orderId || !itemId) {
            return res.status(400).json({ message: "orderId not found!" });
        }
        const data = await OrderModel.ready({ orderId, itemId });
        res.status(200).json(data);
    }
    catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});
exports.default = router;
