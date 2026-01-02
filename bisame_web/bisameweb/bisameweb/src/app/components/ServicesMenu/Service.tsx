"use client";

import { servicesData } from './ServicesData';
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import SubServicesItems from './SubServicesItems';
import useSWR from 'swr';

interface SubCategory {
  id: string;
  category: string;
  child?: unknown[]; 
}

interface Category {
  _id: { $oid: string };
  id: string;
  category: string;
  sub: SubCategory[];
}

interface ServiceProps {
  serviceName: string;
  categoryId?: string;
}

const fetcher = async (url: string) => {
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  
  return await response.json();
};

const Service: React.FC<ServiceProps> = ({ serviceName, categoryId }) => {
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Fetch service categories to get subcategories
  const { data: categoriesData, error, isLoading } = useSWR('/api/category/service', fetcher);
  
  // Extract subcategories for the selected service
  const subcategories = categoriesData 
    ? categoriesData.find((cat: Category) => cat.id === categoryId)?.sub || []
    : [];
  
  // Fallback to static data if API data is not available
  const fallbackItems = servicesData[serviceName as keyof typeof servicesData] || [];
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const toggleSubcategory = (subcategoryId: string) => {
    setActiveSubcategory(activeSubcategory === subcategoryId ? null : subcategoryId);
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className={`
        w-64 bg-white shadow-xl border-l ml-2 relative z-50 rounded-sm
        transform transition-all duration-500 ease-in-out
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}
      `}>
        <div className="p-4">
          <p className="text-gray-500">Loading subcategories...</p>
        </div>
      </div>
    );
  }
  
  // Show error state
  if (error) {
    return (
      <div className={`
        w-64 bg-white shadow-xl border-l ml-2 relative z-50 rounded-sm
        transform transition-all duration-500 ease-in-out
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}
      `}>
        <div className="p-4">
          <p className="text-red-500">Error loading subcategories</p>
        </div>
      </div>
    );
  }

  // Use API data if available, otherwise use fallback
  const hasApiData = subcategories && subcategories.length > 0;
  
  return (
    <div className={`
      w-64 bg-white shadow-xl ml-4 border-l z-50 rounded-sm
      transform transition-all duration-500 ease-in-out
      ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}
    `}>
      <ul className="space-y-2 p-4">
        {/* Add an "All" option at the top */}
        {/* <li className="relative">
          <div
            className={`
              flex justify-between items-center p-2 cursor-pointer
              transform transition-all duration-300 ease-in-out
              hover:bg-orange-50 hover:translate-x-2
              bg-gray-100
            `}
          >
            <span className="text-gray-800 font-semibold">
              All {serviceName}
            </span>
          </div>
        </li> */}
        
        {hasApiData ? (
          // Use API data if available
          subcategories.map((subcat: { id: Key | null | undefined; category: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<unknown>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<unknown>> | Iterable<ReactNode> | null | undefined> | null | undefined; child: string | unknown[]; }) => (
            <li key={subcat.id} className="relative">
              <div
                className={`
                  flex justify-between items-center p-2 cursor-pointer
                  transform transition-all duration-300 ease-in-out
                  hover:bg-orange-50 hover:translate-x-2
                  ${activeSubcategory === subcat.id ? 'bg-orange-50 translate-x-2' : ''}
                `}
                onClick={() => toggleSubcategory(String(subcat.id))}
              >
                <span className="text-gray-700 hover:text-gray-900 transition-colors duration-300">
                  {subcat.category}
                </span>
                {subcat.child && subcat.child.length > 0 && (
                  <FaChevronRight
                    className={`
                      text-sm transition-transform duration-300 ease-in-out
                      ${activeSubcategory === subcat.id ? 'rotate-90 text-orange-500' : ''}
                    `}
                  />
                )}
              </div>
              <div className={`
                absolute left-full top-0 ml-3
                transform transition-all duration-300 ease-in-out
                ${activeSubcategory === subcat.id ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}
              `}>
                {activeSubcategory === subcat.id && (
                  <SubServicesItems 
                    serviceName={serviceName} 
                    subcategoryId={subcat.id || undefined}
                  />
                )}
              </div>
            </li>
          ))
        ) : (
          // Fall back to static data
          fallbackItems.map((item, index) => (
            <li key={index} className="relative">
              <div
                className={`
                  flex justify-between items-center p-2 cursor-pointer
                  transform transition-all duration-300 ease-in-out
                  hover:bg-orange-50 hover:translate-x-2
                  ${activeSubcategory === item.name ? 'bg-orange-50 translate-x-2' : ''}
                `}
                onClick={() => toggleSubcategory(item.name)}
              >
                <span className={`
                  text-gray-700 hover:text-gray-900 transition-colors duration-300
                  ${item.name.startsWith('') ? "text-gray-800 font-semibold" : ""}
                `}>
                  {item.name}
                </span>
                <FaChevronRight
                  className={`
                    text-sm transition-transform duration-300 ease-in-out
                    ${activeSubcategory === item.name ? 'rotate-90 text-orange-500' : ''}
                  `}
                />
              </div>
              {activeSubcategory === item.name && (
                <div className="absolute left-full top-0 ml-0">
                  <SubServicesItems serviceName={serviceName} />
                </div>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Service;



// "use client";
// import { servicesData } from './ServicesData';
// import { useEffect, useState } from 'react';
// import { FaChevronRight } from 'react-icons/fa';
// import SubServicesItems from './SubServicesItems';

// interface ServiceProps {
//   serviceName: keyof typeof servicesData;
// }

// interface ServiceItem {
//   name: string;
//   href: string;
// }

// const Service: React.FC<ServiceProps> = ({ serviceName }) => {
//   const [activeService, setActiveService] = useState<string | null>(null);
//   const [isVisible, setIsVisible] = useState(false);
//   const serviceItems = servicesData[serviceName];

//   useEffect(() => {
//     setIsVisible(true);
//   }, []);

//   const toggleService = (serviceName: string) => {
//     setActiveService(activeService === serviceName ? null : serviceName);
//   };

//   return (
//     <div className={`
//       w-64 bg-white shadow-xl border-l ml-2 relative z-50 mt-8 rounded-sm
//       transform transition-all duration-500 ease-in-out
//       ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}
//     `}>
//       <ul className="space-y-2 p-4">
//         {serviceItems.map((service, index) => (
//           <li key={index} className="relative">
//             <div
//               className={`
//                 flex justify-between items-center p-2 cursor-pointer
//                 transform transition-all duration-300 ease-in-out
//                 hover:bg-orange-50 hover:translate-x-2
//                 ${activeService === service.name ? 'bg-orange-50 translate-x-2' : ''}
//               `}
//               onClick={() => toggleService(service.name)}
//             >
//               <span className={`
//                 text-gray-700 hover:text-gray-900 transition-colors duration-300
//                 ${service.name.startsWith('All') ? "text-gray-800 font-semibold" : ""}
//               `}>
//                 {service.name}
//               </span>
//               <FaChevronRight
//                 className={`
//                   text-sm transition-transform duration-300 ease-in-out
//                   ${activeService === service.name ? 'rotate-90 text-orange-500' : ''}
//                 `}
//               />
//             </div>
//             <div className={`
//               absolute left-full top-0 ml-3
//               transform transition-all duration-300 ease-in-out
//               ${activeService === service.name ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}
//             `}>
//               {activeService === service.name && <SubServicesItems serviceName={serviceName} />}
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };



// export default Service;