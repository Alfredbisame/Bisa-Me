// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { FaStar, FaMapMarkerAlt } from "react-icons/fa";
// import useSWR from 'swr';
// import { useRouter } from 'next/navigation';

// import { useProductData } from '@/app/components/ProductDetails/hooks/useProductData';

// interface ProductImage {
//   image_link: string;
// }

// interface Product {
//   _id: {
//     $oid: string; 
//   };
//   pageid: string;
//   title: string;
//   category: string;
//   subcategory: string;
//   description: string;
//   price: string;
//   promoted: string;
//   location: string;
//   image: ProductImage[];
//   pageview?: number;
//   info: {
//     name: string;
//     date: string;
//   };
// }

// // Fetcher function for SWR
// const fetcher = async (url: string) => {
//   const response = await fetch(url);
  
//   if (!response.ok) {
//     throw new Error(`HTTP error! Status: ${response.status}`);
//   }
  
//   const data = await response.json();

//   return data.map((item: any) => ({
//     ...item,
//     image: Array.isArray(item.image) ? item.image : [],
//     price: typeof item.price === 'string' ? item.price : 'N/A',
//   }));
// };

// const RelatedProducts = () => {
//   const router = useRouter();
//   const { product: selectedProduct, isLoading: productLoading, hasError: productError } = useProductData();

//   // Use product subcategory as the 'name' parameter for similar ads
//   const categoryName = selectedProduct?.subcategory || 'default';
  
//   // Fetch similar products based on the extracted subcategory
//   const { data: products, error, isLoading } = useSWR(
//     () => categoryName ? `/api/similarads?name=${encodeURIComponent(categoryName)}&location=Ghana` : null,
//     fetcher,
//     {
//       revalidateOnFocus: false,
//       revalidateIfStale: false,
//       dedupingInterval: 3600000, // 1 hour
//       refreshInterval: 0, 
//       refreshWhenHidden: false,
//       refreshWhenOffline: false, 
//       shouldRetryOnError: true,
//       errorRetryCount: 3
//     }
//   );

//   const handleProductClick = (product: Product) => {
//     if (product._id?.$oid) {
//       localStorage.setItem('selectedProductId', product._id.$oid);
//       router.push('/ProductDetails');
//     }
//   };
  
//   const getImageUrl = (imageLink: string) => {
//     if (!imageLink) return '/s21.png';

//     let url = imageLink.replace("image.", "images.");

//     if (!url.match(/\/\d+\/\d+$/)) {
//       url = url.replace(/\/$/, '');
//       url = `${url}/500/500`;
//     }

//     return url;
//   };
  
//   const renderStars = (rating: number = 4) => {
//     return [...Array(5)].map((_, index) => (
//       <span key={index} className={index < rating ? "text-yellow-500" : "text-gray-300"}>
//         <FaStar />
//       </span>
//     ));
//   };

//   if (productLoading || isLoading) {
//     return (
//       <div className="text-center py-8">Loading related products...</div>
//     );
//   }
  
//   if (productError || error) {
//     return (
//       <div className="text-center text-red-500 py-8">
//         Failed to load related products.
//       </div>
//     );
//   }
  
//   if (!products || !products.length) {
//     return (
//       <div className="text-center py-8">No related products found.</div>
//     );
//   }

//   return (
//     <div className="max-w-8xl mx-auto p-2 sm:px-6 md:px-52 lg:px-52">
//       <h2 className="text-xl sm:text-2xl font-semibold mb-4">Related Products</h2>
//       <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
//         {products.map((product: Product) => (
//           <div
//             key={product.pageid || product._id?.$oid}
//             onClick={() => handleProductClick(product)}
//             className="bg-white p-3 rounded-md shadow-sm border border-gray-200 hover:bg-gray-100 hover:shadow-md hover:scale-105 transition-all duration-300 cursor-pointer"
//           >
//             <div className="relative">
//               {/* Badge for Promoted */}
//               {product.promoted === "Yes" && (
//                 <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
//                   PROMOTED
//                 </span>
//               )}
              
//               <div className="aspect-[4/3] w-full relative overflow-hidden mb-2 rounded-md">
//                 <Image
//                   src={getImageUrl(product.image[0]?.image_link || '')}
//                   alt={product.title}
//                   fill
//                   className="object-cover"
//                   priority={products.indexOf(product) < 4}
//                   sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
//                   onError={(e) => {
//                     (e.target as HTMLImageElement).src = '/f4.png';
//                   }}
//                 />
//               </div>
//             </div>
            
//             <div className="mt-3 sm:mt-4">
//               <div className="flex items-center">
//                 {renderStars()}
//                 <span className="text-gray-600 ml-2 text-xs sm:text-sm">
//                   ({product.pageview || 0})
//                 </span>
//               </div>
              
//               <p className="text-gray-700 mt-1 sm:mt-2 text-sm sm:text-base truncate">
//                 {product.title}
//               </p>
//               <p className="text-gray-500 text-xs line-clamp-2 overflow-hidden text-ellipsis mb-2">
//                 {product.description}
//               </p>
//               <div className="mt-3">
//                 <p className="text-gray-500 text-xs mb-2 flex items-center">
//                   <FaMapMarkerAlt className="mr-1 text-orange-500" size={12} />
//                   {product.location}
//                 </p>
//                 <p className="text-orange-500 font-bold">
//                   {product.price && product.price !== 'N/A' 
//                     ? `₵${parseInt(product.price.replace(/[^0-9]/g, '')).toLocaleString()}`
//                     : ''}
//                 </p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RelatedProducts;

// "use client";
// import Image from 'next/image';
// import { FaStar } from 'react-icons/fa';

// const products = [
//   {
//     id: 1,
//     name: "Amazon Basics High-Speed HDMI Cable (18 Gbps, 4K/6...",
//     price: 360,
//     rating: 4,
//     reviews: 994,
//     image: "/s1.png",
//     badge: { text: "BEST DEALS", color: "bg-blue-500" }
//   },
//   {
//     id: 2,
//     name: "Portable Washing Machine, 11lbs capacity Model 18NMF...",
//     price: 80,
//     rating: 4,
//     reviews: 798,
//     image: "/s2.png"
//   },
//   {
//     id: 3,
//     name: "TOZO T6 True Wireless Earbuds Bluetooth Headphon...",
//     price: 70,
//     rating: 4,
//     reviews: 600,
//     image: "/s3.png",
//     badge: { text: "HOT", color: "bg-red-500" }
//   },
//   {
//     id: 4,
//     name: "Dell Optiplex 7000x7480 All-in-One Computer Monitor",
//     price: 250,
//     rating: 4,
//     reviews: 492,
//     image: "/s4.png"
//   },
//   {
//     id: 5,
//     name: "Samsung Electronics Samsung Galaxy S21 5G",
//     price: 2300,
//     rating: 4,
//     reviews: 740,
//     image: "/s5.png"
//   },
//   {
//     id: 6,
//     name: "4K UHD LED Smart TV with Chromecast Built-in",
//     price: 220,
//     rating: 4,
//     reviews: 556,
//     image: "/s6.png",
//     badge: { text: "SALE", color: "bg-green-500" }
//   },
//   {
//     id: 7,
//     name: "Wired Over-Ear Gaming Headphones with USB",
//     price: 1500,
//     rating: 4,
//     reviews: 536,
//     image: "/s19.png"
//   },
//   {
//     id: 8,
//     name: "Polaroid 57-Inch Photo/Video Tripod with Deluxe Tripod Ca...",
//     price: 1200,
//     rating: 4,
//     reviews: 423,
//     image: "/s8.png",
//     badge: { text: "25% OFF", color: "bg-yellow-500" },
//     originalPrice: 1600
//   }
// ];

// const RelatedProducts = () => {
//   return (
//     <div className="max-w-8xl mx-auto p-2 sm:px-6 md:px-52 lg:px-52 px-52">
//       <h2 className="text-xl sm:text-2xl font-semibold mb-4">Related products</h2>
//       <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
//         {products.map((product) => (
//           <div key={product.id} className="bg-white p-3 rounded-sm shadow-sm border border-gray-200 hover:bg-gray-100 hover:shadow-md transition-all duration-300">
//             <div className="relative">
//               {product.badge && (
//                 <span className={`absolute top-2 left-2 ${product.badge.color} text-white text-xs font-bold px-2 py-1 rounded`}>
//                   {product.badge.text}
//                 </span>
//               )}
//               <Image
//                 src={product.image}
//                 alt={product.name}
//                 width={200}
//                 height={200}
//                 className="w-full h-32 sm:h-40 md:h-48 object-contain rounded-t-md"
//               />
//             </div>
//             <div className="mt-3 sm:mt-4">
//               <div className="flex items-center">
//                 {[...Array(5)].map((_, index) => (
//                   <span
//                     key={index}
//                     className={index < product.rating ? "text-orange-500" : "text-gray-300"}
//                   >
//                     <FaStar />
//                   </span>
//                 ))}
//                 <span className="text-gray-600 ml-2 text-xs sm:text-sm">({product.reviews})</span>
//               </div>
//               <p className="text-gray-700 mt-1 sm:mt-2 text-sm sm:text-base truncate">{product.name}</p>
//               {product.originalPrice && (
//                 <p className="text-gray-500 line-through text-xs sm:text-sm">${product.originalPrice}</p>
//               )}
//               <p className="text-blue-500 mt-1 sm:mt-2 text-sm sm:text-base font-medium">${product.price}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RelatedProducts;
