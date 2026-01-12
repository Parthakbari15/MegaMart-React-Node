const ProductShimmer = () => {
    return (
      <div className="bg-white rounded-xl shadow-sm p-4 animate-pulse">
        <div className="h-40 bg-gray-200 rounded"></div>
        <div className="mt-4 h-4 bg-gray-200 rounded"></div>
        <div className="mt-2 h-4 bg-gray-200 w-1/2 rounded"></div>
        <div className="mt-6 h-10 bg-gray-300 rounded-lg"></div>
      </div>
    );
  };
  
  export default ProductShimmer;
  