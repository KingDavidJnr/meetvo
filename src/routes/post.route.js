const express = require("express");
const router = express.Router();
const PostController = require("../controllers/post.controller");

// route to make new post
router.post("/posts/new", PostController.create);

// route to get all posts
router.get("/posts", PostController.getAll);

// route to fetch single post
router.get("/posts/:post_id", PostController.getOne);

// route to get all posts by a specific user
router.get("/posts/user/all", PostController.getUserPosts);

// route to update post
router.patch("/posts/:post_id/update", PostController.update);

// route to delete post
router.delete("/posts/:post_id/delete", PostController.delete);

// route to fetch posts for newsfeed
router.get("/posts/news/feed", PostController.getNewsFeed);

module.exports = router;
