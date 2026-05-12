const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const pool = require("./db");

const app = express();

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routes
const userRoutes = require("./routes/users");
app.use("/api/users", userRoutes);

// Home route
app.get("/", (req, res) => {
  res.json({ message: "REST API is running" });
});

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


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