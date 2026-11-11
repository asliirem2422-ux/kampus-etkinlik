import express from "express";
import cors from "cors";
import eventRoutes from "./routes/event-routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Health check endpoint (Adım 4)
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    time: new Date().toISOString(),
    student: "2321032061",
  });
});

// Event routes bağlama
app.use("/events", eventRoutes);

// Eşleşmeyen rotalar (404)
app.use((req, res) => {
  res.status(404).json({ error: { message: "Route not found" } });
});

export default app;