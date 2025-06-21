const db = require("../../models");
const User = db.User;
const { Op } = require("sequelize");

class UserService {
  // Create a new user
  async createUser(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
      throw new Error("Failed to create user: " + error.message);
    }
  }

  // Check if an email is already registered
  async emailExists(email) {
    try {
      const user = await User.findOne({ where: { email } });
      return !!user;
    } catch (error) {
      throw new Error("Failed to check email: " + error.message);
    }
  }

  // Check if a username is already taken
  async usernameExists(username) {
    try {
      const user = await User.findOne({ where: { username } });
      return !!user;
    } catch (error) {
      throw new Error("Failed to check username: " + error.message);
    }
  }

  // Fetch user details by user_id (excluding password)
  async getUserById(user_id) {
    try {
      return await User.findByPk(user_id, {
        attributes: {
          exclude: ["password"],
        },
      });
    } catch (error) {
      throw new Error("Failed to fetch user: " + error.message);
    }
  }

  // Fetch user by email
  async getUserByEmail(email) {
    try {
      const user = await User.findOne({
        where: { email: email.toLowerCase() },
      });
      return user;
    } catch (error) {
      console.error("Error fetching user by email", error);
      return null; // or throw error if you prefer
    }
  }

  // Fetch user details by username (excluding password)
  async getUserByUsername(username) {
    try {
      return await User.findOne({
        where: { username },
        attributes: {
          exclude: ["password"],
        },
      });
    } catch (error) {
      throw new Error("Failed to fetch user by username: " + error.message);
    }
  }

  // Update user details and return updated user
  async updateUser(user_id, data) {
    try {
      await User.update(data, {
        where: { user_id },
      });
      return await this.getUserById(user_id);
    } catch (error) {
      throw new Error("Failed to update user: " + error.message);
    }
  }

  // Delete a user by user_id
  async deleteUser(user_id) {
    try {
      return await User.destroy({
        where: { user_id },
      });
    } catch (error) {
      throw new Error("Failed to delete user: " + error.message);
    }
  }
}

module.exports = new UserService();
