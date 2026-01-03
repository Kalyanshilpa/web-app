import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectToMongoDB from "./db/db.js";
import authRouter from "./routes/auth.js";
import noteRouter from "./routes/note.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173", // ✅ FRONTEND (Vite)
    credentials: true,
  })
);

app.use("/api/auth", authRouter);
app.use("/api/note", noteRouter);

const PORT = process.env.PORT || 5000;

connectToMongoDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
