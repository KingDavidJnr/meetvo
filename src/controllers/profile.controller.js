const profileService = require("../services/profile.service");
const { extractUserId } = require("../utils/auth.util");

class ProfileController {
  // 1. Create profile
  async createProfile(req, res) {
    try {
      const user_id = extractUserId(req);
      if (!user_id) return res.status(401).json({ message: "Unauthorized" });

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
      const data = req.body;

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
      const { institution, degree, description, start_year, end_year } =
        req.body;

      const data = {
        institution,
        degree,
        description,
        start_year,
        end_year,
      };

      const record = await profileService.addAcademicHistory(user_id, data);

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
}

module.exports = new ProfileController();
