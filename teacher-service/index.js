const express = require("express");
const { Pool } = require("pg");

const app = express();

/**
 * IMPORTANT:
 * Without express.json(), req.body is undefined
 * and POST requests FAIL silently (Empty reply)
 */
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432,
});

// ---------- HEALTH ----------
app.get("/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.send("OK");
  } catch (err) {
    res.status(500).send("DB NOT READY");
  }
});

// ---------- ADD TEACHER ----------
app.post("/teachers", async (req, res) => {
  const { name, subject } = req.body;

  if (!name || !subject) {
    return res.status(400).json({ error: "name and subject required" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO school_schema.teachers (name, subject) VALUES ($1, $2) RETURNING *",
      [name, subject]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error adding teacher:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ---------- LIST TEACHERS ----------
app.get("/teachers", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM school_schema.teachers ORDER BY id DESC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching teachers:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// IMPORTANT: bind to 0.0.0.0 for Docker
app.listen(5002, "0.0.0.0", () => {
  console.log("Teacher service running on port 5002");
});

