import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Movie from "@/models/movieSchema";
import mongoose from "mongoose";

export async function GET(request, context) {
  const movieId = context.params.id;

  await dbConnect();

  if (!mongoose.Types.ObjectId.isValid(movieId)) {
    return NextResponse.json(
      { success: false, error: "Invalid movie ID" },
      { status: 400 }
    );
  }

  try {
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return NextResponse.json({ success: false, message: "Movie not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, movie }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch movie", error: error.message },
      { status: 500 }
    );
  }
}
