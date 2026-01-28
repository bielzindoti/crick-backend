const express = require("express");
const jwt = require("jsonwebtoken");
const pool = require("../db/connection");

const router = express.Router();

/* =========================
   TESTE DE BANCO
========================= */
router.get("/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =========================
   REGISTER
========================= */
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const result = await pool.query(
    "INSERT INTO users (name, email, password) VALUES ($1,$2,$3) RETURNING *",
    [name, email, password]
  );

  res.json(result.rows[0]);
});

/* =========================
   LOGIN
========================= */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await pool.query(
    "SELECT * FROM users WHERE email=$1 AND password=$2",
    [email, password]
  );

  if (user.rows.length === 0) {
    return res.status(401).json({ error: "Credenciais inválidas" });
  }

  const token = jwt.sign(
    { id: user.rows[0].id },
    process.env.JWT_SECRET
  );

  res.json({ token });
});

module.exports = router;
