const express = require("express");
const router = express.Router();
const FollowController = require("../controllers/follow.controller");

// route to follow a user
router.post("/follow/new", FollowController.followUser);

// route to unfollow user
router.post("/follow/unfollow", FollowController.unfollowUser);

// route to fetch follower list
router.get("/follow/followers", FollowController.getFollowers);

// route to fetch following list
router.get("/follow/following", FollowController.getFollowing);

module.exports = router;
