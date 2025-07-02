const db = require("../../models");
const User = db.User;
const Profile = db.Profile;
const Skill = db.Skill;
const EmploymentHistory = db.EmploymentHistory;
const AcademicHistory = db.AcademicHistory;
const Project = db.Project;
const RecruiterProfile = db.RecruiterProfile;
const Post = db.Post;
const { Op } = require("sequelize");

class ProfileService {
  // 1. Create Profile
  async createProfile(user_id, payload) {
    const existing = await Profile.findOne({ where: { user_id } });
    if (existing) throw new Error("Profile already exists");

    const profile = await Profile.create({ user_id, ...payload });
    return profile;
  }

  // 2. Update Profile
  async updateProfile(user_id, payload) {
    const profile = await Profile.findOne({ where: { user_id } });
    if (!profile) throw new Error("Profile not found");

    await profile.update(payload);
    return profile;
  }

  // 3. Add Skill (max 20)
  async addSkill(user_id, name) {
    const count = await Skill.count({ where: { user_id } });
    if (count >= 20) return { error: "Cannot add more than 20 skills" };

    const skill = await Skill.create({ user_id, name });
    return { skill };
  }

  // 4. Delete Skill
  async deleteSkill(user_id, skill_id) {
    await Skill.destroy({ where: { user_id, skill_id } });
  }

  // 5. Add Employment History
  async addEmploymentHistory(user_id, data) {
    return await EmploymentHistory.create({ user_id, ...data });
  }

  // 6. Delete Employment History
  async deleteEmploymentHistory(user_id, id) {
    await EmploymentHistory.destroy({ where: { user_id, id } });
  }

  // 7. Add Academic History
  async addAcademicHistory(user_id, data) {
    return await AcademicHistory.create({ user_id, ...data });
  }

  // 8. Delete Academic History
  async deleteAcademicHistory(user_id, id) {
    await AcademicHistory.destroy({ where: { user_id, id } });
  }

  // 9. Add Project
  async addProject(user_id, data) {
    return await Project.create({ user_id, ...data });
  }

  // 10. Delete Project
  async deleteProject(user_id, id) {
    await Project.destroy({ where: { user_id, id } });
  }

  // 11. Get Public Profile By Username
  async getProfileByUsername(username) {
    const user = await User.findOne({
      where: { username },
      attributes: ["user_id", "first_name", "last_name", "username"],
      include: [
        {
          model: Profile,
          as: "profile",
          attributes: { exclude: ["id", "user_id", "createdAt", "updatedAt"] },
        },
        {
          model: Skill,
          as: "skills",
          attributes: ["skill_id", "name"],
        },
        {
          model: EmploymentHistory,
          as: "employmentHistories",
          attributes: { exclude: ["user_id", "createdAt", "updatedAt"] },
        },
        {
          model: AcademicHistory,
          as: "academicHistories",
          attributes: { exclude: ["user_id", "createdAt", "updatedAt"] },
        },
        {
          model: Project,
          as: "projects",
          attributes: { exclude: ["user_id", "createdAt", "updatedAt"] },
        },
      ],
    });

    if (!user) throw new Error("User not found");
    return user;
  }
}

module.exports = new ProfileService();
