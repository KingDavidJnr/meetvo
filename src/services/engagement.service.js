const db = require("../../models");
const Like = db.Like;
const Comment = db.Comment;
const Post = db.Post;

class EngagementService {
  async likePost(user_id, post_id) {
    return await Like.findOrCreate({ where: { user_id, post_id } });
  }

  async unlikePost(user_id, post_id) {
    return await Like.destroy({ where: { user_id, post_id } });
  }

  async commentOnPost(user_id, post_id, content) {
    return await Comment.create({ user_id, post_id, content });
  }

  async editComment(comment_id, user_id, content) {
    return await Comment.update(
      { content, is_edited: true },
      { where: { id: comment_id, user_id } }
    );
  }

  async deleteComment(comment_id, user_id) {
    return await Comment.destroy({ where: { id: comment_id, user_id } });
  }
}

module.exports = new EngagementService();
