const express = require("express");
const router = express.Router();
const EngagementController = require("../controllers/engagement.controller");

// route to like a post
router.post("/like/post/:post_id", EngagementController.likePost);

// route to unlike a post
router.delete("/like/post/:post_id", EngagementController.unlikePost);

// route to comment on a post
router.post("/comment/:post_id/add", EngagementController.commentOnPost);

// route to edit comment
router.patch("/comment/:comment_id/edit", EngagementController.editComment);

// route to delete comment
router.delete(
  "/comment/:comment_id/delete",
  EngagementController.deleteComment
);

module.exports = router;
