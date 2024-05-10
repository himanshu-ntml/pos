"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const crypto_1 = require("crypto");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const sharp_1 = __importDefault(require("sharp"));
const router = (0, express_1.Router)();
const DIR = "./public/";
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(" ").join("-");
        cb(null, (0, crypto_1.randomUUID)() + "-" + fileName);
    },
});
var upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg") {
            cb(null, true);
        }
        else {
            cb(null, false);
            return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
        }
    },
});
router.post("/", upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res
                .status(400)
                .json({ message: "No file uploaded", success: false });
        }
        console.log("FILE>>> ", req.file);
        const resizedImage = await (0, sharp_1.default)(req.file.path)
            .resize({ width: 800, height: 600 })
            .toBuffer();
        await (0, sharp_1.default)(resizedImage).toFile(req.file.path);
        res.status(200).json({
            message: "file uploaded",
            filename: req.file?.filename,
            success: true,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error, success: false });
    }
});
router.delete("/:filename", async (req, res) => {
    try {
        const filename = req.params.filename;
        const filePath = path_1.default.join(DIR, filename);
        if (fs_1.default.existsSync(filePath)) {
            await fs_1.default.promises.unlink(filePath);
            res
                .status(200)
                .json({ message: "File deleted successfully", success: true });
        }
        else {
            res.status(404).json({ message: "File not found", success: false });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
});
exports.default = router;
