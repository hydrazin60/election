import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

interface DecodedToken extends JwtPayload {
  userId: string;
  email: string;
  role: string;
}

export const getAuthenticatedStaff = async (): Promise<{
  userId: string;
  email: string;
  role: string;
}> => {
  try {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get("auth_token");
    if (!tokenCookie?.value) {
      throw new Error("You are not logged in");
    }
    const token = tokenCookie.value;
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("Server configuration error: JWT_SECRET not defined");
    }
    const decoded = jwt.verify(token, secret) as DecodedToken;
    if (!decoded.userId || !decoded.email || !decoded.role) {
      throw new Error("Invalid token: missing required fields");
    }
    return {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role,
    };
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError)
      throw new Error("Invalid token");
    if (error instanceof jwt.TokenExpiredError)
      throw new Error("Token has expired");
    const message =
      error instanceof Error ? error.message : "Authentication failed";
    throw new Error(message);
  }
};
