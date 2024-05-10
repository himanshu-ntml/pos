"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = exports.error = void 0;
const api_error_1 = __importDefault(require("./api-error"));
function error(err, req, res, next) {
    console.log(err);
    if (err instanceof api_error_1.default) {
        return res
            .status(err.status)
            .json({ message: err.message, errors: err.errors });
    }
    return res.status(500).json({ message: "Unexpercted Error on server" });
}
exports.error = error;
function notFound(req, res, next) {
    res.status(404);
    const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
    next(error);
}
exports.notFound = notFound;
