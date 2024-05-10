"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const drizzle_orm_1 = require("drizzle-orm");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = require("../db");
const schemas_1 = require("../schemas");
const token_service_1 = __importDefault(require("../services/token-service"));
const router = (0, express_1.Router)();
router.post("/login", async (req, res) => {
    try {
        const schema = zod_1.z.object({
            email: zod_1.z.string().email(),
            password: zod_1.z.string().min(3),
        });
        const validatedValue = schema.parse(req.body);
        const [user] = await db_1.db
            .select()
            .from(schemas_1.users)
            .where((0, drizzle_orm_1.eq)(schemas_1.users.email, validatedValue.email));
        if (!user)
            return res.status(401).json({ message: "Invalid credentials" });
        const match = await bcryptjs_1.default.compare(validatedValue.password, user.password);
        if (!match)
            return res.status(401).json({ message: "Invalid credentials" });
        const session = await token_service_1.default.generateToken({
            id: user.id,
            name: user.name,
            role: user.role,
        });
        res.cookie("session", session, { httpOnly: true });
        res.status(200).send({ session });
    }
    catch (error) {
        console.log("Auth", error);
        res.status(500).send(error);
    }
});
router.post("/logout", (req, res) => {
    res.clearCookie("session");
    res.status(200).send("Logged out");
});
router.post("/register", async (req, res) => {
    try {
        const validatedValue = schemas_1.newUserSchema.parse(req.body);
        const [isExist] = await db_1.db.select().from(schemas_1.users).where((0, drizzle_orm_1.eq)(schemas_1.users.email, validatedValue.email));
        if (isExist)
            return res.status(409).send("Email already exists");
        const hashedPassword = await bcryptjs_1.default.hash(validatedValue.password, 10);
        const [user] = await db_1.db
            .insert(schemas_1.users)
            .values({ ...validatedValue, password: hashedPassword })
            .returning({ id: schemas_1.users.id });
        res.status(200).send(user);
    }
    catch (error) {
        console.log("Auth", error);
        res.status(500).send(error);
    }
});
router.put("/change-password", async (req, res) => {
    try {
        const { id, password } = schemas_1.userSchema.pick({ id: true, password: true }).parse(req.body);
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        await db_1.db.update(schemas_1.users).set({ password: hashedPassword }).where((0, drizzle_orm_1.eq)(schemas_1.users.id, id));
        res.status(200).send("Password changed");
    }
    catch (error) {
        console.log("Auth", error);
        res.status(500).send(error);
    }
});
exports.default = router;
