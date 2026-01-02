"use client";

import Link from 'next/link';
import { subServicesData } from './SubServicesData';
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from 'react';
import useSWR from 'swr';

interface ChildCategory {
  id: string;
  category: string;
  image_link: string;
}

interface SubCategory {
  id: string;
  category: string;
  child: ChildCategory[];
}

interface Category {
  _id: { $oid: string };
  id: string;
  category: string;
  sub: SubCategory[];
}

interface SubServicesItemsProps {
  serviceName: string;
  subcategoryId?: string;
}

const fetcher = async (url: string) => {
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  
  return await response.json();
};

const SubServicesItems: React.FC<SubServicesItemsProps> = ({ serviceName, subcategoryId }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Fetch service categories to get child categories
  const { data: categoriesData, error, isLoading } = useSWR('/api/category/service', fetcher);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Find the selected category
  const selectedCategory = categoriesData?.find((cat: Category) => 
    cat.category === serviceName
  );

  // Find the selected subcategory
  const selectedSubcategory = selectedCategory?.sub?.find((sub: SubCategory) => 
    sub.id === subcategoryId
  );

  // Get child categories
  const childCategories = selectedSubcategory?.child || [];

  // Fallback to static data if API data is not available
  const fallbackData = subServicesData[serviceName as keyof typeof subServicesData] || [];
  const hasApiData = childCategories && childCategories.length > 0;

  // Show loading state
  if (isLoading && !hasApiData) {
    return (
      <ul className={`
        ml-4 p-4 space-y-2 mt-2 w-64 bg-white shadow-xl relative rounded-md z-50
        transform transition-all duration-500 ease-in-out
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}
      `}>
        <li>
          <p className="text-gray-500">Loading...</p>
        </li>
      </ul>
    );
  }

  // Show error state
  if (error && !hasApiData) {
    return (
      <ul className={`
        ml-4 p-4 space-y-2 mt-2 w-64 bg-white shadow-xl relative rounded-md z-50
        transform transition-all duration-500 ease-in-out
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}
      `}>
        <li>
          <p className="text-red-500">Error loading data</p>
        </li>
      </ul>
    );
  }

  return (
    <ul className={`
      ml-4 p-4 space-y-2 mt-2 w-64 bg-white shadow-xl relative rounded-md z-50
      transform transition-all duration-500 ease-in-out
      ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}
    `}>
      {hasApiData ? (
        // Use API data if available
        childCategories.map((child: { id: Key | null | undefined; category: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<unknown>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<unknown>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
          <li key={child.id}>
            <Link
              href={`/ServicesPage?category=${serviceName}&subcategory=${selectedSubcategory?.category}&child=${child.category}`}
              className="block text-gray-600 hover:text-gray-900 hover:bg-orange-50
                       rounded py-1 px-2 transition-all duration-300 ease-in-out
                       transform hover:translate-x-1"
            >
              {child.category}
            </Link>
          </li>
        ))
      ) : (
        // Fall back to static data
        fallbackData.map((item, index) => (
          <li key={index}>
            {item.items.map((subItem, subIndex) => (
              <Link
                key={subIndex}
                href={subItem.href}
                className="block text-gray-600 hover:text-gray-900 hover:bg-orange-50
                         rounded py-1 px-2 transition-all duration-300 ease-in-out
                         transform hover:translate-x-1"
              >
                {subItem.name}
              </Link>
            ))}
          </li>
        ))
      )}
    </ul>
  );
};

export default SubServicesItems;




// "use client";
// import Link from 'next/link';
// import { subServicesData } from './SubServicesData';

// interface SubServicesItemsProps {
//   serviceName: keyof typeof subServicesData;
// }

// const SubServicesItems: React.FC<SubServicesItemsProps> = ({ serviceName }) => {
//   const subServices = subServicesData[serviceName];
  
//   return (
//     <ul className="ml-4 p-4 space-y-2 mt-2 w-64 bg-white shadow-xl relative rounded-md z-50">
//       {subServices.map((item, index) => (
//         <li key={index}>
//           {item.items.map((subItem, subIndex) => (
//             <Link
//               key={subIndex}
//               href={subItem.href}
//               className="block text-gray-600 hover:text-gray-900 hover:bg-gray-50 
//                        rounded py-1 px-2 transition-all duration-200"
//             >
//               {subItem.name}
//             </Link>
//           ))}
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default SubServicesItems;
