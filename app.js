const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const date = require(__dirname + "/src/date.js");
const app = express();

// Database setup
mongoose.connect("mongodb://localhost:27017/todonotes", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const notesSchema = new mongoose.Schema({
  noteItem: {
    type: String,
    required: true,
  },
});

const Item = mongoose.model("Item", notesSchema);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.listen(3000, function () {
  console.log("Server is up and running");
});

app.get("/", function (request, response) {
  Item.find(function (err, res) {
    if (err) {
      console.log(err);
    } else {
      response.render("todo", {
        currDate: date.getDate(),
        count: res.length,
        notes: res,
      });
    }
  });
});

app.post("/", function (request, response) {
  const t = request.body.task;
  const note = new Item({
    noteItem: t,
  });
  note.save();
  response.redirect("/");
});

app.post("/delete", function (request, response) {
  const checkedId = request.body.checkedTask;
  Item.findByIdAndRemove(checkedId, function (err) {
    if (err) {
      console.log(err);
    }
  });
  response.redirect("/");
});

app.get("/delete", function (request, response) {
  response.redirect("/");
});
