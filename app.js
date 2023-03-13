const express = require("express");
const app = express();
const mongoose = require("mongoose");
const https = require("https");

mongoose.set({ strictQuery: false });
mongoose.connect("mongodb://localhost:27017/todoListDB", {
  useNewUrlParser: true,
});

const date = require(__dirname + "/date.js"); //making use of module.exports
//if date.js returns 2 or more func's then we use date.func1(), date.func2()

const currentDay = date();
const port = 3000;
//require("dotenv").config();
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

const todoSchema = new mongoose.Schema({
  item: {
    type: String,
    required: [true, "No data entered in item."]
  },
});

const TodoItem = mongoose.model("Todoitem", todoSchema);

app.get("/", function (req, res) {
  TodoItem.find(function (err, todoitems) {
    res.render("list", { kindOfDay: currentDay, listItems: todoitems });
  });
});

app.post("/add", function (req, res) {
  const todoItem = new TodoItem({
    item: req.body.listItem,
  });

  todoItem.save();
  res.redirect("/");
});

app.post("/clearLog", function (req, res) {
  TodoItem.deleteMany({}, function () {
    console.log("list cleared!");
  });
  res.redirect("/");
});

app.post("/delete", function(req, res){
  console.log(req.body.checkbox);
  TodoItem.deleteOne({item: req.body.checkbox}, function(){
    console.log("item deleted.");
  });
  res.redirect("/");
});

app.listen(port, function () {
  console.log("server started on port : " + port);
});
