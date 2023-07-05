// Imports
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const dotenv = require("dotenv");
const path = require("path");
require("dotenv").config();
require("ejs");

const app = express();
const port = process.env.PORT || 4660;

const { sequelize } = require("./database");

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.log("Unable to connect to the database:", err);
  });

require("ejs");

// Middlewares
// TODO: Implementar middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

// Routes
app.use("/", require("./routes/reserva.routes"));

// TODO: Si la petición no coincide con ninguna de las rutas declaradas, mostrar error 404
app.use((req, res, next) => {
  res.status(404).send("Error 404");
});

// Starting the server
app.listen(process.env.PORT, () => console.log("Server on port: " + port));