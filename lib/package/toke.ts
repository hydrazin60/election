import jwt from "jsonwebtoken";

export function generateToken(user: {
  _id: string;
  email: string;
  role: string;
}): string {
  return jwt.sign(
    {
      userId: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "1h",
    }
  );
}
