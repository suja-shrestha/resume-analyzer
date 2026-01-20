import React, { useState, useEffect } from 'react';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  // Optimized progress logic - faster fill for snappier feel
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 5 : 100));
    }, 10);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center">
      {/* Minimalist AI Animation - replaced with a simple CSS spinner */}
      <div className="w-32 h-32 mb-6 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>
      </div>

      {/* Clean Text */}
      <h2 className="text-lg font-medium text-gray-800 mb-4">
        Initializing AI Engine
      </h2>

      {/* Simple Progress Bar */}
      <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gray-800 transition-all duration-200"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <p className="mt-2 text-sm text-gray-500">
        {progress}%
      </p>

      {/* Subtle Branding */}
      <div className="absolute bottom-6 text-xs text-gray-400">
        SkillSight AI v2.0
      </div>
    </div>
  );
}