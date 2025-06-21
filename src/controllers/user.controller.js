const userService = require("../../src/services/user.service");
const { hashPassword, comparePasswords } = require("../utils/bcrypt");
const generateUserId = require("../utils/generate_user_id.util");
const { generateToken } = require("../utils/jwt.util");

class UserController {
  // Create a new user
  async createUser(req, res) {
    try {
      const { first_name, last_name, email, username, password, role } =
        req.body;

      // Basic input validation
      if (
        !first_name ||
        !last_name ||
        !email ||
        !username ||
        !password ||
        !role
      ) {
        return res.status(400).json({
          message: "All fields are required",
        });
      }

      // Validate username format (letters, numbers, underscores, periods)
      const usernameRegex = /^[a-zA-Z0-9_.]+$/;
      if (!usernameRegex.test(username)) {
        return res.status(400).json({
          message:
            "Username can only contain letters, numbers, underscores, and periods",
        });
      }

      // Check if email already exists
      const emailTaken = await userService.emailExists(email);
      if (emailTaken) {
        return res.status(409).json({
          message: "Email is already in use",
        });
      }

      // Check if username already exists
      const usernameTaken = await userService.usernameExists(
        username.toLowerCase()
      );
      if (usernameTaken) {
        return res.status(409).json({
          message: "Username is already taken",
        });
      }

      // Generate a unique user ID
      let userId;
      let userExists;
      do {
        userId = generateUserId();
        userExists = await userService.getUserById(userId);
      } while (userExists);

      // Hash the password
      const hashedPassword = await hashPassword(password);

      // Create user
      const newUser = await userService.createUser({
        user_id: userId,
        first_name,
        last_name,
        email,
        username: username.toLowerCase(),
        password: hashedPassword,
        role,
      });

      const token = generateToken(newUser.user_id, newUser.role);

      // Set cookie with token
      res.cookie("jwt", token, {
        httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        sameSite: "None",
      });

      // Prepare response
      const userResponse = {
        user_id: newUser.user_id,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        role: newUser.role,
        is_verified: newUser.is_verified,
      };

      return res.status(201).json({
        message: "User created successfully",
        data: userResponse,
      });
    } catch (error) {
      console.error("Error creating user", error);
      return res.status(500).json({ message: "Error creating user profile" });
    }
  }

  // User logs in
  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          message: "Email and password are required",
        });
      }

      const user = await userService.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }

      const isMatch = await comparePasswords(password, user.password);
      if (!isMatch) {
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }

      // Optionally update last_login timestamp
      await userService.updateUser(user.user_id, {
        last_login: new Date(),
      });

      const token = generateToken(user.user_id, user.role);

      res.cookie("jwt", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      // Respond with success message and user info (excluding sensitive info)
      const userData = {
        user_id: user.user_id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        username: user.username,
        role: user.role,
        is_verified: user.is_verified,
        last_active: user.last_activity,
      };

      return res.status(200).json({
        message: "Login successful",
        data: userData,
      });
    } catch (error) {
      console.error("Error logging in", error);
      return res.status(500).json({
        message: "Error logging in",
      });
    }
  }

  async checkEmail(req, res) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({
          message: "Email is required",
        });
      }

      const emailTaken = await userService.emailExists(email.toLowerCase());

      return res.status(emailTaken ? 409 : 200).json({
        message: emailTaken ? "Email is already in use" : "Email is available",
        emailTaken,
      });
    } catch (error) {
      console.error("Error checking email", error);
      return res.status(500).json({
        message: "Error checking email availability",
      });
    }
  }

  // Check if username exists
  async checkUsername(req, res) {
    try {
      const { username } = req.body;

      if (!username) {
        return res.status(400).json({
          message: "Username is required",
        });
      }

      const usernameTaken = await userService.usernameExists(
        username.toLowerCase()
      );

      if (usernameTaken) {
        return res.status(409).json({
          message: "Username already taken",
        });
      }

      return res.status(200).json({
        message: "Username is available",
      });
    } catch (error) {
      console.error("Error checking username", error);
      return res.status(500).json({
        message: "Error checking username availability",
      });
    }
  }

  // Get user by ID
  async getUserById(req, res) {
    try {
      const userId = req.params.id;

      if (!userId) {
        return res.status(400).json({
          message: "User ID is required",
        });
      }

      const user = await userService.getUserById(userId);

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      // Destructure only the fields you want to return
      const { user_id, first_name, last_name, email, username, role } = user;

      return res.status(200).json({
        message: "User fetched successfully",
        data: {
          user_id,
          first_name,
          last_name,
          email,
          username,
          role,
        },
      });
    } catch (error) {
      console.error("Error fetching user by ID", error);
      return res.status(500).json({
        message: "Error fetching user details",
      });
    }
  }

  // Get user by username
  async getUserByUsername(req, res) {
    try {
      const { username } = req.params;

      if (!username) {
        return res.status(400).json({
          message: "Username is required",
        });
      }

      const user = await userService.getUserByUsername(username.toLowerCase());

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const {
        user_id,
        first_name,
        last_name,
        email,
        username: uname,
        role,
      } = user;

      return res.status(200).json({
        message: "User fetched successfully",
        data: {
          user_id,
          first_name,
          last_name,
          email,
          username: uname,
          role,
        },
      });
    } catch (error) {
      console.error("Error fetching user by username", error);
      return res.status(500).json({
        message: "Error fetching user details",
      });
    }
  }

  async updateUser(req, res) {
    try {
      const user_id = req.params.id;

      if (!user_id) {
        return res.status(400).json({
          message: "User ID is required",
        });
      }

      const allowedFields = ["first_name", "last_name", "email", "username"];
      const updates = {};

      // Only keep allowed fields
      for (const field of allowedFields) {
        if (req.body[field]) {
          updates[field] = req.body[field];
        }
      }

      // Normalize email and username
      if (updates.username) {
        updates.username = updates.username.toLowerCase();
      }
      if (updates.email) {
        updates.email = updates.email.toLowerCase();
      }

      // Username uniqueness check
      if (updates.username) {
        const existingUser = await userService.usernameExists(updates.username);
        if (existingUser && existingUser.user_id !== user_id) {
          return res.status(409).json({
            message: "Username is already taken",
          });
        }
      }

      // Confirm user exists
      const user = await userService.getUserById(user_id);
      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      // Apply update
      const updatedUser = await userService.updateUser(user_id, updates);

      const {
        user_id: id,
        first_name,
        last_name,
        email,
        username,
        role,
      } = updatedUser;

      return res.status(200).json({
        message: "User updated successfully",
        data: {
          user_id: id,
          first_name,
          last_name,
          email,
          username,
          role,
        },
      });
    } catch (error) {
      console.error("Error updating user", error);
      return res.status(500).json({
        message: "Error updating user profile",
      });
    }
  }

  // Delete user
  async deleteUser(req, res) {
    try {
      const user_id = req.params.id;

      if (!user_id) {
        return res.status(400).json({
          message: "User ID is required",
        });
      }

      // Check if the user exists
      const user = await userService.getUserById(user_id);
      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      // Proceed to delete the user
      await userService.deleteUser(user_id);

      return res.status(200).json({
        message: "User deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting user", error);
      return res.status(500).json({
        message: "Error deleting user",
      });
    }
  }
}

module.exports = new UserController();
