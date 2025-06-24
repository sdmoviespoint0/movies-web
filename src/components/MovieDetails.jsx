"use client";

import DownloadButton from "@/components/DownloadButton";
import { FaCalendarAlt } from "react-icons/fa";
import { GoTriangleRight } from "react-icons/go";

export default function MovieDetails({ movie }) {
  const {
    title,
    poster,
    released,
    length,
    quality,
    genre,
    language,
    imdbRating,
    actors,
    plot,
    trailer,
    downloadLinks,
    createdAt,
  } = movie;

  console.log("downloadLinks", downloadLinks);

  const audioText =
    language.length > 2
      ? "Multi Audio DDP5.1"
      : language.map((lang) => `${lang} DDP5.1`).join(" + ");

  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const fullTitle = `${title} ${new Date(
    formattedDate
  ).getFullYear()} Full Movie Download Free ${quality}`;
  const domainName = process.env.NEXT_PUBLIC_DOMAIN_NAME;

  return (
    <section className="container max-w-3xl mx-auto p-4 text-gray-700">
      {/* Title */}
      <div className="py-3">
        <h1 className="text-xl font-sans font-bold text-[#5a8ba8]">
          <GoTriangleRight className="text-2xl float-left font-black ml-[-4px]" />
          {fullTitle} [{audioText}]
        </h1>
        <div className="mb-6"></div>
      </div>

      {/* Date */}
      <div className="text-[#c3c4d1] text-sm flex items-center mb-2">
        <FaCalendarAlt className="float-left mr-1" /> {formattedDate}
      </div>

      {/* Movie Basic Info */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Poster */}
        <img
          alt={title}
          src={poster[0] || poster[1]}
          className="h-72 w-56 md:w-56 md:h-76 rounded-xl shadow-lg object-cover"
        />

        {/* Info Details */}
        <p className="text-base leading-relaxed">
          <span className="font-bold">{fullTitle}.</span> Download{" "}
          <span className="font-bold">
            {title} {new Date(released).getFullYear()}
          </span>{" "}
          Full Movie Free High Speed Download from{" "}
          <span className="font-bold">{domainName}</span>.
        </p>
      </div>

      {/* Movie full name again */}
      <div className="font-bold underline text-xl text-center mt-8">
        {fullTitle}
      </div>

      {/* Download Links */}
      <div>
        <DownloadButton downloadLinks={downloadLinks} />
      </div>
      {/* Trailer Section */}
      {trailer && (
        <div className="mt-12 mb-6">
          <h3 className="text-2xl  underline font-bold mb-4 text-center">
            Watch Trailer of {title}
          </h3>
          <iframe
            className="w-full aspect-video sm:h-72 md:h-80 lg:h-[500px] rounded-xl shadow-lg"
            src={`https://www.youtube.com/embed/${trailer}`}
            title={`${title} Trailer`}
            allowFullScreen
          />
        </div>
      )}

      {/* Plot or movie overview */}
      {plot && (
        <section className=" px-4">
          <h2 className="text-xl font-bold text-center mb-2 text-gray-700 underline">
            Movie Overview
          </h2>

          <p className="text-gray-700 mb-4 max-w-4xl mx-auto text-start leading-relaxed">
            {fullTitle} {plot} {title}{" "}
            {formattedDate && new Date(formattedDate).getFullYear()}.
          </p>
          <div>
            <p>
              <span className="font-semibold">Full Name:</span> {fullTitle}
            </p>
            <p>
              <span className="font-semibold">Released:</span> {released}
            </p>
            <p>
              <span className="font-semibold">Length:</span> {length}
            </p>
            <p>
              <span className="font-semibold">Genres:</span> {genre?.join(", ")}
            </p>
            <p>
              <span className="font-semibold">Languages:</span>{" "}
              {language?.join(", ")}
            </p>
            <p>
              <span className="font-semibold">IMDb Rating:</span> ⭐{" "}
              {imdbRating}
            </p>
            <p>
              <span className="font-semibold">Actors:</span>{" "}
              {actors?.join(", ")}
            </p>
          </div>

          <div className="bg-gray-900 relative my-8 text-sm text-gray-100 p-6 rounded-xl shadow-lg flex flex-col md:flex-row gap-2">
            <div className="rounded-2xl md:mr-4">
              <img
                alt={title}
                src={poster[1] || poster[0]}
                className="h-72 w-auto max-w-full rounded-xl shadow-lg object-contain"
              />
            </div>

            {/* Movie Details */}
            <div className="flex-1 space-y-1">
              <h3 className="text-lg m-0 p-0 font-bold text-amber-400">
                {title}
              </h3>
              <p className="text-xs mt-0 mb-8 p-0">| {formattedDate}</p>
              <p>
                <span className="font-semibold text-gray-400">Summary:</span>{" "}
                {plot}
              </p>
              <p>
                <span className="font-semibold text-gray-400">Genres:</span>{" "}
                {genre?.join(", ")}
              </p>
              <p>
                <span className="font-semibold text-gray-400">Actors:</span>{" "}
                {actors?.join(", ")}
              </p>
              <p>
                <span className="font-semibold text-gray-400">Languages:</span>{" "}
                {language?.join(", ")}
              </p>
              <p className="text-amber-400 mt-6 text-xs">
                <span className=" text-gray-100">source:</span> imdb.com
              </p>
            </div>

            <p className="right-0.5 bottom-0.5 rounded-br-xl absolute px-2 overflow-hidden font-black text-xl text-black bg-amber-400">
              IMDb
            </p>
          </div>
        </section>
      )}
    </section>
  );
}
