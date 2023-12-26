const express = require("express");
const bodyParser = require("body-parser");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

app.use(express.static("scripts"));
app.use("/styles", express.static(__dirname + "/styles"));

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/posts", async (req, res) => {
  const posts = await prisma.post.findMany();
  res.render("posts", { posts });
});

app.get("/api/posts", async (req, res) => {
  const posts = await prisma.post.findMany();
  res.json(posts);
});

app.get("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const post = await prisma.post.findUnique({
    where: { id: parseInt(id) },
  });
  res.json(post);
});

app.post("/posts", async (req, res) => {
  const { title } = req.body;
  const newPost = await prisma.post.create({
    data: {
      title,
    },
  });
  res.redirect("/posts");
});

app.put("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const updatedPost = await prisma.post.update({
    where: { id: parseInt(id) },
    data: {
      title,
      content,
    },
  });
  res.json(updatedPost);
});

app.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const deletedPost = await prisma.post.delete({
    where: { id: parseInt(id) },
  });
  res.json(deletedPost);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
