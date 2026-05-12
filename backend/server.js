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

app.use(
  morgan("dev")
);

app.use(express.json());

// ======================
// API Routes
// ======================

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "REST API is running",
  });
});

// Users routes
app.use("/api/users", userRoutes);

// Test database route
app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT NOW()"
    );

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
// 404 Route Handler
// ======================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ======================
// Global Error Handler
// ======================

app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

// ======================
// Server
// ======================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});

// Serve static frontend
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// React fallback route
app.use((req, res) => {
  res.sendFile(
    path.join(__dirname, "../frontend/dist/index.html")
  );
});