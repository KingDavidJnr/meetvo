const postService = require("../services/post.service");
const { extractUserId } = require("../utils/auth.util");

class PostController {
  // Create post endpoint
  async create(req, res) {
    try {
      const user_id = extractUserId(req);
      const { content } = req.body;
      const post = await postService.createPost(user_id, content);

      return res.status(201).json({ message: "Post created", data: post });
    } catch (error) {
      console.error("Create post error:", error);
      return res.status(500).json({ message: "Failed to create post" });
    }
  }

  // Fetch all posts endpoint
  async getAll(req, res) {
    try {
      const posts = await postService.getAllPosts();
      return res.status(200).json({ message: "Posts fetched", data: posts });
    } catch (error) {
      console.error("Get all posts error:", error);
      return res.status(500).json({ message: "Failed to fetch posts" });
    }
  }

  // Fetch single post by ID endpoint
  async getOne(req, res) {
    try {
      const post_id = req.params.post_id;
      const post = await postService.getPostById(post_id);
      if (!post) return res.status(404).json({ message: "Post not found" });

      return res.status(200).json({ message: "Post fetched", data: post });
    } catch (error) {
      console.error("Get post error:", error);
      return res.status(500).json({ message: "Failed to fetch post" });
    }
  }

  // Fetch all posts by a specific user
  async getUserPosts(req, res) {
    try {
      const user_id = extractUserId(req);
      const posts = await postService.getPostsByUser(user_id);
      return res
        .status(200)
        .json({ message: "User posts fetched", data: posts });
    } catch (error) {
      console.error("Get user posts error:", error);
      return res.status(500).json({ message: "Failed to fetch user posts" });
    }
  }

  // Update a post endpoint
  async update(req, res) {
    try {
      const user_id = extractUserId(req);
      const post_id = req.params.post_id;
      const { content } = req.body;

      const updated = await postService.updatePost(post_id, user_id, content);
      if (!updated)
        return res
          .status(403)
          .json({ message: "Unauthorized or post not found" });

      return res.status(200).json({ message: "Post updated", data: updated });
    } catch (error) {
      console.error("Update post error:", error);
      return res.status(500).json({ message: "Failed to update post" });
    }
  }

  // Delete post endpoint
  async delete(req, res) {
    try {
      const user_id = extractUserId(req);
      const post_id = req.params.post_id;

      const deleted = await postService.deletePost(post_id, user_id);
      if (!deleted)
        return res
          .status(403)
          .json({ message: "Unauthorized or post not found" });

      return res.status(200).json({ message: "Post deleted" });
    } catch (error) {
      console.error("Delete post error:", error);
      return res.status(500).json({ message: "Failed to delete post" });
    }
  }

  // Newfeed controller
  async getNewsFeed(req, res) {
    try {
      const user_id = extractUserId(req);

      const posts = await postService.getNewsFeed(user_id);
      return res.status(200).json({
        message: "Posts fetched successfully",
        data: posts,
      });
    } catch (error) {
      console.error("Error fetching newsfeed", error);
      return res.status(500).json({ message: "Error fetching newsfeed" });
    }
  }
}

module.exports = new PostController();
