const dotenv = require("dotenv");
const { verifyToken } = require("../utils/jwt.util");
const {
  extractUserId,
  extractUserRole,
  extractTokenPayload,
} = require("../utils/auth.util");
const { Op } = require("sequelize");

// Load environment variables
dotenv.config();

// Authorization Class
class AuthMiddleware {
  // Authorize user profile by ID
  async UserProfile(req, res, next) {
    const userId = extractUserId(req);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    const profileId = req.params.userId || req.params.id;

    // Check if the user is trying to access their own profile
    if (String(userId) !== String(profileId)) {
      return res
        .status(403)
        .json({ message: "Forbidden: You do not have access to this profile" });
    }

    // If authorized, proceed to the next middleware
    next();
  }

  async isRecruiter(req, res, next) {
    const role = extractUserRole(req);

    if (role?.status) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    if (role !== "recruiter") {
      return res
        .status(403)
        .json({ message: "Forbidden: Recruiter access only" });
    }

    next(); // Role is recruiter, continue
  }

  async isAuthenticated(req, res, next) {
    const decoded = extractTokenPayload(req);

    // If the token is invalid or expired
    if (decoded?.status === false) {
      return res
        .status(403)
        .json({ message: "Unauthorized: You have to login first" });
    }

    // Allow the request go through
    next();
  }

  // Additional authorization methods here...
}

// Export an instance of the Authorization class
module.exports = new AuthMiddleware();
