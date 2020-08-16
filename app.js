const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/src/date.js");
const app = express();

const notes = [];
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.listen(3000, function () {
  console.log("Server is up and running");
});

app.get("/", function (request, response) {
  response.render("todo", {
    currDate: date.getDate(),
    notes: notes,
    count: notes.length,
  });
});

app.post("/", function (request, response) {
  const task = request.body.task;
  notes.push(task);
  response.redirect("/");
});
