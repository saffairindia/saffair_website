const Post = require("../models/Post");
const mongoose = require("mongoose");

// Function to add a rating to a post
async function addRating(postId, userId, ratingValue) {
  const newRating = {
    userId,
    rating: ratingValue,
    createdAt: new Date(),
  };

  const updatedPost = await Post.findByIdAndUpdate(
    postId,
    { $push: { ratings: newRating } },
    { new: true }
  ).populate("ratings.userId");

  return updatedPost;
}

// Function to calculate the average rating of a post
async function getAverageRating(postId) {
  const post = await Post.findById(postId).populate("ratings.userId");

  const ratings = post.ratings;
  const totalRating = ratings.reduce((sum, r) => sum + r.rating, 0);
  const averageRating = ratings.length ? totalRating / ratings.length : 0;

  return averageRating;
}

module.exports = { addRating, getAverageRating };
