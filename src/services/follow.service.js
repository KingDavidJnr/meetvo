const db = require("../../models");
const User = db.User;
const Follow = db.Follow;

class FollowService {
  // Create a new follow relationship where a user (follower_id) follows another user (following_id)
  async followUser(follower_id, following_id) {
    return await Follow.create({ follower_id, following_id });
  }

  // Remove an existing follow relationship (unfollow)
  async unfollowUser(follower_id, following_id) {
    return await Follow.destroy({
      where: { follower_id, following_id },
    });
  }

  // Get a list of users that the specified user is following
  async getFollowingList(user_id) {
    return await Follow.findAll({
      where: { follower_id: user_id },
      include: [
        {
          model: User,
          as: "following", // Include user details of the "following" users
          attributes: [
            "user_id",
            "username",
            "first_name",
            "last_name",
            "role",
          ],
        },
      ],
    });
  }

  // Get a list of users who are following the specified user
  async getFollowerList(user_id) {
    return await Follow.findAll({
      where: { following_id: user_id },
      include: [
        {
          model: User,
          as: "follower", // Include user details of the "follower" users
          attributes: [
            "user_id",
            "username",
            "first_name",
            "last_name",
            "role",
          ],
        },
      ],
    });
  }

  // Check if a specific follow relationship exists between two users
  async isFollowing(follower_id, following_id) {
    return await Follow.findOne({ where: { follower_id, following_id } });
  }
}

module.exports = new FollowService();
