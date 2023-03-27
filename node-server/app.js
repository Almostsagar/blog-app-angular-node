const { response } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
var cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");

const app = express();
app.use(
  cors({
    origin: "http://localhost:4200",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Origin",
      "x-access-token",
      "XSRF-TOKEN",
    ],
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  })
); // this uses default values
app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type,   Accept, x-client-key, x-client-token, x-client-secret, Authorization"
  );
  next();
});
// Configuring express
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuring database - mongoose is going to be connected to mongodb
mongoose
  .connect("mongodb://localhost:27017/blog-app-db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((response) => {
    console.log("mongodb connected successfully");
  })
  .catch((err) => {
    console.log("db conn failed");
  });

// Configuring flash and session
app.use(
  session({
    secret: "anysecret",
    saveUninitialized: true,
    resave: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// Configring routes
const defaultRoutes = require("./routes/defaultRoutes");
app.use("/", defaultRoutes);

// Listening on port
app.listen(3000, () => {
  console.log(`server is running on p no 3000`);
});
