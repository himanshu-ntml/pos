import { NextFunction, Request, Response } from "express";
import ApiError from "./api-error";
import tokenService from "../services/token-service";
import { extractToken } from "../utils";

export default async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const accessToken = req.cookies["session"];

    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }
    const userData = await tokenService.validateAccessToken(accessToken);

    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }
    console.log("ACCEESS TOKEN PAYLOAD: ", { accessToken, userData });

    req.user = userData;

    return next();
  } catch (error) {
    return next(ApiError.UnauthorizedError());
  }
}
