import { NextRequest } from "next/server";
import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import MoviesModel from "@/app/database/models/movie";
import { verifyToken } from "@/app/middleware/authMiddleware";

// Initialize S3
const s3 = new AWS.S3({
  accessKeyId: process.env.NEXT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_APP_AWS_SECRET_ACCESS_KEY,
  region: process.env.NEXT_APP_AWS_REGION,
});

// ✅ Create Movie API
export const createMovies = async (req: NextRequest) => {
  try {
    // Verify the JWT token
    const decodedToken = await verifyToken(req);
    if (!decodedToken) {
      return { status: 401, message: "Unauthorized" };
    }

    // Parse form data
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const poster = formData.get("poster") as File;
    const publishingYear = formData.get("publishingYear") as string;
    const videoUrl = formData.get("videoUrl") as string | undefined;

    if (!poster) {
      return { status: 400, message: "Poster image is required" };
    }
    const buffer = Buffer.from(await poster.arrayBuffer());
    // Upload poster to S3
    const fileName = `${uuidv4()}-${poster.name}`;
    const uploadParams = {
      Bucket: process.env.NEXT_APP_AWS_S3_BUCKET_NAME!,
      Key: fileName,
      Body: buffer,
      ContentType: poster.type,
      ACL: "public-read",
    };

    const s3Response = await s3.upload(uploadParams).promise();
    const posterUrl = s3Response.Location;

    // Save movie in MongoDB
    const newMovie = new MoviesModel({
      title,
      videoUrl,
      publishingYear,
      poster: posterUrl,
    });

    await newMovie.save();

    return { status: 201, message: "Movie created successfully!" };
  } catch (error) {
    console.error("Error creating movie:", error);
    return { status: 500, message: "Internal Server Error" };
  }
};

// ✅ Get Movie List API
export const getMovies = async (req: NextRequest) => {
  try {
    // Verify the JWT token
    const decodedToken = await verifyToken(req);
    if (!decodedToken) {
      return { status: 401, message: "Unauthorized" };
    }

    // Fetch movies from MongoDB
    const movies = await MoviesModel.find();

    return { status: 200, data: movies };
  } catch (error) {
    console.error("Error fetching movies:", error);
    return { status: 500, message: "Internal Server Error" };
  }
};
export const getMovieById = async (req: NextRequest) => {
  try {
    // Verify the JWT token
    const decodedToken = await verifyToken(req);
    if (!decodedToken) {
      return { status: 401, message: "Unauthorized" };
    }

    // Extract movie ID from the URL
    const { searchParams } = new URL(req.url);
    const movieId = searchParams.get("id");

    if (!movieId) {
      return { status: 400, message: "Movie ID is required" };
    }

    // Fetch the movie from MongoDB by ID
    const movie = await MoviesModel.findById(movieId);

    if (!movie) {
      return { status: 404, message: "Movie not found" };
    }

    return { status: 200, data: movie };
  } catch (error) {
    console.error("Error fetching movie by ID:", error);
    return { status: 500, message: "Internal Server Error" };
  }
};
export const updateMovieById = async (req: NextRequest) => {
  try {
    // Verify the JWT token
    const decodedToken = await verifyToken(req);
    if (!decodedToken) {
      return { status: 401, message: "Unauthorized" };
    }

    // Extract movie ID from the URL
    const { searchParams } = new URL(req.url);
    const movieId = searchParams.get("id");

    if (!movieId) {
      return { status: 400, message: "Movie ID is required" };
    }

    // Parse form data
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const poster = formData.get("poster");
    const publishingYear = formData.get("publishingYear") as string;
    const videoUrl = formData.get("videoUrl") as string;

    // Find the movie by ID
    const movie = await MoviesModel.findById(movieId);
    if (!movie) {
      return { status: 404, message: "Movie not found" };
    }

    // Update text fields
    movie.title = title || movie.title;
    movie.publishingYear = publishingYear || movie.publishingYear;
    movie.videoUrl = videoUrl || movie.videoUrl;

    // Handle the poster update
    if (poster instanceof File) {
      // Convert the poster file to a buffer
      const buffer = Buffer.from(await poster.arrayBuffer());
      const fileName = `${uuidv4()}-${poster.name}`;

      // Upload the poster to S3
      const uploadParams = {
        Bucket: process.env.NEXT_APP_AWS_S3_BUCKET_NAME!,
        Key: fileName,
        Body: buffer,
        ContentType: poster.type,
        ACL: "public-read",
      };

      const s3Response = await s3.upload(uploadParams).promise();
      movie.poster = s3Response.Location;
    } else if (typeof poster === "string") {
      // If the poster is already a URL, just update the poster field
      movie.poster = poster;
    }

    // Save the updated movie
    await movie.save();

    return { status: 200, message: "Movie updated successfully!", data: movie };
  } catch (error) {
    console.error("Error updating movie:", error);
    return { status: 500, message: "Internal Server Error" };
  }
};

export const deleteMovieById = async (req: NextRequest) => {
  try {
    // Verify the JWT token
    const decodedToken = await verifyToken(req);
    if (!decodedToken) {
      return { status: 401, message: "Unauthorized" };
    }

    // Extract movie ID from the URL
    const { searchParams } = new URL(req.url);
    const movieId = searchParams.get("id");

    if (!movieId) {
      return { status: 400, message: "Movie ID is required" };
    }

    // Delete the movie from MongoDB
    const movie = await MoviesModel.findByIdAndDelete(movieId);

    if (!movie) {
      return { status: 404, message: "Movie not found" };
    }

    return { status: 200, message: "Movie deleted successfully!" };
  } catch (error) {
    console.error("Error deleting movie:", error);
    return { status: 500, message: "Internal Server Error" };
  }
};
