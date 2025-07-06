const db = require("../../models");
const Post = db.Post;
const User = db.User;
const Like = db.Like;
const Comment = db.Comment;
const Follow = db.Follow;
const { Op } = require("sequelize");

class PostService {
  // Create a new post
  async createPost(user_id, content) {
    return await Post.create({ user_id, content });
  }

  // Get all posts with associated user, likes, and comments
  async getAllPosts() {
    return await Post.findAll({
      include: [
        {
          model: User,
          as: "user",
          attributes: [
            "user_id",
            "username",
            "role",
            "first_name",
            "last_name",
          ],
        },
        {
          model: Like,
          as: "likes",
        },
        {
          model: Comment,
          as: "comments",
        },
      ],
      order: [["createdAt", "DESC"]],
    });
  }

  // Get a single post by ID
  async getPostById(post_id) {
    return await Post.findByPk(post_id, {
      include: [
        {
          model: User,
          as: "user",
          attributes: ["user_id", "username", "role"],
        },
        { model: Like, as: "likes" },
        {
          model: Comment,
          as: "comments",
          include: [
            {
              model: User,
              as: "user",
              attributes: ["user_id", "username"],
            },
          ],
        },
      ],
    });
  }

  // Get all posts created by a specific user
  async getPostsByUser(user_id) {
    return await Post.findAll({
      where: { user_id },
      order: [["createdAt", "DESC"]],
    });
  }

  // Update a post's content and mark it as edited
  async updatePost(post_id, user_id, newContent) {
    const post = await Post.findByPk(post_id);
    if (!post || post.user_id !== user_id) return null;

    post.content = newContent;
    post.is_edited = true;
    await post.save();
    return post;
  }

  // Delete a post
  async deletePost(post_id, user_id) {
    const post = await Post.findByPk(post_id);
    if (!post || post.user_id !== user_id) return null;

    await post.destroy();
    return true;
  }

  // Get personalized news feed: user's posts + posts from followed users
  async getNewsFeed(user_id) {
    const followedUsers = await Follow.findAll({
      where: { follower_id: user_id },
      attributes: ["following_id"],
    });

    const followedIds = followedUsers.map((f) => f.following_id);
    followedIds.push(user_id); // Include the user's own posts

    return await Post.findAll({
      where: {
        user_id: {
          [Op.in]: followedIds,
        },
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: [
            "user_id",
            "username",
            "role",
            "first_name",
            "last_name",
          ],
        },
        { model: Like, as: "likes" },
        {
          model: Comment,
          as: "comments",
          include: [
            {
              model: User,
              as: "user",
              attributes: [
                "user_id",
                "username",
                "role",
                "first_name",
                "last_name",
              ],
            },
          ],
        },
      ],
      order: [["created_at", "DESC"]],
    });
  }
}

module.exports = new PostService();
