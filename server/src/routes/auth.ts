import { Router, type Request, type Response } from "express";
import { z } from "zod";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { db } from "../db";
import { newUserSchema, userSchema, users } from "../schemas";
import { encrypt } from "../utils";

const router = Router();

router.post("/login", async (req: Request, res: Response) => {
  console.log("LOGIN >>> API", req.body);
  try {
    const schema = z.object({
      email: z.string().email(),
      password: z.string().min(3),
    });
    const validatedValue = schema.parse(req.body);
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, validatedValue.email));

    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(validatedValue.password, user.password);

    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    const expires = new Date(Date.now() + 300 * 60 * 1000);
    const session = await encrypt({
      id: user.id,
      name: user.name,
      role: user.role,
    });
    res.cookie("session", session, { expires, httpOnly: true });
    res.status(200).send({ session });
  } catch (error) {
    console.log("Auth", error);
    res.status(500).send(error);
  }
});

router.post("/logout", (req: Request, res: Response) => {
  res.clearCookie("session");
  res.status(200).send("Logged out");
});

router.post("/register", async (req: Request, res: Response) => {
  try {
    const validatedValue = newUserSchema.parse(req.body);
    const [isExist] = await db.select().from(users).where(eq(users.email, validatedValue.email));
    if (isExist) return res.status(409).send("Email already exists");

    const hashedPassword = await bcrypt.hash(validatedValue.password, 10);
    const [user] = await db
      .insert(users)
      .values({ ...validatedValue, password: hashedPassword })
      .returning({ id: users.id });
    res.status(200).send(user);
  } catch (error) {
    console.log("Auth", error);
    res.status(500).send(error);
  }
});

router.put("/change-password", async (req: Request, res: Response) => {
  try {
    const { id, password } = userSchema.pick({ id: true, password: true }).parse(req.body);
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.update(users).set({ password: hashedPassword }).where(eq(users.id, id));
    res.status(200).send("Password changed");
  } catch (error) {
    console.log("Auth", error);
    res.status(500).send(error);
  }
});

export default router;
