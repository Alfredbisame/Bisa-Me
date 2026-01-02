const AffiliateLoadingState = () => {
  return (
    <div className="p-12 text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
      <p className="text-gray-500">Loading affiliates...</p>
    </div>
  );
};

export default AffiliateLoadingState; 