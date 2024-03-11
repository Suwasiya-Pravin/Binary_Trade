const Project = require("../models/projectSchema");
const User = require("../models/userSchema");
const slugify = require("slugify");
const createProjectController = async (req, res) => {
  const id = req.userId;
  try {
    const { title, description, category,image,synopsis,sourceCode, demoLink, price, additionalNotes } =
      req.body;

    if (!title || !description || !category || !image || !synopsis || !sourceCode || !demoLink || !price ) {
      throw new Error("Missing required fields");
    }


    // Create a new project with URLs
    const project = new Project({
      title,
      description,
      category,
      demoLink,
      price,
      image,
      synopsis,
      sourceCode,
      additionalNotes,
      developer: id,
    });

    const projectData = await project.save();

    const user = await User.findById(id);

    user.projects.push(projectData._id);

    await user.save();

    res.status(201).json({
      success: true,
      msg: "project save successfully",
      data: projectData,
    });
  } catch (error) {
    console.error(error);
       // Check if the error is a validation error
       if (error.name === 'ValidationError') {
        res.status(400).json({
          success: false,
          msg: 'Invalid input',
          data: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          msg: 'Internal server error',
          data: error.message,
        });
      }
  }
};

const getAllProjectController = async (req, res) => {
  try {
    const projects = await Project.find({
      status: { $in: ["approved"] },
    }).populate("developer category", "username email name slug");

    res.status(200).json({
      success: true,
      msg: "all Project get Successfully",
      data: projects,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: error.message,
      data: null,
    });
  }
};
const getAllForAdminProjectController = async (req, res) => {
  try {
    const projects = await Project.find().populate(
      "developer category",
      "username email name slug"
    );

    res.status(200).json({
      success: true,
      msg: "all Project get Successfully",
      data: projects,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: error.message,
      data: null,
    });
  }
};

const getSingleProjectController = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId).populate(
      "developer",
      "username email"
    );
    if (!project) {
      return res.status(404).json({
        success: false,
        msg: "Project not found",
        data: null,
      });
    }
    res.status(200).json({
      success: true,
      msg: "Project get successfully",
      data: project,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: error.message,
      data: null,
    });
  }
};
const getSingleFromSlugProjectController = async (req, res) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug }).populate(
      "developer category",
      "username firstname lastname socialMedia bio name"
    );
    if (!project) {
      return res.status(404).json({
        success: false,
        msg: "Project not found",
        data: null,
      });
    }
    res.status(200).json({
      success: true,
      msg: "Project get successfully",
      data: project,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: error.message,
      data: null,
    });
  }
};

const updateSingleProjectController = async (req, res) => {
  try {
    let updatedProject = await Project.findById(req.params.projectId);
    if (!updatedProject) {
      return res.status(404).json({
        success: false,
        msg: "Project not found",
        data: null,
      });
    }
    // If the title has changed, update the slug as well
    if (req.body.title && req.body.title !== updatedProject.title) {
      req.body.slug = slugify(req.body.title, { lower: true });
    }
    updatedProject = await Project.findByIdAndUpdate(
      req.params.projectId,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      msg: "Project Update Successfully",
      data: updatedProject,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: error.message,
      data: null,
    });
  }
};
const deleteSingleProjectController = async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(
      req.params.projectId
    );

    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Find the user who owns the project
    const user = await User.findOne({ projects: deletedProject._id });

    if (!user) {
      return res.status(500).json({ message: "Internal Server Error" });
    }

    // Remove the project ID from the user's projects array
    user.projects = user.projects.filter(
      (projectId) => projectId.toString() !== deletedProject._id.toString()
    );
    await user.save();

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const getProjectByCategoryController = async (req, res) => {
  try {
    const projects = await Project.find({ category: req.params.category });
    if (!projects) {
      res.status(401).send({
        success: false,
        msg: "project category not found",
        data: null,
      });
    }
    res.status(200).json({
      success: true,
      msg: `${req.params.category} is found`,
      data: projects,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      msg: error.message,
      data: null,
    });
  }
};
const postReviewController = async (req, res) => {
  const slug = req.params.slug;
  const { reviewer, title, rating, comment } = req.body;
  try {
    const project = await Project.findOne({ slug });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const existingReview = project.reviews.find((review) =>
      review.reviewer.equals(reviewer)
    );

    if (existingReview) {
      existingReview.title = title;
      existingReview.rating = rating;
      existingReview.comment = comment;
    } else {
      project.reviews.push({
        reviewer,
        title,
        rating,
        comment,
        createdAt: new Date(),
      });
    }
    // Calculate the new overall rating
    let sum = 0;
    for (let i = 0; i < project.reviews.length; i++) {
      sum += project.reviews[i].rating;
    }
    project.overAllRating =
      project.reviews.length > 0 ? sum / project.reviews.length : 0;

    await project.save();

    res
      .status(200)
      .json({ message: "Review added/updated successfully", project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};
const getAllReviewController = async (req, res) => {
  const { slug } = req.params;
  try {
    const project = await Project.findOne({ slug }).populate(
      "reviews.reviewer",
      "firstname lastname"
    );
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({ reviews: project.reviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};
const getDataByFilterationController = async (req, res) => {
  const minRating = parseInt(req.query.minRating) || 0;
  const maxRating = parseInt(req.query.maxRating) || 5;
  const minPrice = parseInt(req.query.minPrice) || 0;
  const maxPrice = parseInt(req.query.maxPrice) || Number.MAX_VALUE;

  try {
    const projects = await Project.find({
      overAllRating: { $gte: minRating, $lte: maxRating },
      price: { $gte: minPrice, $lte: maxPrice },
    })
      .populate("developer")
      .populate("category")
      .exec();
    res.json({
      success: true,
      msg: "projects get successfully based on filteration",
      data: projects,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: "Something went wrong",
      data: null,
    });
  }
};
const approveProjectController = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({
        success: false,
        msg: "Project not found",
        data: null,
      });
    }

    project.status = "approved";
    await project.save();

    res.status(200).json({
      success: true,
      msg: "Project approved successfully",
      data: project,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: error.message,
      data: null,
    });
  }
};
const rejectProjectController = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({
        success: false,
        msg: "Project not found",
        data: null,
      });
    }

    project.status = "rejected";
    await project.save();

    res.status(200).json({
      success: true,
      msg: "Project rejected successfully",
      data: project,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: error.message,
      data: null,
    });
  }
};
module.exports = {
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
};
