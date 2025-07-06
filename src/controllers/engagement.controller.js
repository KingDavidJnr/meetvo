const engagementService = require("../services/engagement.service");
const { extractUserId } = require("../utils/auth.util");
const db = require("../../models");
const Notification = db.Notification;
const Post = db.Post;
const User = db.User;

class EngagementController {
  // Like a post
  async likePost(req, res) {
    try {
      const user_id = extractUserId(req);
      const post_id = req.params.post_id;

      const [like, created] = await engagementService.likePost(
        user_id,
        post_id
      );
      if (!created) return res.status(409).json({ message: "Already liked" });

      // Send response immediately
      res.status(201).json({ message: "Post liked", data: like });

      // After response: run notification creation asynchronously
      (async () => {
        try {
          const post = await Post.findByPk(post_id);
          if (post && post.user_id !== user_id) {
            const liker = await User.findByPk(user_id, {
              attributes: ["username"],
            });

            if (liker) {
              await Notification.create({
                receiver_id: post.user_id,
                type: "like",
                entity_id: post_id,
                description: `${liker.username} liked your post`,
              });
            }
          }
        } catch (error) {
          console.error("Error creating notification:", error);
        }
      })();
    } catch (error) {
      console.error("Error liking post", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // Unlike a post
  async unlikePost(req, res) {
    try {
      const user_id = extractUserId(req);
      const post_id = req.params.post_id;

      await engagementService.unlikePost(user_id, post_id);
      return res.status(200).json({ message: "Post unliked" });
    } catch (err) {
      console.error("Error unliking post", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // Comment on a post
  async commentOnPost(req, res) {
    try {
      const user_id = extractUserId(req);
      const post_id = req.params.post_id;
      const { content } = req.body;

      const comment = await engagementService.commentOnPost(
        user_id,
        post_id,
        content
      );

      // Send response immediately
      res.status(201).json({ message: "Comment added", data: comment });

      // Async notification creation after response
      (async () => {
        try {
          const post = await Post.findByPk(post_id);
          if (post && post.user_id !== user_id) {
            const commenter = await User.findByPk(user_id, {
              attributes: ["username"],
            });

            if (commenter) {
              await Notification.create({
                receiver_id: post.user_id,
                type: "comment",
                entity_id: comment.id,
                description: `${commenter.username} commented on your post`,
              });
            }
          }
        } catch (error) {
          console.error("Error creating notification:", error);
        }
      })();
    } catch (error) {
      console.error("Error adding comment", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // Edit a comment
  async editComment(req, res) {
    try {
      const user_id = extractUserId(req);
      const comment_id = req.params.comment_id;
      const { content } = req.body;

      await engagementService.editComment(comment_id, user_id, content);
      return res.status(200).json({ message: "Comment updated" });
    } catch (error) {
      console.error("Error editing comment", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // Delete a comment
  async deleteComment(req, res) {
    try {
      const user_id = extractUserId(req);
      const comment_id = req.params.comment_id;

      await engagementService.deleteComment(comment_id, user_id);
      return res.status(200).json({ message: "Comment deleted" });
    } catch (error) {
      console.error("Error deleting comment", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = new EngagementController();
