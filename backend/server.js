const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
require("dotenv").config();

const pool = require("./db");

// Routes
const userRoutes = require("./routes/users");

const app = express();

// ======================
// Middleware
// ======================
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// ======================
// API ROUTES
// ======================

// Health check
app.get("/", (req, res) => {
  res.json({ message: "REST API is running" });
});

// Users API
app.use("/api/users", userRoutes);

// DB test route
app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      success: true,
      time: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// ======================
// SERVE FRONTEND (ONLY IN PRODUCTION)
// ======================

if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../frontend/dist");

  app.use(express.static(frontendPath));

  // IMPORTANT: Express 5 SAFE fallback (NO "*")
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

// ======================
// ERROR HANDLER
// ======================
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

// ======================
// START SERVER
// ======================
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});