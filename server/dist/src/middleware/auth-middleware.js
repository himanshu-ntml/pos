"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_error_1 = __importDefault(require("./api-error"));
const token_service_1 = __importDefault(require("../services/token-service"));
async function authMiddleware(req, res, next) {
    try {
        const accessToken = req.cookies;
        const session = accessToken["session"];
        if (!session) {
            return next(api_error_1.default.UnauthorizedError());
        }
        const userData = await token_service_1.default.validateAccessToken(session);
        if (!userData) {
            return next(api_error_1.default.UnauthorizedError());
        }
        req.user = userData;
        return next();
    }
    catch (error) {
        return next(api_error_1.default.UnauthorizedError());
    }
}
exports.default = authMiddleware;
