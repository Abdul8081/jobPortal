import React from 'react';

const Logo = ({ className = '', size = 32 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Gradient definitions */}
      <defs>
        <linearGradient id="jobGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#0891b2" />
        </linearGradient>
        <linearGradient id="jobGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ea580c" />
          <stop offset="100%" stopColor="#db2777" />
        </linearGradient>
        <linearGradient id="jobGradient3" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0d9488" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
      </defs>
      
      {/* Job portal elements */}
      <g>
        {/* Outer circle border */}
        <circle
          cx="24"
          cy="24"
          r="22"
          stroke="url(#jobGradient1)"
          strokeWidth="2.5"
          fill="none"
          opacity="0.6"
        />
        
        {/* Briefcase body */}
        <rect
          x="12"
          y="20"
          width="24"
          height="16"
          rx="2"
          fill="url(#jobGradient1)"
          opacity="1"
        />
        
        {/* Briefcase darker outline for contrast */}
        <rect
          x="12"
          y="20"
          width="24"
          height="16"
          rx="2"
          stroke="#1e40af"
          strokeWidth="1"
          fill="none"
          opacity="0.5"
        />
        
        {/* Briefcase handle */}
        <path
          d="M18 20 L18 16 C18 14.5 19 14 20 14 L28 14 C29 14 30 14.5 30 16 L30 20"
          stroke="url(#jobGradient3)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        
        {/* Briefcase lock/clasp */}
        <rect
          x="22"
          y="24"
          width="4"
          height="6"
          rx="1"
          fill="#fbbf24"
          stroke="#d97706"
          strokeWidth="0.5"
          opacity="1"
        />
        
        {/* Search magnifying glass overlay */}
        <circle
          cx="33"
          cy="15"
          r="5"
          stroke="url(#jobGradient2)"
          strokeWidth="2.5"
          fill="#fef3c7"
        />
        <line
          x1="37"
          y1="19"
          x2="40"
          y2="22"
          stroke="url(#jobGradient2)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        
        {/* Upward arrow (career growth) */}
        <path
          d="M24 28 L24 32 M24 28 L22 30 M24 28 L26 30"
          stroke="#fbbf24"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Connection dots */}
        <circle cx="15" cy="12" r="2.5" fill="url(#jobGradient2)" opacity="1" />
        <circle cx="9" cy="18" r="2.5" fill="url(#jobGradient3)" opacity="1" />
        <circle cx="12" cy="38" r="2.5" fill="url(#jobGradient1)" opacity="0.9" />
        
        {/* Connecting lines for network effect */}
        <line x1="15" y1="12" x2="18" y2="20" stroke="url(#jobGradient2)" strokeWidth="1.5" opacity="0.7" />
        <line x1="9" y1="18" x2="12" y2="20" stroke="url(#jobGradient3)" strokeWidth="1.5" opacity="0.7" />
      </g>
    </svg>
  );
};

export default Logo;
