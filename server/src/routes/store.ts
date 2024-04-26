import { type Request, type Response, Router } from "express";
import { db } from "../db";
import { storeCustomSchedule, storeRegularSchedule, StoreSettings, storeSettings } from "../schemas";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/settings", async (req: Request, res: Response) => {
  try {
    const stmt: StoreSettings[] = await db.select().from(storeSettings).where(eq(storeSettings.profileName, "default"));
    return res.status(200).json(stmt[0] ? stmt[0] : null);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get("/wt", async (req: Request, res: Response) => {
  try {
    const stmt = await db.select().from(storeRegularSchedule);
    return res.status(200).json(stmt);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get("/cwt", async (req: Request, res: Response) => {
  try {
    const stmt = await db.select().from(storeCustomSchedule);
    return res.status(200).json(stmt);
  } catch (e) {
    res.status(500).json(e);
  }
});

export default router;
