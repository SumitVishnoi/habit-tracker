import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors"
import prisma from "./utils/prisma.js";
import authRouter from "./routes/auth.routes.js";
import habitRouter from "./routes/habits.routes.js";
import checkinRouter from "./routes/checkin.routes.js";


const app = express()

app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.static("public"));

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
app.use("/api/habits", habitRouter)
app.use("/api", checkinRouter)


export default app;