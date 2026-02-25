// app/not-found.tsx

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-300 dark:bg-indigo-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main content */}
      <div className="text-center max-w-xl relative">
        {/* Construction icon with animation */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-yellow-400 dark:bg-yellow-600 rounded-full opacity-20 animate-ping"></div>
          </div>
          <div className="relative flex items-center justify-center">
            <div className="text-8xl transform animate-bounce">🚧</div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-24 h-24 border-4 border-yellow-400 dark:border-yellow-500 rounded-full border-t-transparent animate-spin"></div>
            </div>
          </div>
        </div>

        {/* Main heading */}
        <h1 className="text-5xl md:text-7xl font-bold mb-4">
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 text-transparent bg-clip-text bg-[length:200%] animate-gradient">
            Under Construction
          </span>
        </h1>

        {/* Subtitle with typing effect */}
        <div className="text-gray-600 dark:text-gray-300 text-xl mb-8">
          <p className="leading-relaxed">
            We're building something{' '}
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              amazing
            </span>{' '}
            for you
          </p>
        </div>

        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
            <span>Progress</span>
            <span>75%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 h-2.5 rounded-full w-3/4 animate-progress"></div>
          </div>
        </div>

        {/* Construction workers (SVG icons) */}
        <div className="flex justify-center space-x-6 mb-8">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
            <span className="text-2xl animate-bounce animation-delay-100">
              👷
            </span>
          </div>
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
            <span className="text-2xl animate-bounce animation-delay-200">
              👷‍♀️
            </span>
          </div>
          <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center">
            <span className="text-2xl animate-bounce animation-delay-300">
              🔨
            </span>
          </div>
        </div>

        {/* Description card */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-gray-200 dark:border-gray-700 mb-8 transform hover:scale-105 transition-transform duration-300">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse animation-delay-200"></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse animation-delay-400"></div>
            </div>

            <p className="text-gray-600 dark:text-gray-300 text-lg">
              We're working hard to bring you an amazing experience. Our team of
              digital architects and designers are crafting something special.
            </p>

            {/* Estimated completion */}
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-gray-400 dark:text-gray-500">🎯</span>
              <span className="text-gray-600 dark:text-gray-400">
                Coming soon: Q2 2024
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
