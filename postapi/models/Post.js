const mongoose = require("mongoose");
const { type } = require("os");
const { Schema, model } = mongoose;
const ratingSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  createdAt: { type: Date, default: Date.now }
});

const PostSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
    title: {
      type: String,
      required: true,
      unique:false
    },
    eventtitle:{
      type:String,
    },

    image1: {
      type: String,
      default:
        "https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png",
    },
    image2: {
      type: String,
      // default:
      //   "https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png",
    },
    coinalloted: {
      type: Number,
    },
    isReviewed:{
      type: Boolean,
      default: false,
    },
    link1: {
      type: String,
    },
    link2: {
      type: String,
    },
    ratings: [ratingSchema],

    category: {
      type: [String],
      default: "uncategorized",
    },
    readingType: {
      type: String,
      default: "Blog",
    },
    contributionType: {
      type: String,
    },
    slug: {
      type: String,
    },

    publish: {
      type: Boolean,
      default: false,
    },
    bookmarks: [{
      type:String
    }],
    quiz: [{
      quizQuestion: {
        type: String,
      },
      quizOptions: {
        type: [String],
      },
      correctAnswer: {
        type: String,
      },
    }]
    
  },
  { timestamps: true }
);

const PostModel = model("Post", PostSchema);

module.exports = PostModel;
