const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: {
    type: String,
    enum: ["developer", "buyer", "admin"],
    required: true,
  },
  mobile: { type: String },
  answer: { type: String },
  bio: { type: String },
  profileImage: { type: String },
  skills: { type: [String] },
  website: { type: String },
  location: { type: String },
  socialMedia: { type: String },
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
  favoriteProjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
  walletBalance: { type: Number, default: 0 },
  transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Transaction" }],
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// we are hashing the password
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

// we are generating tokem
userSchema.methods.generateAuthToken = async function () {
  try {
    let myToken = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: myToken });
    await this.save();
    return myToken;
  } catch (error) {
    console.log(error);
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
