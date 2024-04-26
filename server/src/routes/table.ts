import { Router, type Request, type Response } from "express";
import Model from "../models/table";
import { TableStatus, insertTableSchema, selectTableSchema } from "../schemas";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const status = req.query.status;
    if (status) {
      const data = await Model.getAllByStatus(status as TableStatus);
      return res.status(200).json(data);
    }
    const data = await Model.getAll();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "Missing id" });
    const data = await Model.getOne(Number(id));
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const data = insertTableSchema.parse(req.body);
    const newTable = await Model.create(data);
    if ("error" in newTable) return res.status(409).json(newTable.error);
    res.status(200).json(newTable);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Missing id" });
    const data = await Model.deleteOne(Number(id));
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.put("/:id", (req, res) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "Missing id" });
    const data = selectTableSchema.parse(req.body);
    const result = Model.update(Number(id), data);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.put("/status/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    console.log("Updating status: ", { id, status });
    function isTableStatus(status: unknown): status is TableStatus {
      return (
        status === "available" || status === "reserved" || status === "closed"
      );
    }
    if (!id) return res.status(400).json({ error: "Missing id" });
    if (!isTableStatus(status)) {
      return res.status(500).json({ error: "Invalid status" });
    }
    const result = Model.updateStatus(Number(id), status);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.put("/clean/:id", (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Missing id" });
    const result = Model.markClean(Number(id));
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

export default router;
