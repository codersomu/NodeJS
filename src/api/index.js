const express = require("express");
const router = express.Router();
const Course = require("../services/Course");
const User = require("../services/User");

router.get("/index", (req, res) => {
  // let className  = new Course();
  const result = Course.getAllCourse();
  res.send(result);
});

router.post("/addusers", async (req, res) => {
  var userClass = new User();
  var result = await userClass
    .addUser(req.body)
    .then(result => res.send(result), error => res.status(400).send(error));
});

router.post("/login", async (req, res) => {
  var userClass = new User();
  var result = await userClass
    .checkLogin(req.body)
    .then(result => res.send(result), error => res.status(400).send(error));
});

router.get("/courses", async (req, res) => {
  var courseClass = new Course();
  var result = await courseClass
    .getAllCourse(req.body)
    .then(result => res.send(result), error => res.status(400).send(error));
});

module.exports = router;
