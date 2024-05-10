"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("../models/user"));
const router = (0, express_1.Router)();
router.get("/", async (req, res) => {
    try {
        const data = await user_1.default.getAll();
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
        const data = await user_1.default.getOne(Number(id));
        res.status(200).json(data);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
router.post("/", async (req, res) => {
    try {
        const data = await user_1.default.create(req.body);
        res.status(200).json(data);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
router.delete("/:id", async (req, res) => {
    try {
        const data = await user_1.default.deleteOne(Number(req.params.id));
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
        const data = await user_1.default.update(Number(id), body);
        res.status(200).json(data);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
exports.default = router;
