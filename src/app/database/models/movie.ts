import mongoose, { Document, Schema } from "mongoose";

interface Movies extends Document {
  title: string;
  videoUrl: string;
  publishingYear: string;
  poster: string;
}

const MovieSchema = new Schema<Movies>(
  {
    title: { type: String, required: true },
    videoUrl: { type: String, required: false },
    publishingYear: { type: String, required: true },
    poster: { type: String, required: false },
  },
  { timestamps: true }
);

const MoviesModel =
  mongoose.models.Movies || mongoose.model("Movies", MovieSchema);

export default MoviesModel;
