const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require("uuid");
var methodOverride = require("method-override");
const port = 8080;

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

//Demo Database
let posts = [
  {
    id: uuidv4(),
    username: "NayeemAhmed",
    content: "I am learning Restful APIs",
  },
  {
    id: uuidv4(),
    username: "FahadH",
    content: "Hard work is important to achieve success",
  },
  {
    id: uuidv4(),
    username: "Lufashok",
    content: "I Love Coding",
  },
];

app.listen(port, () => {
  console.log(`App is listening to port ${port}`);
});

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let id = uuidv4();
  posts.push({ id, username, content });
  res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("show.ejs", { post });
});

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let content = req.body.content;
  let post = posts.find((p) => id === p.id);
  post.content = content;
  res.redirect("/posts");
});

app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.filter((p) => id !== p.id);
  posts = post;
  res.redirect("/posts");
});
