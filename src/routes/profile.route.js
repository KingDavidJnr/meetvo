const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const ProfileController = require("../controllers/profile.controller");

// route to create user profile
router.post("/profile/user", ProfileController.createProfile);

// route to edit user profile
router.patch("/profile/user/edit", ProfileController.updateProfile);

// route to add skill to profile
router.post("/profile/skill", ProfileController.addSkill);

//route to delete skill from profile
router.delete("/profile/skill/:skill_id", ProfileController.deleteSkill);

//route to add employment history
router.post("/profile/work-history", ProfileController.addEmploymentHistory);

// route to delete employment history
router.delete(
  "/profile/work-history/:work_id",
  ProfileController.deleteEmploymentHistory
);

// route to add academic history
router.post("/profile/education", ProfileController.addAcademicHistory);

// route to delete academic history
router.delete(
  "/profile/education/:education_id",
  ProfileController.deleteAcademicHistory
);

//route to add project
router.post("/profile/project", ProfileController.addProject);

// route to remove project
router.delete("/profile/project/:project_id", ProfileController.deleteProject);

// route to fetch user profile by username
router.get("/profile/user/:username", ProfileController.getProfileByUsername);

// route to create Recruiter profile
router.post("/profile/recruiter", ProfileController.createRecruiterProfile);

// route to update Recruiter profile
router.patch(
  "/profile/recruiter/update",
  ProfileController.updateRecruiterProfile
);

// route to fetch recruiter profile by username
router.get(
  "/profile/recruiter/:username",
  ProfileController.getRecruiterProfile
);

module.exports = router;
