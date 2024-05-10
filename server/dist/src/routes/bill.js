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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Model = __importStar(require("../models/bill"));
const schemas_1 = require("../schemas");
const router = (0, express_1.Router)();
router.get("/", async (req, res) => {
    try {
        const data = await Model.getAll();
        res.status(200).json(data);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
router.get("/paid", async (req, res) => {
    try {
        const data = await Model.getAllPaid({ paid: true });
        res.status(200).json(data);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
router.get("/unpaid", async (req, res) => {
    try {
        const data = await Model.getAllPaid({ paid: false });
        res.status(200).json(data);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.getOneByOrderId(Number(id));
        res.status(200).json(data);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
router.post("/", async (req, res) => {
    try {
        const validatedData = schemas_1.newBillSchema.parse(req.body);
        const response = await Model.create(validatedData);
        res.status(200).json(response);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Model.deleteOne(Number(id));
        res.status(200).json(data);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
router.put("/:id", async (req, res) => {
    try {
        const validatedData = schemas_1.billSchema.parse(req.body);
        const data = await Model.update(validatedData);
        res.status(200).json(data);
    }
    catch (error) {
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});
router.get("/paid/this-week", async (req, res) => {
    try {
        const data = await Model.paidThisWeek();
        res.status(200).json(data);
    }
    catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});
router.get("/paid/this-month", async (req, res) => {
    try {
        const data = await Model.paidThisMonth();
        res.status(200).json(data);
    }
    catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});
exports.default = router;
