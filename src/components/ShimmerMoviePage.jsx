// components/ShimmerMoviePage.jsx
export default function ShimmerMoviePage() {
  return (
    <section className="container max-w-3xl mx-auto p-4 animate-pulse text-gray-700 space-y-6">
      {/* Title */}
      <div className="h-6 w-3/4 bg-gray-400 rounded" />

      {/* Date */}
      <div className="h-4 w-1/4 bg-gray-400 rounded" />

      {/* Poster and Basic Info */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Poster */}
        <div className="h-72 w-56 bg-gray-400 rounded-xl" />
        {/* Text block */}
        <div className="flex-1 space-y-3">
          <div className="h-4 w-full bg-gray-400 rounded" />
          <div className="h-4 w-5/6 bg-gray-400 rounded" />
          <div className="h-4 w-4/6 bg-gray-400 rounded" />
        </div>
      </div>

      {/* Big Title Again */}
      <div className="h-6 w-2/3 mx-auto bg-gray-400 rounded" />

      {/* Download Button Placeholder */}
      <div className="h-12 bg-gray-400 rounded w-full" />

      {/* Trailer Section */}
      <div className="mt-6">
        <div className="h-6 w-2/3 mx-auto bg-gray-400 rounded mb-4" />
        <div className="w-full aspect-video bg-gray-400 rounded-xl" />
      </div>

      {/* Overview Title */}
      <div className="h-6 w-1/3 mx-auto bg-gray-400 rounded" />

      {/* Plot Paragraph */}
      <div className="space-y-2">
        <div className="h-4 w-full bg-gray-400 rounded" />
        <div className="h-4 w-5/6 bg-gray-400 rounded" />
        <div className="h-4 w-4/6 bg-gray-400 rounded" />
      </div>

      {/* Details */}
      <div className="space-y-2">
        {Array.from({ length: 7 }).map((_, idx) => (
          <div key={idx} className="h-4 w-2/3 bg-gray-400 rounded" />
        ))}
      </div>

      {/* Gray background section like IMDb box */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col md:flex-row gap-4 text-white">
        <div className="h-72 w-40 bg-gray-600 rounded-xl" />
        <div className="flex-1 space-y-2">
          <div className="h-5 w-2/3 bg-gray-500 rounded" />
          {Array.from({ length: 5 }).map((_, idx) => (
            <div key={idx} className="h-4 w-3/4 bg-gray-600 rounded" />
          ))}
        </div>
        <div className="w-12 h-12 bg-yellow-400 rounded-br-xl absolute bottom-0 right-0" />
      </div>
    </section>
  );
}
