const pool = require("../db");

// GET all users
const getUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET user by ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM users WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CREATE user
const createUser = async (req, res) => {
  try {
    const { name, email, language, services } = req.body;

    const result = await pool.query(
      `INSERT INTO users(name, email, language, services)
       VALUES($1, $2, $3, $4)
       RETURNING *`,
      [name, email, language, services]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE user (PUT - full update)
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, language, services } = req.body;

    const result = await pool.query(
      `UPDATE users
       SET name=$1, email=$2, language=$3, services=$4
       WHERE id=$5
       RETURNING *`,
      [name, email, language, services, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PATCH user (partial update)
const patchUser = async (req, res) => {
  try {
    const { id } = req.params;
    const fields = req.body;

    const keys = Object.keys(fields);
    const values = Object.values(fields);

    if (keys.length === 0) {
      return res.status(400).json({ message: "No data provided" });
    }

    const setQuery = keys
      .map((key, index) => `${key}=$${index + 1}`)
      .join(", ");

    const result = await pool.query(
      `UPDATE users SET ${setQuery} WHERE id=$${keys.length + 1} RETURNING *`,
      [...values, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM users WHERE id=$1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "User deleted",
      deleted: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// EXPORT ALL
module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  patchUser,
  deleteUser,
};

