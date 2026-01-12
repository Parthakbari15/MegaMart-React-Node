const CategoryShimmer = ({ count = 14 }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 mt-14">
      <h2 className="font-semibold text-lg mb-6">
        <div className="h-5 w-60 bg-gray-200 rounded animate-pulse"></div>
      </h2>

      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-6 text-center">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="flex flex-col items-center">
            {/* Circle shimmer */}
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gray-200 animate-pulse"></div>

            {/* Text shimmer */}
            <div className="h-4 w-16 mt-3 bg-gray-200 rounded animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryShimmer;
