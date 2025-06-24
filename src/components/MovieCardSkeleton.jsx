export default function MovieCardSkeleton() {
  return (
    <div className="bg-white max-w-3xl mx-auto p-3 sm:p-4 rounded-md shadow-md overflow-hidden border border-gray-200 animate-pulse">
      <div className="flex flex-row items-start gap-3">
        <div className="w-[160px] md:w-[200px] h-[240px] md:h-[288px] bg-gradient-to-br from-gray-200 to-gray-300 rounded-md" />
        <div className="flex-1 space-y-3">
          <div className="h-5 bg-gray-300 rounded w-3/4" />
          <div className="h-4 bg-gray-300 rounded w-1/2" />
          <div className="h-4 bg-gray-300 rounded w-full" />
          <div className="h-4 bg-gray-300 rounded w-5/6" />
          <div className="h-8 bg-gray-300 rounded w-32 mt-2" />
        </div>
      </div>
    </div>
  );
}
