import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

// Middleware to verify JWT token
export const verifyToken = async (req: NextRequest) => {
  const authHeader = req.headers.get("Authorization");

  if (!authHeader) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // Extract token from Bearer <token>
  const token = authHeader.split(" ")[1];

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch  {
    return NextResponse.json({ message: "Invalid Token" }, { status: 403 });
  }
};
