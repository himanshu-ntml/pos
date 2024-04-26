import { eq } from "drizzle-orm";
import { db } from "../db";
import { tokens } from "../schemas/token";
import { SignJWT, jwtVerify } from "jose";

const AUTH_SECRET = process.env.AUTH_SECRET;
const AUTH_REFRESH_SECRET = process.env.AUTH_REFRESH_SECRET;
const authSecretKey = new TextEncoder().encode(AUTH_SECRET);
const authRefreshSecretKey = new TextEncoder().encode(AUTH_REFRESH_SECRET);

class TokenService {
  async generateToken(payload: any) {
    const accessToken = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("10 sec from now")
      .sign(authSecretKey);

    const refreshToken = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("30 days")
      .sign(authRefreshSecretKey);
    return { accessToken, refreshToken };
  }

  async validateAccessToken(token: string) {
    try {
      const { payload } = await jwtVerify(token, authSecretKey, {
        algorithms: ["HS256"],
      });
      return payload;
    } catch (error) {
      return null;
    }
  }
  async validateRefreshToken(token: string) {
    const { payload } = await jwtVerify(token, authRefreshSecretKey, {
      algorithms: ["HS256"],
    });
    return payload;
  }

  async saveToken(userId: number, refreshToken: string) {
    const [tokenData] = await db.select().from(tokens).where(eq(tokens.userId, userId));
    if (tokenData) {
      tokenData["refreshToken"] = refreshToken;
      return tokenData;
    }
    const token = await db.insert(tokens).values({ userId, refreshToken });
    return token;
  }
  async removeToken(refreshToken: string) {
    return await db.delete(tokens).where(eq(tokens.refreshToken, refreshToken));
  }
  async findToken(refreshToken: string) {
    return await db.select().from(tokens).where(eq(tokens.refreshToken, refreshToken));
  }
}

export default new TokenService();
