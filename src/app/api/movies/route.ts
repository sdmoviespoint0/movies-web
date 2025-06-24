import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Movie from "@/models/movieSchema";

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const data = await req.json();
    // Basic validation
if (
  !data.title ||
  !data.poster?.length ||
  !Array.isArray(data.downloadLinks) ||
  data.downloadLinks.length === 0
) {
  return NextResponse.json(
    { message: "Title, poster, and at least one download link are required." },
    { status: 400 }
  );
}

const availableTitle = await Movie.findOne({ title: data.title });
    if (availableTitle) {
      return NextResponse.json(
        { message: "Movie with this title already exists." },
        { status: 409 } // Conflict
      );
    }
    

    // Create new movie
    const movie = await Movie.create(data);

    return NextResponse.json(
      { message: "Movie added successfully", movie },
      { status: 201 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error creating movie:", error);
    return NextResponse.json(
      { message: "Failed to add movie", error: errorMessage },
      { status: 500 }
    );
  }
}

export async function GET() {
  await dbConnect();

  try {
    const movies = await Movie.find().sort({ createdAt: -1 });

    return NextResponse.json({ movies }, { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error fetching movies:", error);
    return NextResponse.json(
      { message: "Failed to fetch movies", error: errorMessage },
      { status: 500 }
    );
  }
}
