"use client";

import Link from "next/link";
import { GoTriangleRight } from "react-icons/go";
import { FaCalendarAlt } from "react-icons/fa";

export default function MovieCard({ movie }) {
  const {
    _id,
    title = "Untitled Movie",
    poster = [],
    quality = "HD",
    createdAt,
    plot,
  } = movie;

  const posterUrl = poster[0] || poster[1] || "/placeholder.jpg";
  const slug = `${_id}-${title.toLowerCase().replace(/\s+/g, "-")}`;

  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const fullTitle = `${title} ${new Date(createdAt).getFullYear()} Full Movie Download Free ${quality}`;

  return (
    <div className="bg-white mb-2 mx-auto max-w-3xl p-3 sm:p-4 rounded-md shadow-md hover:shadow-lg transition overflow-hidden border border-gray-200">
      
  <div className="flex flex-row items-start gap-3">
    {/* Poster */}
    <Link href={`/${slug}`} className="w-[160px] md:w-[200px] flex-shrink-0 p-1 rounded-md bg-gradient-to-br from-[#9544bc] to-[#31a1ef]">
      <img
        src={posterUrl}
        alt={title}
        className="w-full h-[240px] md:h-[288px] object-cover rounded-md"
        loading="lazy"
      />
    </Link>

    {/* Content */}
    <div className="flex-1 font-openSans space-y-2">
      <Link href={`/${slug}`}>
        <h3 className="text-lg md:text-xl font-bold text-[#5a8ba8] line-clamp-2 flex items-start gap-1">
          <GoTriangleRight className="text-2xl" />
          {fullTitle}
        </h3>
      </Link>

      <div className="text-xs sm:text-sm text-[#999] flex items-center gap-2">
        <FaCalendarAlt /> {formattedDate}
      </div>

      <p className="text-sm text-gray-700 leading-snug line-clamp-3">
        {plot?.slice(0, 100) || "No description available."}
      </p>

      {/* Download Button */}
      <div className="md:pt-2">
        <Link
          href={`/${slug}`}
          className="inline-block px-4 py-1 md:px-6 md:py-2 rounded-full text-white font-semibold text-sm sm:text-base animated-gradient shadow-md hover:shadow-lg transition-all duration-300"
        >
          Download Now
        </Link>
      </div>
    </div>
  </div>
</div>


  );
}
