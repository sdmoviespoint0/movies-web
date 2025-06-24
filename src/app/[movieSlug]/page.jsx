"use client";

import { useEffect, useState } from "react";
import { use } from "react"; // <-- import React.use()
import MovieDetails from "@/components/MovieDetails";
import ShimmerMoviePage from "@/components/ShimmerMoviePage";

export default function MoviePage({ params }) {
  const unwrappedParams = use(params); // <-- unwrap the promise
  const { movieSlug } = unwrappedParams;
  const [id] = movieSlug.split("-");

  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchMovie() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/movies/${id}`, {
          cache: "no-store",
        });

        if (!res.ok) throw new Error(`Failed to fetch movie: ${res.statusText}`);

        const data = await res.json();
        setMovie(data.movie);
      } catch (err) {
        console.error("Error fetching movie:", err);
        setErrorMessage("Failed to load movie details.");
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();
  }, [id]);

  if (loading) return <div className="p-4 bg-gray-100"><ShimmerMoviePage /></div>;

  return (
    <div className="p-4 bg-gray-100">
      {errorMessage ? (
        <p className="text-red-600">{errorMessage}</p>
      ) : (
        <MovieDetails movie={movie} />
      )}
    </div>
  );
}
