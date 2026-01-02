// 'use client';

// import React, { useState } from 'react';
// import { 
//   MobileCategoryPage, 
//   CategoryData, 
//   Subcategory, 
//   ChildCategory,
//   defaultCategories 
// } from './index';

// const DemoPage: React.FC = () => {
//   const [selectedCategory, setSelectedCategory] = useState<CategoryData | null>(null);
//   const [selectedSubcategory, setSelectedSubcategory] = useState<Subcategory | null>(null);
//   const [selectedChildCategory, setSelectedChildCategory] = useState<ChildCategory | null>(null);
//   const [demoLog, setDemoLog] = useState<string[]>([]);

//   const addToLog = (message: string) => {
//     setDemoLog(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
//   };

//   const handleCategorySelect = (category: CategoryData) => {
//     setSelectedCategory(category);
//     addToLog(`Category selected: ${category.name}`);
//   };

//   const handleSubcategorySelect = (subcategory: Subcategory) => {
//     setSelectedSubcategory(subcategory);
//     addToLog(`Subcategory selected: ${subcategory.name}`);
//   };

//   const handleChildCategorySelect = (childCategory: ChildCategory) => {
//     setSelectedChildCategory(childCategory);
//     addToLog(`Child category selected: ${childCategory.name}`);
//   };

//   const clearLog = () => {
//     setDemoLog([]);
//   };

//   const resetSelections = () => {
//     setSelectedCategory(null);
//     setSelectedSubcategory(null);
//     setSelectedChildCategory(null);
//     addToLog('All selections cleared');
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-gray-900 mb-4">
//             MobileCategoryPage Demo
//           </h1>
//           <p className="text-lg text-gray-600">
//             Interactive demo of the modular category selection components
//           </p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Component Demo */}
//           <div className="bg-white rounded-lg shadow-lg p-6">
//             <h2 className="text-2xl font-semibold mb-4">Component Demo</h2>
//             <div className="border rounded-lg p-4 bg-gray-50">
//               <MobileCategoryPage
//                 onCategorySelect={handleCategorySelect}
//                 onSubcategorySelect={handleSubcategorySelect}
//                 onChildCategorySelect={handleChildCategorySelect}
//                 categories={defaultCategories}
//               />
//             </div>
//           </div>

//           {/* Selection Display */}
//           <div className="bg-white rounded-lg shadow-lg p-6">
//             <h2 className="text-2xl font-semibold mb-4">Current Selections</h2>
            
//             <div className="space-y-4">
//               {/* Category Selection */}
//               <div className="border rounded-lg p-4">
//                 <h3 className="font-semibold text-gray-700 mb-2">Selected Category:</h3>
//                 {selectedCategory ? (
//                   <div className="bg-blue-50 p-3 rounded">
//                     <p className="font-medium">{selectedCategory.name}</p>
//                     <p className="text-sm text-gray-600">{selectedCategory.description}</p>
//                   </div>
//                 ) : (
//                   <p className="text-gray-500 italic">No category selected</p>
//                 )}
//               </div>

//               {/* Subcategory Selection */}
//               <div className="border rounded-lg p-4">
//                 <h3 className="font-semibold text-gray-700 mb-2">Selected Subcategory:</h3>
//                 {selectedSubcategory ? (
//                   <div className="bg-green-50 p-3 rounded">
//                     <p className="font-medium">{selectedSubcategory.name}</p>
//                     {selectedSubcategory.description && (
//                       <p className="text-sm text-gray-600">{selectedSubcategory.description}</p>
//                     )}
//                   </div>
//                 ) : (
//                   <p className="text-gray-500 italic">No subcategory selected</p>
//                 )}
//               </div>

//               {/* Child Category Selection */}
//               <div className="border rounded-lg p-4">
//                 <h3 className="font-semibold text-gray-700 mb-2">Selected Child Category:</h3>
//                 {selectedChildCategory ? (
//                   <div className="bg-purple-50 p-3 rounded">
//                     <p className="font-medium">{selectedChildCategory.name}</p>
//                     {selectedChildCategory.description && (
//                       <p className="text-sm text-gray-600">{selectedChildCategory.description}</p>
//                     )}
//                   </div>
//                 ) : (
//                   <p className="text-gray-500 italic">No child category selected</p>
//                 )}
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="mt-6 space-y-2">
//               <button
//                 onClick={resetSelections}
//                 className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors"
//               >
//                 Reset All Selections
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Event Log */}
//         <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-2xl font-semibold">Event Log</h2>
//             <button
//               onClick={clearLog}
//               className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition-colors"
//             >
//               Clear Log
//             </button>
//           </div>
          
//           <div className="border rounded-lg p-4 bg-gray-50 h-64 overflow-y-auto">
//             {demoLog.length > 0 ? (
//               <div className="space-y-1">
//                 {demoLog.map((log, index) => (
//                   <div key={index} className="text-sm font-mono bg-white p-2 rounded border">
//                     {log}
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-500 italic">No events logged yet. Try interacting with the categories!</p>
//             )}
//           </div>
//         </div>

//         {/* Features Showcase */}
//         <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
//           <h2 className="text-2xl font-semibold mb-4">Features</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             <div className="border rounded-lg p-4">
//               <h3 className="font-semibold text-blue-600 mb-2">🎨 Modern Design</h3>
//               <p className="text-sm text-gray-600">Clean, responsive UI with smooth animations</p>
//             </div>
//             <div className="border rounded-lg p-4">
//               <h3 className="font-semibold text-green-600 mb-2">♿ Accessibility</h3>
//               <p className="text-sm text-gray-600">Full keyboard navigation and screen reader support</p>
//             </div>
//             <div className="border rounded-lg p-4">
//               <h3 className="font-semibold text-purple-600 mb-2">📱 Mobile-First</h3>
//               <p className="text-sm text-gray-600">Optimized for mobile devices with touch interactions</p>
//             </div>
//             <div className="border rounded-lg p-4">
//               <h3 className="font-semibold text-orange-600 mb-2">🔧 Modular</h3>
//               <p className="text-sm text-gray-600">Separated concerns with reusable components</p>
//             </div>
//             <div className="border rounded-lg p-4">
//               <h3 className="font-semibold text-red-600 mb-2">🎯 TypeScript</h3>
//               <p className="text-sm text-gray-600">Fully typed for better development experience</p>
//             </div>
//             <div className="border rounded-lg p-4">
//               <h3 className="font-semibold text-indigo-600 mb-2">🚀 Performance</h3>
//               <p className="text-sm text-gray-600">Optimized with React hooks and efficient rendering</p>
//             </div>
//           </div>
//         </div>

//         {/* Usage Instructions */}
//         <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
//           <h2 className="text-2xl font-semibold mb-4">How to Use</h2>
//           <div className="space-y-4">
//             <div>
//               <h3 className="font-semibold text-gray-700 mb-2">1. Click on a Category</h3>
//               <p className="text-gray-600">Click on either &quot;Services&quot; or &quot;Buy & Sell&quot; to open the dropdown</p>
//             </div>
//             <div>
//               <h3 className="font-semibold text-gray-700 mb-2">2. Select a Subcategory</h3>
//               <p className="text-gray-600">Choose from the list of subcategories in the dropdown</p>
//             </div>
//             <div>
//               <h3 className="font-semibold text-gray-700 mb-2">3. Explore Child Categories</h3>
//               <p className="text-gray-600">Click on "More Options" to see additional child categories</p>
//             </div>
//             <div>
//               <h3 className="font-semibold text-gray-700 mb-2">4. Keyboard Navigation</h3>
//               <p className="text-gray-600">Use Tab to navigate, Enter/Space to select, and Escape to close</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DemoPage; 