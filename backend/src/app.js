import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors"
import prisma from "./utils/prisma.js";
import authRouter from "./routes/auth.routes.js";

const app = express()

app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.get("/", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.json({
      success: true,
      message: "Server and database are working",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

app.use("/api/auth", authRouter)


export default app;