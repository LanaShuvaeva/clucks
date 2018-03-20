const express = require("express");
const knex = require("../db");
const router = express.Router();

router.get("/new", (req, res) => {
  res.render("clucks/new");
});

router.post("/", (req, res) => {
  const content = req.body.content;
  const image_url = req.body.image_url;
  const username = req.cookies.username;
  knex
    .insert({
      content: content,
      image_url: image_url,
      username: username
    })
    .into("clucks")
    .then(() => {
      res.redirect("/clucks")
    });
});

router.get("/", (req, res) => {
  knex
    .select("*")
    .from("clucks")
    .orderBy("createdAt", "DESC")
    .then(
      clucks => {
        res.render("clucks/index", {clucks: clucks});
      }
    )
});

router.get("/:id", (req, res) => {
  const postId = req.params.id;
  if (isNaN(parseInt(postId, 10))) {
    return res.redirect("/clucks");
  }
  knex
    .select("*")
    .from("clucks")
    .where({id: postId})
    .limit(1)
    .then(([cluck]) => {
      res.render("clucks/show", {cluck: cluck});
    })
});



module.exports = router;
