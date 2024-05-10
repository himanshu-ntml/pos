"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../db");
const schemas_1 = require("../schemas");
const drizzle_orm_1 = require("drizzle-orm");
const router = (0, express_1.Router)();
router.get("/settings", async (req, res) => {
    try {
        const stmt = await db_1.db.select().from(schemas_1.storeSettings).where((0, drizzle_orm_1.eq)(schemas_1.storeSettings.profileName, "default"));
        return res.status(200).json(stmt[0] ? stmt[0] : null);
    }
    catch (e) {
        res.status(500).json(e);
    }
});
router.get("/wt", async (req, res) => {
    try {
        const stmt = await db_1.db.select().from(schemas_1.storeRegularSchedule);
        return res.status(200).json(stmt);
    }
    catch (e) {
        res.status(500).json(e);
    }
});
router.get("/cwt", async (req, res) => {
    try {
        const stmt = await db_1.db.select().from(schemas_1.storeCustomSchedule);
        return res.status(200).json(stmt);
    }
    catch (e) {
        res.status(500).json(e);
    }
});
exports.default = router;
