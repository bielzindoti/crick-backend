require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const ridesRoutes = require("./routes/rides");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/rides", ridesRoutes);

app.get("/", (req, res) => {
  res.send("Backend UmCrick rodando");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Servidor rodando na porta ${PORT}`);
});
