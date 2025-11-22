import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import linkRoutes from "./routes/links.js";
import { redirectCode } from "./controllers/linksController.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/healthz", (req, res) => {
  res.json({ ok: true, version: "1.0" });
});
app.get("/:code", redirectCode);
// API
app.use("/api/links", linkRoutes);

// Redirect
app.get("/:code", redirectCode);

export default app;
