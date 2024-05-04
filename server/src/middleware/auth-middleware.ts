import { NextFunction, Request, Response } from "express";
import ApiError from "../api-error";
import tokenService from "../services/token-service";
import { extractToken } from "../utils";

export default async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authorizationHeader = req.headers["cookie"];

    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError());
    }

    const accesToken = extractToken(authorizationHeader);

    if (!accesToken) {
      return next(ApiError.UnauthorizedError());
    }

    const userData = await tokenService.validateAccessToken(accesToken);
    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }
    req.user = userData;
    next();
  } catch (error) {
    return next(ApiError.UnauthorizedError());
  }
}
