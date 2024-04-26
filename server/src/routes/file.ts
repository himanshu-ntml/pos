import { Router, type Request, type Response } from "express";
import multer from "multer";
import { randomUUID } from "crypto";
import path from "path";
import fs from "fs";
import sharp from "sharp";

const router = Router();

const DIR = "./public/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, randomUUID() + "-" + fileName);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

router.post("/", upload.single("file"), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ message: "No file uploaded", success: false });
    }
    console.log("FILE>>> ", req.file);

    const resizedImage = await sharp(req.file.path)
      .resize({ width: 800, height: 600 })
      .toBuffer();

    await sharp(resizedImage).toFile(req.file.path);
    res.status(200).json({
      message: "file uploaded",
      filename: req.file?.filename,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, success: false });
  }
});

router.delete("/:filename", async (req: Request, res: Response) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(DIR, filename);

    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
      res
        .status(200)
        .json({ message: "File deleted successfully", success: true });
    } else {
      res.status(404).json({ message: "File not found", success: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
});

export default router;
