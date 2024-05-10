"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const table_1 = __importDefault(require("../models/table"));
const schemas_1 = require("../schemas");
const router = (0, express_1.Router)();
router.get("/", async (req, res) => {
    try {
        const status = req.query.status;
        if (status) {
            const data = await table_1.default.getAllByStatus(status);
            return res.status(200).json(data);
        }
        const data = await table_1.default.getAll();
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
        if (!id)
            return res.status(400).json({ error: "Missing id" });
        const data = await table_1.default.getOne(Number(id));
        res.status(200).json(data);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
router.post("/", async (req, res) => {
    try {
        const data = schemas_1.insertTableSchema.parse(req.body);
        const newTable = await table_1.default.create(data);
        if ("error" in newTable)
            return res.status(409).json(newTable.error);
        res.status(200).json(newTable);
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        if (!id)
            return res.status(400).json({ error: "Missing id" });
        const data = await table_1.default.deleteOne(Number(id));
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
router.put("/:id", (req, res) => {
    try {
        const id = req.params.id;
        if (!id)
            return res.status(400).json({ error: "Missing id" });
        const data = schemas_1.selectTableSchema.parse(req.body);
        const result = table_1.default.update(Number(id), data);
        res.status(200).json(result);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
router.put("/status/:id", (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        console.log("Updating status: ", { id, status });
        function isTableStatus(status) {
            return (status === "available" || status === "reserved" || status === "closed");
        }
        if (!id)
            return res.status(400).json({ error: "Missing id" });
        if (!isTableStatus(status)) {
            return res.status(500).json({ error: "Invalid status" });
        }
        const result = table_1.default.updateStatus(Number(id), status);
        res.status(200).json(result);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
router.put("/clean/:id", (req, res) => {
    try {
        const { id } = req.params;
        if (!id)
            return res.status(400).json({ error: "Missing id" });
        const result = table_1.default.markClean(Number(id));
        res.status(200).json(result);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
exports.default = router;
