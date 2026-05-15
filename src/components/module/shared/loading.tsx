'use client';

export default function Loading() {
  return (
    <div className=" animate-pulse">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-2"></div>
          <div className="h-4 w-64 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        </div>
        <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map(i => (
          <div
            key={i}
            className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800"
          >
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
            <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        ))}
      </div>

      {/* Table Skeleton */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-800">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="p-4">
              <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
// ('use client');

// export default function Loading() {
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
//       <div className="text-center">
//         {/* Simple Spinner with your gradient */}
//         <div className="relative w-16 h-16 mx-auto mb-4">
//           <div className="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-gray-700"></div>
//           <div
//             className="absolute inset-0 rounded-full border-4 border-transparent
//                         border-t-[#6efd0b] border-r-[#8bff3a] animate-spin"
//           ></div>
//         </div>

//         <p className="text-gray-600 dark:text-gray-300 animate-pulse">
//           Loading...
//         </p>
//       </div>
//     </div>
//   );
// }
