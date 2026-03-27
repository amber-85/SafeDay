import express from "express";
import cors form "cors";
import userRoutes from "";
import checkInRoutes from "";

const app=express();

app.use(cors());
app.use(express.json());

app.use("",userRoutes);
app.use("",checkInRoutes);

export default app;