import { NextFunction, Request, Response } from "express";
import ApiError from "../api-error";
import tokenService from "../services/token-service";

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const authorizationHeader = req.headers["authorization"];

    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError());
    }

    const accesToken = authorizationHeader.split(" ")[1];
    if (!accesToken) {
      return next(ApiError.UnauthorizedError());
    }

    const userData = tokenService.validateAccessToken(accesToken);
    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }

    req.user = userData;
    next();
  } catch (error) {
    return next(ApiError.UnauthorizedError());
  }
}
