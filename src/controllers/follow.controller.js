const followService = require("../services/follow.service");
const db = require("../../models");
const Notification = db.Notification;
const User = db.User;
const { extractUserId } = require("../utils/auth.util");

class FollowController {
  async followUser(req, res) {
    try {
      const user_id = extractUserId(req);
      const follower_id = user_id;
      const { following_id } = req.body;

      if (follower_id === Number(following_id))
        return res.status(400).json({ error: "You cannot follow yourself." });

      const existing = await followService.isFollowing(
        follower_id,
        following_id
      );
      if (existing)
        return res
          .status(409)
          .json({ messaage: "Already following this user" });

      // Fetch follower's username
      const follower = await User.findByPk(follower_id, {
        attributes: ["username"],
      });

      if (follower) {
        // Create the follow notification
        await Notification.create({
          receiver_id: following_id,
          type: "follow",
          entity_id: String(follower_id),
          description: `${follower.username} started following you`,
        });
      }

      const follow = await followService.followUser(follower_id, following_id);
      return res
        .status(201)
        .json({ message: "Now following user", data: follow });
    } catch (error) {
      console.error("Error following user", error);
      return res.status(500).json({ messaage: "Error following user" });
    }
  }

  async unfollowUser(req, res) {
    try {
      const user_id = extractUserId(req);
      const follower_id = user_id;
      const { following_id } = req.body;

      await followService.unfollowUser(follower_id, following_id);
      return res.status(200).json({ message: "Unfollowed successfully" });
    } catch (error) {
      console.error("Error unfollowing user", error);
      return res.status(500).json({ messaage: "Error unfollowing user" });
    }
  }

  async getFollowing(req, res) {
    try {
      const user_id = extractUserId(req);
      const list = await followService.getFollowingList(user_id);
      return res
        .status(200)
        .json({ message: "Following list retrived", data: list });
    } catch (error) {
      console.error("Error fetching following list", error);
      return res
        .status(500)
        .json({ messaage: "Error fetching following list" });
    }
  }

  async getFollowers(req, res) {
    try {
      const user_id = extractUserId(req);
      const list = await followService.getFollowerList(user_id);
      return res
        .status(200)
        .json({ message: "Follower list retrived", data: list });
    } catch (error) {
      console.error("Error fetching follower list", error);
      return res.status(500).json({ messaage: "Error fetching follower list" });
    }
  }
}

module.exports = new FollowController();
