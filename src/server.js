const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/database");
const models = require("./models");
const routes = require("./routes");

const app = express();

// Express configuration
app.set("port", process.env.PORT || 5001);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Third-Party Middleware

app.use(cors());

// Built-In Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom Middleware

app.use(async (req, res, next) => {
  req.context = { models };
  next();
});

// * Routes * //

app.get("/", (_req, res) => {
  res.status(200).send({ code: 0, msg: "API Running" });
});

app.use("/filter-payload", routes);

app.all("*", function (req, res, next) {
  const error = new Error(`${req.ip} tried to access ${req.originalUrl}`);

  error.statusCode = 301;

  next(error);
});

// Application-Level Middleware //

app.use((error, req, res, next) => {
  if (!error.statusCode) error.statusCode = 500;

  if (error.statusCode === 301) {
    return res.status(301).json({
      msg: "This route was not found",
    });
  }

  return res.status(error.statusCode).json({ error: error.toString() });
});

connectDB();

const port = app.get("port");
const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

module.exports = server;
