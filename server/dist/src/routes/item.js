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
const Model = __importStar(require("../models/item"));
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
router.get("/stop-items", async (req, res) => {
    try {
        const data = await Model.getStopItems();
        res.status(200).json(data);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
router.put("/add-stop-items/:itemId", async (req, res) => {
    try {
        const itemId = req.params.itemId;
        if (!itemId)
            return res.status(400).json({ message: "itemId is required" });
        const data = await Model.addItemToStopList(itemId);
        res.status(200).json(data);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
router.put("/remove-stop-items/:itemId", async (req, res) => {
    try {
        const itemId = req.params.itemId;
        if (!itemId)
            return res.status(400).json({ message: "itemId is required" });
        const data = await Model.removeItemFromStopList(itemId);
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
        const data = await Model.getOne(Number(id));
        res.status(200).json(data);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
router.post("/", async (req, res) => {
    try {
        const data = schemas_1.newItemSchema.parse(req.body);
        const response = await Model.create(data);
        res.status(200).json(response);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
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
        const id = req.params.id;
        const body = req.body;
        const data = await Model.update(Number(id), body);
        res.status(200).json(data);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
exports.default = router;
