const mongoose = require("mongoose");
const slugify = require("slugify");
const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: String,
    description: { type: String, required: true },
    developer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image:{type:String},
    synopsis:{type:String},
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    overAllRating:{type:Number,default:0},
    price: { type: Number, required: true },
    sourceCode:{type:String},
    demoLink: { type: String },
    additionalNotes: { type: String },
    isAvailable: { type: Boolean, default: true },
    tags: { type: [String] },
    reviews: [
      {
        reviewer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        title: { type: String },
        rating: { type: Number, min: 1, max: 5 },
        comment: { type: String },
        createdAt: { type: Date, default: Date.now }, // Add this line
      },
    ],
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    },
    transactions: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Transaction" },
    ],
  },
  { timestamps: true }
);
projectSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});
const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
