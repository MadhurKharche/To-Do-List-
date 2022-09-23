const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

let items = ["Buy Food", "Eat Food", "Sleep"];
let workItems = [];
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  let day = date.getDay();
  res.render("list", { ListTitle: day, newListItem: items });
});

app.get("/work", function (req, res) {
  res.render("list", { ListTitle: "Work List", newListItem: workItems });
});

app.post("/work", function (req, res) {
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/");
});

app.post("/", function (req, res) {
  console.log(req.body);
  let item = req.body.newItem;
  if (item.length === 0) console.log("Cannot Add empty Element");

  if (req.body.List === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else items.push(item);

  res.redirect("/");
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server running on Port 3000");
});
