// import { useEffect, useRef, useState } from 'react';
// import { Check } from 'lucide-react';

// const themes = [
//   {
//     name: 'Light',
//     primaryColor: '#5565e8',
//     colors: ['#fff', '#0d1a3b', '#dbe3f7', '#0d1a3b', '#5565e8'],
//   },
//   {
//     name: 'Dark',
//     primaryColor: '#18f2e5',
//     colors: ['#011627', '#607b96', '#0d1a3b', '#5565e8', '#18f2e5'],
//   },
//   {
//     name: 'Aqua',
//     primaryColor: '#00c1d4',
//     colors: ['#b2e4e8', '#004a55', '#00c1d4', '#004a55', '#ff6f61'],
//   },
//   {
//     name: 'Retro',
//     primaryColor: '#ffab40',
//     colors: ['#fff3e0', '#6d4c41', '#ffcc80', '#5d4037', '#ffab40'],
//   },
// ];

// const ThemeMenu = () => {
//   const [theme, setTheme] = useState('dark');
//   const [showThemeMenu, setShowThemeMenu] = useState(false);
//   const menuRef = useRef(null);

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const savedTheme = localStorage.getItem('theme') || 'dark';
//       setTheme(savedTheme);
//       document.documentElement.setAttribute('data-theme', savedTheme);
//     }
//   }, []);

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       document.documentElement.setAttribute('data-theme', theme);
//     }
//   }, [theme]);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (menuRef.current && !menuRef.current.contains(event.target)) {
//         setShowThemeMenu(false);
//       }
//     };

//     if (showThemeMenu) {
//       document.addEventListener('mousedown', handleClickOutside);
//       document.addEventListener('touchstart', handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//       document.removeEventListener('touchstart', handleClickOutside);
//     };
//   }, [showThemeMenu]);

//   const changeTheme = (themeName) => {
//     if (typeof window !== 'undefined') {
//       setTheme(themeName);
//       localStorage.setItem('theme', themeName);
//     }
//   };

//   return (
//     <div 
//       ref={menuRef} 
//       className="fixed right-3 bottom-3 xs:right-4 xs:bottom-4 sm:right-6 sm:bottom-6 md:right-8 md:bottom-8 lg:right-11 lg:bottom-11 z-50"
//     >
//       {/* Floating Button */}
//       <button
//         onClick={() => setShowThemeMenu(!showThemeMenu)}
//         className="cursor-pointer rounded-full p-1.5 xs:p-2 sm:p-2.5 md:p-3 shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center"
//         style={{ backgroundColor: 'var(--bg-tertiary)' }}
//         aria-label="Toggle theme menu"
//       >
//         <div 
//           className="grid grid-cols-2 place-content-center gap-0.5 rounded-full p-1.5 xs:p-2 sm:p-2.5"
//           style={{ backgroundColor: 'var(--bg-primary)' }}
//         >
//           <div className="w-[8px] h-[8px] xs:w-[9px] xs:h-[9px] sm:w-[10px] sm:h-[10px] md:w-[11px] md:h-[11px] rounded-full aspect-square bg-[#B13753]"></div>
//           <div className="w-[8px] h-[8px] xs:w-[9px] xs:h-[9px] sm:w-[10px] sm:h-[10px] md:w-[11px] md:h-[11px] rounded-full aspect-square bg-[#BAA32B]"></div>
//           <div className="w-[8px] h-[8px] xs:w-[9px] xs:h-[9px] sm:w-[10px] sm:h-[10px] md:w-[11px] md:h-[11px] rounded-full aspect-square bg-[#3178C6]"></div>
//           <div className="w-[8px] h-[8px] xs:w-[9px] xs:h-[9px] sm:w-[10px] sm:h-[10px] md:w-[11px] md:h-[11px] rounded-full aspect-square bg-[#50B359]"></div>
//         </div>
//       </button>

//       {/* Theme Menu Dropdown - Vertical Rectangular Layout */}
//       {showThemeMenu && (
//         <div 
//           className="animate-in fade-in slide-in-from-bottom-2 duration-200 absolute right-0 bottom-full mb-3 xs:mb-4 sm:mb-5 rounded-2xl border shadow-2xl p-3 xs:p-4 sm:p-5 md:p-6"
//           style={{ 
//             backgroundColor: 'var(--bg-secondary)', 
//             borderColor: 'var(--border-color)' 
//           }}
//         >
//           {/* Vertical Theme Buttons */}
//           <div className="flex flex-col gap-3 xs:gap-4 sm:gap-5">
//             {themes.map(({ name, primaryColor }) => (
//               <button
//                 key={name}
//                 onClick={() => changeTheme(name.toLowerCase())}
//                 className="relative group cursor-pointer active:scale-95 transition-all duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center"
//                 aria-label={`Select ${name} theme`}
//               >
//                 {/* Circular Button */}
//                 <div
//                   style={{ 
//                     backgroundColor: primaryColor,
//                     boxShadow: name.toLowerCase() === theme 
//                       ? `0 0 0 3px var(--bg-secondary), 0 0 0 5px ${primaryColor}` 
//                       : '0 4px 6px rgba(0, 0, 0, 0.1)'
//                   }}
//                   className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 rounded-full aspect-square flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-active:scale-95"
//                 >
//                   {/* Check Icon for Active Theme */}
//                   {name.toLowerCase() === theme && (
//                     <Check 
//                       className="h-5 w-5 xs:h-6 xs:w-6 sm:h-7 sm:w-7 text-white drop-shadow-lg" 
//                     />
//                   )}
//                 </div>
//               </button>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ThemeMenu;


import { useEffect, useRef, useState } from 'react';
import { Check } from 'lucide-react';

const themes = [
  {
    name: 'Light',
    primaryColor: '#fff',
    borderColor: '#000000', // Black border for Light theme
    colors: ['#fff', '#0d1a3b', '#dbe3f7', '#0d1a3b', '#5565e8'],
  },
  {
    name: 'Dark',
    primaryColor: '#0d1a3b',
    borderColor: '#ffffff', // White border for Dark theme
    colors: ['#011627', '#607b96', '#0d1a3b', '#5565e8', '#18f2e5'],
  },
  {
    name: 'Aqua',
    primaryColor: '#00c1d4',
    borderColor: '#000000', // Black border for Aqua theme
    colors: ['#b2e4e8', '#004a55', '#00c1d4', '#004a55', '#ff6f61'],
  },
  {
    name: 'Retro',
    primaryColor: '#ffab40',
    borderColor: '#ffffff', // White border for Retro theme
    colors: ['#fff3e0', '#6d4c41', '#ffcc80', '#5d4037', '#ffab40'],
  },
];

const ThemeMenu = () => {
  const [theme, setTheme] = useState('dark');
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') || 'dark';
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowThemeMenu(false);
      }
    };

    if (showThemeMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [showThemeMenu]);

  const changeTheme = (themeName) => {
    if (typeof window !== 'undefined') {
      setTheme(themeName);
      localStorage.setItem('theme', themeName);
    }
  };

  return (
    <div 
      ref={menuRef} 
      className="fixed right-3 bottom-3 xs:right-4 xs:bottom-4 sm:right-6 sm:bottom-6 md:right-8 md:bottom-8 lg:right-11 lg:bottom-11 z-50"
    >
      {/* Floating Button */}
      <button
        onClick={() => setShowThemeMenu(!showThemeMenu)}
        className="cursor-pointer rounded-full p-1.5 xs:p-2 sm:p-2.5 md:p-3 shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center"
        style={{ backgroundColor: 'var(--bg-tertiary)' }}
        aria-label="Toggle theme menu"
      >
        <div 
          className="grid grid-cols-2 place-content-center gap-0.5 rounded-full p-1.5 xs:p-2 sm:p-2.5"
          style={{ backgroundColor: 'var(--bg-primary)' }}
        >
          <div className="w-[8px] h-[8px] xs:w-[9px] xs:h-[9px] sm:w-[10px] sm:h-[10px] md:w-[11px] md:h-[11px] rounded-full aspect-square bg-[#B13753]"></div>
          <div className="w-[8px] h-[8px] xs:w-[9px] xs:h-[9px] sm:w-[10px] sm:h-[10px] md:w-[11px] md:h-[11px] rounded-full aspect-square bg-[#BAA32B]"></div>
          <div className="w-[8px] h-[8px] xs:w-[9px] xs:h-[9px] sm:w-[10px] sm:h-[10px] md:w-[11px] md:h-[11px] rounded-full aspect-square bg-[#3178C6]"></div>
          <div className="w-[8px] h-[8px] xs:w-[9px] xs:h-[9px] sm:w-[10px] sm:h-[10px] md:w-[11px] md:h-[11px] rounded-full aspect-square bg-[#50B359]"></div>
        </div>
      </button>

      {/* Theme Menu Dropdown - Vertical Rectangular Layout */}
      {showThemeMenu && (
        <div 
          className="animate-in fade-in slide-in-from-bottom-2 duration-200 absolute right-0 bottom-full mb-3 xs:mb-4 sm:mb-5 rounded-2xl border shadow-2xl p-3 xs:p-4 sm:p-5 md:p-6"
          style={{ 
            backgroundColor: 'var(--bg-secondary)', 
            borderColor: 'var(--border-color)' 
          }}
        >
          {/* Vertical Theme Buttons */}
          <div className="flex flex-col gap-3 xs:gap-4 sm:gap-5">
            {themes.map(({ name, primaryColor, borderColor }) => (
              <button
                key={name}
                onClick={() => changeTheme(name.toLowerCase())}
                className="relative group cursor-pointer active:scale-95 transition-all duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label={`Select ${name} theme`}
              >
                {/* Circular Button with Theme-Specific Border */}
                <div
                  style={{ 
                    backgroundColor: primaryColor,
                    border: `3px solid ${borderColor}`,
                    boxShadow: name.toLowerCase() === theme 
                      ? `0 0 0 3px var(--bg-secondary), 0 0 0 6px ${primaryColor}` 
                      : '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                  className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 rounded-full aspect-square flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-active:scale-95"
                >
                  {/* Check Icon for Active Theme */}
                  {name.toLowerCase() === theme && (
                    <Check 
                      className="h-5 w-5 xs:h-6 xs:w-6 sm:h-7 sm:w-7 text-white drop-shadow-lg" 
                    />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeMenu;
