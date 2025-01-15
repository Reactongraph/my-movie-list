import { NextResponse, NextRequest } from "next/server";
import {
  createMovies,
  getMovies,
  getMovieById,
  updateMovieById,
  deleteMovieById,
} from "../services/movieServices.ts/movieServices";

// POST - Create a new movie
export async function POST(req: NextRequest) {
  const result = await createMovies(req);
  return NextResponse.json(result, { status: result.status });
}

// GET - Get movie list
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const movieId = searchParams.get("id");
  let result;
  if (movieId) {
    // Get movie by ID
    result = await getMovieById(req);
  } else {
    // Get movie list
    result = await getMovies(req);
  }

  return NextResponse.json(result, { status: result.status });
}

export async function PUT(req: NextRequest) {
  const result = await updateMovieById(req);
  return NextResponse.json(result, { status: result.status });
}

export async function DELETE(req: NextRequest) {
  const result = await deleteMovieById(req);
  return NextResponse.json(result, { status: result.status });
}
