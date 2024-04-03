const express = require("express");
const Project = require("../models/projectSchema");
const Authenticate = require("../middleware/authenticate");
const checkAdminOrDev = require("../middleware/checkAdminOrDev");
require("../db/conn"); //connection
const router = express.Router();
const {
  createProjectController,
  getAllProjectController,
  getSingleProjectController,
  updateSingleProjectController,
  deleteSingleProjectController,
  getProjectByCategoryController,
  getSingleFromSlugProjectController,
  postReviewController,
  getAllReviewController,
  getDataByFilterationController,
  getAllForAdminProjectController,
  approveProjectController,
  rejectProjectController,
} = require("../controllers/projectController");

  // Route: Create a new project
  router.post(
    "/create",
    Authenticate,
    checkAdminOrDev,
    createProjectController
  );

// Route: Get all projects
router.get("/all", getAllProjectController);
router.get("/all-admin", getAllForAdminProjectController);
// Route: Get project details by ID
router.get("/single/:projectId", getSingleProjectController);
router.get("/single/slug/:slug", getSingleFromSlugProjectController);
// Route: Update project by ID
router.put(
  "/single/:projectId",
  Authenticate,
  checkAdminOrDev,
  updateSingleProjectController
);
// Route: Delete project by ID
router.delete(
  "/single/:projectId",
  Authenticate,
  checkAdminOrDev,
  deleteSingleProjectController
);
// Route: Get project by category
router.get("/category/:category", getProjectByCategoryController);
// Route: POST review for Project
router.post("/review/:slug", Authenticate, postReviewController);
router.get("/review/:slug", getAllReviewController);
// Route : Get project based on price and rating
router.get("/filter", getDataByFilterationController);

// Approve a project
router.put("/approve/:id", approveProjectController);

// Reject a project
router.put("/reject/:id", rejectProjectController);

module.exports = router;
