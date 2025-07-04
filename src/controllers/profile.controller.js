const profileService = require("../services/profile.service");
const { extractUserId } = require("../utils/auth.util");
const db = require("../../models");
const User = db.User;

class ProfileController {
  // 1. Create profile
  async createProfile(req, res) {
    try {
      const user_id = extractUserId(req);
      if (!user_id) return res.status(401).json({ message: "Unauthorized" });

      const user = await User.findByPk(user_id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (user.role !== "techie") {
        return res
          .status(403)
          .json({ message: "Only techies can create techie profiles!" });
      }

      const profile = await profileService.createProfile(user_id, req.body);

      return res.status(201).json({
        message: "Profile created successfully",
        data: profile,
      });
    } catch (error) {
      console.error("Error creating profile", error);
      return res.status(500).json({ message: "Error creating profile" });
    }
  }

  // 2. Update profile
  async updateProfile(req, res) {
    try {
      const user_id = extractUserId(req);
      const payload = req.body;

      const updatedProfile = await profileService.updateProfile(
        user_id,
        payload
      );

      return res.status(200).json({
        message: "Profile updated successfully",
        data: updatedProfile,
      });
    } catch (error) {
      console.error("Error updating profile", error);
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  // 3. Add skill
  async addSkill(req, res) {
    try {
      const user_id = extractUserId(req);
      const { name } = req.body;

      const { error, skill } = await profileService.addSkill(user_id, name);

      if (error) {
        return res.status(400).json({ message: error });
      }

      return res.status(201).json({
        message: "Skill added successfully",
        data: skill,
      });
    } catch (error) {
      console.error("Error adding skill:", error);
      return res.status(500).json({
        message: "Something went wrong",
      });
    }
  }

  // 4. Delete skill
  async deleteSkill(req, res) {
    try {
      const user_id = extractUserId(req);
      const skill_id = req.params.skill_id;

      await profileService.deleteSkill(user_id, skill_id);

      return res.status(200).json({
        message: "Skill deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting skill:", error);
      return res.status(500).json({
        message: "Something went wrong",
      });
    }
  }

  // 5. Add employment history
  async addEmploymentHistory(req, res) {
    try {
      const user_id = extractUserId(req);
      const { company, position, description, start_date, end_date } = req.body;

      // Parse and validate dates
      const parsedStartDate = new Date(start_date);
      const parsedEndDate = end_date ? new Date(end_date) : null;

      if (isNaN(parsedStartDate.getTime())) {
        return res.status(400).json({
          message: "Invalid start_date format. Use YYYY-MM-DD.",
        });
      }

      if (end_date && isNaN(parsedEndDate.getTime())) {
        return res.status(400).json({
          message: "Invalid end_date format. Use YYYY-MM-DD.",
        });
      }

      const data = {
        company,
        position,
        description,
        start_date: parsedStartDate,
        end_date: parsedEndDate,
      };

      const history = await profileService.addEmploymentHistory(user_id, data);

      return res.status(201).json({
        message: "Employment history added successfully",
        data: history,
      });
    } catch (error) {
      console.error("Error adding employment history:", error);
      return res.status(500).json({
        message: "Something went wrong",
      });
    }
  }

  // 6. Delete employment history
  async deleteEmploymentHistory(req, res) {
    try {
      const user_id = extractUserId(req);
      const id = req.params.work_id;

      await profileService.deleteEmploymentHistory(user_id, id);

      return res.status(200).json({
        message: "Employment history deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting employment history:", error);
      return res.status(500).json({
        message: "Something went wrong",
      });
    }
  }

  // 7. Add academic history
  async addAcademicHistory(req, res) {
    try {
      const user_id = extractUserId(req);
      const data = req.body;

      // Convert year fields properly
      const sanitizedData = {
        ...data,
        start_year: data.start_year ? parseInt(data.start_year, 10) : null,
        end_year: data.end_year ? parseInt(data.end_year, 10) : null,
      };

      const record = await profileService.addAcademicHistory(
        user_id,
        sanitizedData
      );

      return res.status(201).json({
        message: "Academic history added successfully",
        data: record,
      });
    } catch (error) {
      console.error("Error adding academic history:", error);
      return res.status(500).json({
        message: "Something went wrong",
      });
    }
  }

  // 8. Delete academic history
  async deleteAcademicHistory(req, res) {
    try {
      const user_id = extractUserId(req);
      const id = req.params.education_id;

      await profileService.deleteAcademicHistory(user_id, id);

      return res.status(200).json({
        message: "Academic history deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting academic history:", error);
      return res.status(500).json({
        message: "Something went wrong",
      });
    }
  }

  // 9. Add project
  async addProject(req, res) {
    try {
      const user_id = extractUserId(req);
      const { title, description, link } = req.body;

      const data = { title, description, link };

      const project = await profileService.addProject(user_id, data);

      return res.status(201).json({
        message: "Project added successfully",
        data: project,
      });
    } catch (error) {
      console.error("Error adding project:", error);
      return res.status(500).json({
        message: "Something went wrong",
      });
    }
  }

  // 10. Delete project
  async deleteProject(req, res) {
    try {
      const user_id = extractUserId(req);
      const id = req.params.project_id;

      await profileService.deleteProject(user_id, id);

      return res.status(200).json({
        message: "Project deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting project:", error);
      return res.status(500).json({
        message: "Something went wrong",
      });
    }
  }

  // 11. Get public profile by username
  async getProfileByUsername(req, res) {
    try {
      const username = req.params.username;

      const profile = await profileService.getProfileByUsername(username);

      return res.status(200).json({
        message: "Profile fetched successfully",
        data: profile,
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
      return res.status(500).json({
        message: "Something went wrong",
      });
    }
  }

  // create profile for recruiter
  async createRecruiterProfile(req, res) {
    try {
      const user_id = extractUserId(req);

      const user = await User.findByPk(user_id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (user.role !== "recruiter") {
        return res
          .status(403)
          .json({ message: "Only recruiters can create recruiter profiles!" });
      }

      const data = req.body;

      const profile = await profileService.createRecruiterProfile(
        user_id,
        data
      );

      return res.status(201).json({
        message: "Recruiter profile created successfully",
        data: profile,
      });
    } catch (error) {
      console.error("Error creating recruiter profile:", error);
      return res.status(500).json({
        message: "Something went wrong",
      });
    }
  }

  // update recruiter profile
  async updateRecruiterProfile(req, res) {
    try {
      const user_id = extractUserId(req);
      const data = req.body;

      const updatedProfile = await profileService.updateRecruiterProfile(
        user_id,
        data
      );

      return res.status(200).json({
        message: "Recruiter profile updated successfully",
        data: updatedProfile,
      });
    } catch (error) {
      console.error("Error updating recruiter profile:", error);
      return res.status(500).json({
        message: "Something went wrong",
      });
    }
  }

  // fetch recruiter profile by username
  async getRecruiterProfile(req, res) {
    try {
      const username = req.params.username;

      const profile = await profileService.getRecruiterProfileByUsername(
        username
      );

      return res.status(200).json({
        message: "Recruiter profile fetched successfully",
        data: profile,
      });
    } catch (error) {
      console.error("Error fetching recruiter profile:", error);
      return res.status(500).json({
        message: "Error fecthing recruiter profile",
      });
    }
  }
}

module.exports = new ProfileController();
