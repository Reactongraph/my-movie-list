interface ScreenLoaderProps {
    isLoading?: boolean
  }
  
  export function ScreenLoader({ isLoading = true }: ScreenLoaderProps) {
    if (!isLoading) return null
  
    return (
      <div className="fixed inset-0 bg-[#0a192f] z-50 flex flex-col items-center justify-center">
        {/* Main loader animation */}
        <div className="relative w-24 h-24">
          {/* Outer circle */}
          <div className="absolute inset-0 border-4 border-t-emerald-400 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" />
          {/* Middle circle */}
          <div className="absolute inset-2 border-4 border-r-emerald-400 border-t-transparent border-b-transparent border-l-transparent rounded-full animate-spin-slow" />
          {/* Inner circle */}
          <div className="absolute inset-4 border-4 border-b-emerald-400 border-r-transparent border-t-transparent border-l-transparent rounded-full animate-spin" />
        </div>
        
        {/* Loading text */}
        <div className="mt-8 text-emerald-400 text-lg font-medium">
          Loading
          <span className="inline-flex animate-pulse">
            <span className="mx-0.5">.</span>
            <span className="mx-0.5 animate-delay-200">.</span>
            <span className="mx-0.5 animate-delay-400">.</span>
          </span>
        </div>
      </div>
    )
  }
  
  