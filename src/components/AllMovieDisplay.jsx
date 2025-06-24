"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Slider from "react-slick";
import MovieCard from "@/components/MovieCard";
import { getMovies } from "@/controller/movieUpload";
import MovieCardSkeleton from "@/components/MovieCardSkeleton";

export default function AllMovieDisplay() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      const result = await getMovies();
      if (result.error) {
        setError(result.error);
      } else {
        setMovies(result);
      }
    };

    fetchMovies();
  }, []);

  if (error) {
    return <div className="text-red-600 font-semibold p-4">Error: {error}</div>;
  }

  if (movies.length === 0) {
    return (
      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <MovieCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  // Slick slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 9,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
    ],
  };

  return (
    <div className="bg-gray-900">
      {/* Slider of latest movie posters */}
      <div className="px-4 py-6">
        <Slider {...settings}>
          {movies.slice(0, 10).map((movie) => {
            const { _id, title = "Untitled", poster = [] } = movie;
            const slug = `${_id}-${title.toLowerCase().replace(/\s+/g, "-")}`;
            const posterUrl = poster[1] || poster[0] || "/placeholder.jpg";

            return (
              <Link
                key={_id}
                href={`/${slug}`}
                className="p-1 block"
              >
                <img
                  src={posterUrl}
                  alt={title}
                  className="rounded-lg w-[130px] h-[180px]  object-cover shadow-lg"
                />
              </Link>
            );
          })}
        </Slider>
      </div>

      {/* Movie Cards */}
      {movies.map((movie) => (
        <MovieCard key={movie._id} movie={movie} />
      ))}
    </div>
  );
}
