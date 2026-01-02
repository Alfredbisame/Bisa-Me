import React from "react";

const PerService = () => {
  return (
    <div className="flex flex-col gap-3">
      <label htmlFor="perService" className="text-blue-700 font-semibold">
        Price Type
      </label>
      <select
        name="perService"
        id="perService"
        className="w-full border border-blue-300 rounded-md p-2 text-[#7a9ebd] placeholder-[#7a9ebd] focus:outline-none focus:ring-1 focus:ring-blue-300 hover:border-orange-400 hover:bg-orange-50 transition-all duration-200"
      >
        <option value="">Per service</option>
        <option value="">Per day</option>
        <option value="">Per hour</option>
      </select>
    </div>
  );
};

export default PerService;
