import { NextFunction, Request, Response } from "express";
import ApiError from "./api-error";
import tokenService from "../services/token-service";

export default async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const accessToken = req.cookies;
    const session = accessToken["session"];

    if (!session) {
      return next(ApiError.UnauthorizedError());
    }

    const userData = await tokenService.validateAccessToken(session);

    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }

    req.user = userData;

    return next();
  } catch (error) {
    return next(ApiError.UnauthorizedError());
  }
}
