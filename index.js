const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

// ROUTES

const welcome = require("./routes/welcome");
const clucks = require("./routes/clucks");

const app = express();
app.set("view engine", "ejs");

// MIDDLEWARE

// Http Request Logger
app.use(morgan("dev"));

// Static Assets
console.log("__dirname:", __dirname);
app.use(express.static(path.join(__dirname, "public")));

// Cookie Parser
app.use(cookieParser());

// Body Parser
app.use(bodyParser.urlencoded({extended: true}));

// Custom Middleware
app.use((req, res, next) => {
  const username = req.cookies.username;
  console.log(req.cookies);
  res.locals.username = null;
  if (username) {
    res.locals.username = username;
  }
  next();
});

app.use("/", welcome);
app.use("/clucks", clucks);



const DOMAIN = 'localhost';
const PORT = '3002';

app.listen(PORT, DOMAIN, () => {
  console.log(`💻 Server listenning on http://${DOMAIN}:${PORT}`);
});
