"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_1 = __importDefault(require("../models/category"));
const schemas_1 = require("../schemas");
const router = (0, express_1.Router)();
router.get("/", async (req, res) => {
    try {
        const data = await category_1.default.getAll();
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
        const data = await category_1.default.getOne(Number(id));
        res.status(200).json(data);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
router.post("/", async (req, res) => {
    try {
        const data = schemas_1.newCategoriesSchema.parse(req.body);
        const response = await category_1.default.create(data);
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
        const data = await category_1.default.deleteOne(Number(id));
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
        const data = await category_1.default.update(Number(id), body);
        res.status(200).json(data);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
exports.default = router;
