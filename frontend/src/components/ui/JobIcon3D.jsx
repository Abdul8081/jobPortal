import React from 'react';
import { Briefcase } from 'lucide-react';

/**
 * JobIcon3D - Fallback component for 3D model
 * A simple animated SVG icon that can be used as a lightweight alternative
 */
const JobIcon3D = ({ className = '' }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="relative">
        {/* Animated background circles */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-64 h-64 bg-purple-200 dark:bg-purple-900/30 rounded-full animate-pulse"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-48 h-48 bg-purple-300 dark:bg-purple-800/40 rounded-full animate-pulse delay-75"></div>
        </div>
        
        {/* Main icon */}
        <div className="relative z-10 p-12">
          <Briefcase 
            className="w-32 h-32 text-purple-600 dark:text-purple-400 animate-bounce" 
            strokeWidth={1.5}
          />
        </div>
      </div>
    </div>
  );
};

export default JobIcon3D;
