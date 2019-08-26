const mongoose = require("mongoose");
const courseCollection = require("../schema/courses");

class Course {
  constructor() {
    console.log("Course Class initialised");
  }
  async getAllCourse() {
    const result = await courseCollection.find();
    console.log("Result ", result);
  }
}

module.exports = Course;
