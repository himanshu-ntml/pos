"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../db");
const token_1 = require("../schemas/token");
const jose_1 = require("jose");
const AUTH_SECRET = process.env.AUTH_SECRET;
const AUTH_REFRESH_SECRET = process.env.AUTH_REFRESH_SECRET;
const authSecretKey = new TextEncoder().encode(AUTH_SECRET);
const authRefreshSecretKey = new TextEncoder().encode(AUTH_REFRESH_SECRET);
class TokenService {
    async generateToken(payload) {
        const accessToken = await new jose_1.SignJWT(payload)
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("8 hours from now")
            .sign(authSecretKey);
        // const refreshToken = await new SignJWT(payload)
        //   .setProtectedHeader({ alg: "HS256" })
        //   .setIssuedAt()
        //   .setExpirationTime("30 days")
        //   .sign(authRefreshSecretKey);
        return accessToken;
    }
    async validateAccessToken(token) {
        try {
            const { payload } = await (0, jose_1.jwtVerify)(token, authSecretKey, {
                algorithms: ["HS256"],
            });
            return payload;
        }
        catch (error) {
            return null;
        }
    }
    async validateRefreshToken(token) {
        const { payload } = await (0, jose_1.jwtVerify)(token, authRefreshSecretKey, {
            algorithms: ["HS256"],
        });
        return payload;
    }
    async saveToken(userId, refreshToken) {
        const [tokenData] = await db_1.db
            .select()
            .from(token_1.tokens)
            .where((0, drizzle_orm_1.eq)(token_1.tokens.userId, userId));
        if (tokenData) {
            tokenData["refreshToken"] = refreshToken;
            return tokenData;
        }
        const token = await db_1.db.insert(token_1.tokens).values({ userId, refreshToken });
        return token;
    }
    async removeToken(refreshToken) {
        return await db_1.db.delete(token_1.tokens).where((0, drizzle_orm_1.eq)(token_1.tokens.refreshToken, refreshToken));
    }
    async findToken(refreshToken) {
        return await db_1.db
            .select()
            .from(token_1.tokens)
            .where((0, drizzle_orm_1.eq)(token_1.tokens.refreshToken, refreshToken));
    }
}
exports.default = new TokenService();
