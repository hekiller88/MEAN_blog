const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const Post = require("./models/post");
mongoose
  .connect(
    "mongodb+srv://max:Bmqo0JMAQzQjejLD@cluster0-ofnda.mongodb.net/node-angular?retryWrites=true"
  )
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(() => {
    console.log("Connection Failed!");
  });
// mongo: Bmqo0JMAQzQjejLD

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: false}))

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Reuqested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: "Post added sucessfully",
      postId: createdPost._id
    });
  });

});

app.put("api/posts/:id", (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne( {_id: req.params.id }, post).then(result => {
    console.log(result);
    res.status(200).json({message: "Update Successful!"});
  })
});

app.get("/api/posts", (req, res, next) => {
  // dummy data for test
  // const posts = [
  //   {
  //     id: 'fafafsd234',
  //     title: 'First server-side post',
  //     content: 'this is comming from the server'
  //   },
  //   {
  //     id: "kaoskd123",
  //     title: 'Seconde server-side post',
  //     content: 'this is comming from the server!'
  //   }
  // ];
  Post.find().then(documents => {
    res.status(200).json({
      message: "Posts fetched sucessfully!",
      posts: documents
    });
  });
});

app.delete("/api/posts/:id", (req, res, next) => {
  //console.log(req.params.id);
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({ message: "Post Deleted!"});
  });
});

module.exports = app;
