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
const Model = __importStar(require("../models/reservation"));
const reservation_1 = require("../schemas/reservation");
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
router.post("/get-slots", async (req, res) => {
    try {
        const validatedValues = reservation_1.getTimeSlotSchema.parse(req.body);
        const data = await Model.timeSlots(validatedValues);
        res.status(200).json(data);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
router.get("/not-assigned", async (req, res) => {
    try {
        const data = await Model.notAssigned();
        res.status(200).json(data);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
router.post("/", async (req, res) => {
    try {
        const data = reservation_1.newReservationSchema.parse(req.body);
        const newReservation = await Model.create(data);
        if ("error" in newReservation)
            return res.status(400).json(newReservation.error);
        res.status(200).json(newReservation);
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
        const data = await Model.getOne(Number(id));
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
        if (!id)
            return res.status(400).json({ error: "Missing id" });
        const data = reservation_1.reservationSchema.parse(req.body);
        const updatedReservation = await Model.update(data);
        res.status(200).json(updatedReservation);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        if (!id)
            return res.status(400).json({ error: "Missing id" });
        const data = await Model.deleteOne(Number(id));
        res.status(200).json(data);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
exports.default = router;
