import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
  fileId: { type: String, required: true },
  fileLabel: { type: String, required: true },
  fileUrl: { type: String, required: true },
  fileSize: { type: String, required: true },
});

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Movie title is required."],
    trim: true,
    unique: true,
  },
  poster: {
    type: [String],
    required: [true, "Poster URL is required."],
    default: ["https://example.com/default-poster.jpg"]
  },
  trailer: {
    type: String,
    default: "Trailer link not provided."
  },
  released: {
    type: String,
    default: "Release date not available"
  },
  length: {
    type: String,
    default: "Runtime not specified"
  },
  qualityType: {
    type: String,
    default: "Quality not specified"
  },
  genre: {
    type: [String],
    default: ["Genre not specified"]
  },
  language: {
    type: [String],
    default: ["Language not specified"]
  },
  actors: {
    type: [String],
    default: ["Cast not available"]
  },
  imdbRating: {
    type: String,
    default: "Rating not available"
  },
  plot: {
    type: String,
    default: "Plot summary not available"
  },
  industry: {
    type: String,
    default: "Industry not specified"
  },
  type: {
    type: String,
    enum: ["movie", "season"],
    default: "movie"
  },
  whoWatch: {
    type: String,
    enum: ["Kids", "Adult", "Family"],
    default: "Family"
  },
  downloadLinks: {
    type: [linkSchema],
    required: true,
  }

}, { timestamps: true });

const Movie = mongoose.models.Movie || mongoose.model("Movie", movieSchema);

export default Movie;
