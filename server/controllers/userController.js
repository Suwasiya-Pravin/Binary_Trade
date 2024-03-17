const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const Project = require("../models/projectSchema");

// user Register
const registerController = async (req, res) => {
  const { firstname, lastname, username, email, password, userType } = req.body;

  if (
    !firstname ||
    !firstname ||
    !username ||
    !email ||
    !password ||
    !userType
  ) {
    return res.status(422).json({ error: "pls fill info" });
  }
  // using async
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "email already exist" });
    } else {
      const user = new User({
        firstname,
        lastname,
        username,
        email,
        password,
        userType,
      });
      // hash start here

      const userReg = await user.save();

      if (userReg) {
        res.status(201).json({
          success: true,
          msg: "data saved Successfully",
          data: userReg,
        });
      } else {
        res.status(500).json({
          success: false,
          msg: "server issue",
          data: null,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
// developer register
const devloperRegisterController = async (req, res) => {
  const {
    firstname,
    lastname,
    username,
    email,
    bio,
    skills,
    socialMedia,
    mobile,
    password,
    userType,
  } = req.body;

  if (
    !bio ||
    !skills ||
    !socialMedia ||
    !mobile ||
    !firstname ||
    !firstname ||
    !username ||
    !email ||
    !password ||
    !userType
  ) {
    return res.status(422).json({ error: "pls fill info" });
  }
  // using async
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "email already exist" });
    } else {
      const user = new User({
        firstname,
        lastname,
        username,
        email,
        bio,
        skills,
        socialMedia,
        mobile,
        password,
        userType,
      });
      // hash start here

      const userReg = await user.save();

      if (userReg) {
        res.status(201).json({
          success: true,
          msg: "data saved Successfully",
          data: userReg,
        });
      } else {
        res.status(500).json({
          success: false,
          msg: "server issue",
          data: null,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

// user Login
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email && !password) {
      return res.status(400).json({ error: "fill the data" });
    }
    const userLogin = await User.findOne({ email: email });
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      const token = await userLogin.generateAuthToken();

      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });
      console.log(userLogin._id);
      if (!isMatch) {
        res.status(400).json({
          success: false,
          msg: "invalid password",
          data: null,
        });
      } else {
        res.status(201).json({
          success: true,
          msg: "user login sucessfully",
          data: userLogin,
        });
      }
    } else {
      res.status(400).json({
        success: false,
        msg: "invalid email",
        data: null,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
// Get user data
const userDataController = async (req, res) => {
  const id = req.userId;
  // const id = "65de5b1156e903050b2eba7a";
  try {
    // Fetch user details using the authenticated user's ID
    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "user Not found",
        data: null,
      });
    }
    res.status(200).json({
      success: true,
      msg: "user Get sucessfully",
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get user projects
const getUserProjectController = async (req, res) => {
  const id = req.userId;
  try {
    const project = await Project.find({
      developer: id,
    }).populate("developer category", "username email name slug");
    if (project) {
      res.status(200).json({
        success: true,
        msg: "user project get successfully",
        data: project,
      });
    } else {
      res.status(404).json({
        success: false,
        msg: "user not found ",
        data: null,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      msg: error.message,
      data: null,
    });
  }
};
// update user api

const updateUserController = async (req, res) => {
  try {
    const id = req.userId;
    const updatedUserData = req.body;
    // Check if the email already exists in the database
    const existingUser = await User.findOne({ _id: id });
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        msg: "user not find",
        data: null,
      });
    }

    // Find the user by ID and update their profile
    const updatedUser = await User.findByIdAndUpdate(id, updatedUserData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        msg: "user not found",
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      msg: "user updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      msg: error.message,
      data: null,
    });
  }
};
// change password
const changePasswordController = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const id = req.userId;
    // Retrieve the user from the database
    const user = await User.findById(id);
    // Check if the user exists
    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "user not found",
        data: null,
      });
    }

    // Compare the current password with the password stored in the database
    const isPasswordMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        msg: "password is incorrect",
        data: null,
      });
    }
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    // Update the user's password in the database
    const userData = await User.findByIdAndUpdate(id, {
      password: hashedPassword,
    });
    res.status(200).json({
      success: true,
      msg: "password is updated",
      data: userData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message,
      data: null,
    });
  }
};
const addFavoritesController = async (req, res) => {
  try {
    const id = req.userId;
    const { projectId } = req.body;

    // Check if the project is already in favorites
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "user not found",
        data: null,
      });
    }
    if (user.favoriteProjects.includes(projectId)) {
      return res.status(400).json({
        success: false,
        msg: "project already added",
        data: null,
      });
    }
    // Add project to favorites
    user.favoriteProjects.push(projectId);
    const userData = await user.save();

    res.status(200).json({
      success: true,
      msg: "Project Added successfully in favorites",
      data: userData.favoriteProjects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message,
      data: null,
    });
  }
};
const getAllFavoritesController = async (req, res) => {
  try {
    // Find the user by ID and populate the 'favorites' field
    const user = await User.findById(req.userId).populate({
      path: "favoriteProjects",
      select: "title price slug", // Include other fields you want to retrieve
      populate: {
        path: "category",
        select: "name", // Include all relevant fields from the category model
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "user not found",
        data: null,
      });
    }
    // Filter out favorite projects that have been deleted
    const favoriteProjects = user.favoriteProjects.filter(
      async (favoriteProject) => {
        const projectExists = await Project.exists({
          _id: favoriteProject._id,
        });
        return projectExists;
      }
    );
    // Return the favorites array from the user document
    res.status(200).json({
      success: true,
      msg: "all favorites project getting succesfully",
      data: user.favoriteProjects,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      msg: error.message,
      data: null,
    });
  }
};
const deleteFavoriteController = async (req, res) => {
  try {
    const userId = req.userId;
    const { projectId } = req.body;

    // Find the user by user ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "User not found",
        data: null,
      });
    }

    // Check if the project exists in user's favorites
    const index = user.favoriteProjects.indexOf(projectId);
    if (index === -1) {
      return res.status(404).json({
        success: false,
        msg: "favorites project not found ",
        data: null,
      });
    }

    // Remove the project from user's favorites
    user.favoriteProjects.splice(index, 1);

    // Save the updated user
    await user.save();

    res.status(200).json({
      success: true,
      msg: "favorites project remove",
      data: user.favoriteProjects,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      msg: error.message,
      data: null,
    });
  }
};
const getAllUserController = async (req, res) => {
  try {
    const users = await User.find().select("-tokens");
    res.json({
      success: true,
      msg: "All users fetched successfully",
      data: users,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: err.message,
      data: null,
    });
  }
};
const getAllDeveloperController = async (req, res) => {
  try {
    const developers = await User.find({ userType: "developer" }).select(
      "-tokens"
    );
    res.json({
      success: true,
      msg: "All developers fetched successfully",
      data: developers,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: err.message,
      data: null,
    });
  }
};
const getAllBuyerController = async (req, res) => {
  try {
    const buyers = await User.find({ userType: "buyer" }).select("-tokens");

    res.json({
      success: true,
      msg: "All buyers fetched successfully",
      data: buyers,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: err.message,
      data: null,
    });
  }
};

module.exports = {
  registerController,
  loginController,
  userDataController,
  getUserProjectController,
  updateUserController,
  changePasswordController,
  addFavoritesController,
  getAllFavoritesController,
  deleteFavoriteController,
  devloperRegisterController,
  getAllUserController,
  getAllDeveloperController,
  getAllBuyerController,
};
