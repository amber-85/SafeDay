import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;


export const generateToken = (userId: string, userRole: string) => {
    return jwt.sign(
        { userId, userRole },
        JWT_SECRET,
        { expiresIn: "30d" } // 🔥 30 days
    );
};

export const verifyToken = (token: string) => {
    return jwt.verify(token, JWT_SECRET);
};