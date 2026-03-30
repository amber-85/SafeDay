import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export const generateToken = (userId: string) => {
    return jwt.sign(
        { userId },
        JWT_SECRET,
        { expiresIn: "30d" } // 🔥 30 days
    );
};

export const verifyToken = (token: string) => {
    return jwt.verify(token, JWT_SECRET);
};