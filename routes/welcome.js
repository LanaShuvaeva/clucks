const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/sign_in", (request, response) => {
  console.log(request.query);

  const fullName = request.query.fullName;
  const message = request.query.message;
  const things = request.query.things;

  console.log(request.cookies.things);

  if (things) {
    response.cookie("things", things.split(/,/));
  }

  response.render(
    "sign_in",
    {
      sample: "My Sample!",
      fullName: fullName,
      message: message
    }
  );
});

const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 7;

router.post("/sign_in", (req, res) => {

  console.log(req.body);

  res.cookie("username", req.body.username, {maxAge: COOKIE_MAX_AGE});
  res.redirect("/clucks");
});

router.post("/sign_out", (req, res) => {
  res.clearCookie("username");
  res.redirect("/clucks");
});

module.exports = router;
