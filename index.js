import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import pool from "./src/config/db.js";
import router from "./src/routes/routes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    // origin: "http://localhost:5173",
    origin: "https://military-asset-management-system-slsi.onrender.com",
    credentials: true,
  })
);

app.use(express.json());
app.use(morgan("dev"));

app.get("/test-api", (req, res) => {
  res.status(200).json({ message: "API Working Fine" });
});

app.use("/", router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);
