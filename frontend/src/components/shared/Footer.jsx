// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Github, Linkedin, Twitter } from 'lucide-react';
// import ShuffleText from './ShuffleText';
// import Logo from './Logo';

// const Footer = () => {
//   return (
//     <footer
//       className="border-t w-full overflow-x-hidden"
//       style={{
//         backgroundColor: 'var(--bg-secondary)',
//         borderColor: 'var(--border-color)'
//       }}
//     >
//       <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-6 xs:py-8 sm:py-10 md:py-12">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xs:gap-8 md:gap-10 mb-6 xs:mb-8 md:mb-10">
//           {/* Brand Section */}
//           <div className="col-span-1 sm:col-span-2 lg:col-span-1">
//             <h2
//               className="text-xl xs:text-2xl font-bold mb-2 xs:mb-3"
//               style={{ color: 'var(--text-primary)' }}
//             >
//               {/* Logo and Name */}
//               <div className="flex items-center gap-2 xs:gap-3">
//                 <Logo size={32} className="flex-shrink-0 xs:w-9 xs:h-9 sm:w-10 sm:h-10" />
//                 <div className="block">
//                   <ShuffleText
//                     text="JobPortal"
//                     className="text-lg xs:text-xl sm:text-2xl font-bold bg-gradient-to-r from-[hsl(222.2deg,30.47%,55.61%)] to-cyan-500 bg-clip-text text-transparent"
//                   />
//                 </div>
//               </div>
//             </h2>
//             <p
//               className="text-xs xs:text-sm md:text-base mb-3 xs:mb-4 max-w-sm leading-relaxed"
//               style={{ color: 'var(--text-secondary)' }}
//             >
//               Your trusted partner in finding the perfect career opportunity.
//               Connect with top employers and land your dream job.
//             </p>
//             <div className="flex space-x-3 xs:space-x-4">
//               <a
//                 href="https://github.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="transition-all hover:opacity-70 hover:scale-110"
//                 style={{ color: 'var(--text-secondary)' }}
//                 aria-label="GitHub"
//               >
//                 <Github className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6" />
//               </a>
//               <a
//                 href="https://linkedin.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="transition-all hover:opacity-70 hover:scale-110"
//                 style={{ color: 'var(--text-secondary)' }}
//                 aria-label="LinkedIn"
//               >
//                 <Linkedin className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6" />
//               </a>
//               <a
//                 href="https://twitter.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="transition-all hover:opacity-70 hover:scale-110"
//                 style={{ color: 'var(--text-secondary)' }}
//                 aria-label="Twitter"
//               >
//                 <Twitter className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6" />
//               </a>
//             </div>
//           </div>

//           {/* For Job Seekers */}
//           <div>
//             <h3
//               className="font-semibold mb-3 xs:mb-4 text-sm xs:text-base md:text-lg"
//               style={{ color: 'var(--text-primary)' }}
//             >
//               For Job Seekers
//             </h3>
//             <ul className="space-y-1.5 xs:space-y-2 md:space-y-2.5 text-xs xs:text-sm md:text-base">
//               <li>
//                 <Link
//                   to="/"
//                   className="transition-colors hover:opacity-70 inline-block"
//                   style={{ color: 'var(--text-secondary)' }}
//                 >
//                   Home
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/jobs"
//                   className="transition-colors hover:opacity-70 inline-block"
//                   style={{ color: 'var(--text-secondary)' }}
//                 >
//                   Find Jobs
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/browse"
//                   className="transition-colors hover:opacity-70 inline-block"
//                   style={{ color: 'var(--text-secondary)' }}
//                 >
//                   Browse Companies
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/profile"
//                   className="transition-colors hover:opacity-70 inline-block"
//                   style={{ color: 'var(--text-secondary)' }}
//                 >
//                   My Profile
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* For Employers */}
//           <div>
//             <h3
//               className="font-semibold mb-3 xs:mb-4 text-sm xs:text-base md:text-lg"
//               style={{ color: 'var(--text-primary)' }}
//             >
//               For Employers
//             </h3>
//             <ul className="space-y-1.5 xs:space-y-2 md:space-y-2.5 text-xs xs:text-sm md:text-base">
//               <li>
//                 <Link
//                   to="/admin/companies"
//                   className="transition-colors hover:opacity-70 inline-block"
//                   style={{ color: 'var(--text-secondary)' }}
//                 >
//                   Post a Job
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/admin/jobs"
//                   className="transition-colors hover:opacity-70 inline-block"
//                   style={{ color: 'var(--text-secondary)' }}
//                 >
//                   Manage Jobs
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/admin/companies"
//                   className="transition-colors hover:opacity-70 inline-block"
//                   style={{ color: 'var(--text-secondary)' }}
//                 >
//                   Company Profile
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Company */}
//           <div>
//             <h3
//               className="font-semibold mb-3 xs:mb-4 text-sm xs:text-base md:text-lg"
//               style={{ color: 'var(--text-primary)' }}
//             >
//               Company
//             </h3>
//             <ul className="space-y-1.5 xs:space-y-2 md:space-y-2.5 text-xs xs:text-sm md:text-base">
//               <li>
//                 <a
//                   href="#"
//                   className="transition-colors hover:opacity-70 inline-block"
//                   style={{ color: 'var(--text-secondary)' }}
//                 >
//                   About Us
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#"
//                   className="transition-colors hover:opacity-70 inline-block"
//                   style={{ color: 'var(--text-secondary)' }}
//                 >
//                   Contact
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#"
//                   className="transition-colors hover:opacity-70 inline-block"
//                   style={{ color: 'var(--text-secondary)' }}
//                 >
//                   Privacy Policy
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#"
//                   className="transition-colors hover:opacity-70 inline-block"
//                   style={{ color: 'var(--text-secondary)' }}
//                 >
//                   Terms of Service
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* Bottom Bar */}
//         <div
//           className="pt-6 xs:pt-8 border-t"
//           style={{ borderColor: 'var(--border-color)' }}
//         >
//           <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 xs:space-y-4 sm:space-y-0 gap-3 sm:gap-4">
//             <p
//               className="text-xs xs:text-sm md:text-base text-center sm:text-left"
//               style={{ color: 'var(--text-secondary)' }}
//             >
//               © 2025 Job Search Portal. All rights reserved.
//             </p>
//             <div className="flex flex-wrap justify-center sm:justify-end gap-x-4 xs:gap-x-6 gap-y-2 text-xs xs:text-sm md:text-base">
//               <a
//                 href="#"
//                 className="transition-colors hover:opacity-70 whitespace-nowrap"
//                 style={{ color: 'var(--text-secondary)' }}
//               >
//                 Privacy
//               </a>
//               <a
//                 href="#"
//                 className="transition-colors hover:opacity-70 whitespace-nowrap"
//                 style={{ color: 'var(--text-secondary)' }}
//               >
//                 Terms
//               </a>
//               <a
//                 href="#"
//                 className="transition-colors hover:opacity-70 whitespace-nowrap"
//                 style={{ color: 'var(--text-secondary)' }}
//               >
//                 Cookies
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter } from 'lucide-react';
import ShuffleText from './ShuffleText';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer
      className="border-t w-full overflow-x-hidden"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderColor: 'var(--border-color)'
      }}
    >
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-6 xs:py-8 sm:py-10 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xs:gap-8 md:gap-10 mb-6 xs:mb-8 md:mb-10">
          {/* Brand Section */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <h2
              className="text-xl xs:text-2xl font-bold mb-2 xs:mb-3"
              style={{ color: 'var(--text-primary)' }}
            >
              {/* Logo and Name */}
              <div className="flex items-center gap-2 xs:gap-3">
                <Logo size={32} className="flex-shrink-0 xs:w-9 xs:h-9 sm:w-10 sm:h-10" />
                <div className="block">
                  <ShuffleText
                    text="JobPortal"
                    className="text-lg xs:text-xl sm:text-2xl font-bold bg-gradient-to-r from-[hsl(222.2deg,30.47%,55.61%)] to-cyan-500 bg-clip-text text-transparent"
                  />
                </div>
              </div>
            </h2>
            <p
              className="text-xs xs:text-sm md:text-base mb-3 xs:mb-4 max-w-sm leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              Your trusted partner in finding the perfect career opportunity.
              Connect with top employers and land your dream job.
            </p>
            <div className="flex space-x-3 xs:space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all hover:opacity-70 hover:scale-110"
                style={{ color: 'var(--text-secondary)' }}
                aria-label="GitHub"
              >
                <Github className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all hover:opacity-70 hover:scale-110"
                style={{ color: 'var(--text-secondary)' }}
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all hover:opacity-70 hover:scale-110"
                style={{ color: 'var(--text-secondary)' }}
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6" />
              </a>
            </div>
          </div>

          {/* For Job Seekers */}
          <div>
            <h3
              className="font-semibold mb-3 xs:mb-4 text-sm xs:text-base md:text-lg"
              style={{ color: 'var(--text-primary)' }}
            >
              For Job Seekers
            </h3>
            <ul className="space-y-1.5 xs:space-y-2 md:space-y-2.5 text-xs xs:text-sm md:text-base">
              <li>
                <Link
                  to="/"
                  className="transition-colors hover:opacity-70 inline-block"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/jobs"
                  className="transition-colors hover:opacity-70 inline-block"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Find Jobs
                </Link>
              </li>
              <li>
                <Link
                  to="/browse"
                  className="transition-colors hover:opacity-70 inline-block"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Browse Companies
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="transition-colors hover:opacity-70 inline-block"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  My Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h3
              className="font-semibold mb-3 xs:mb-4 text-sm xs:text-base md:text-lg"
              style={{ color: 'var(--text-primary)' }}
            >
              For Employers
            </h3>
            <ul className="space-y-1.5 xs:space-y-2 md:space-y-2.5 text-xs xs:text-sm md:text-base">
              <li>
                <Link
                  to="/admin/companies"
                  className="transition-colors hover:opacity-70 inline-block"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Post a Job
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/jobs"
                  className="transition-colors hover:opacity-70 inline-block"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Manage Jobs
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/companies"
                  className="transition-colors hover:opacity-70 inline-block"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Company Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3
              className="font-semibold mb-3 xs:mb-4 text-sm xs:text-base md:text-lg"
              style={{ color: 'var(--text-primary)' }}
            >
              Company
            </h3>
            <ul className="space-y-1.5 xs:space-y-2 md:space-y-2.5 text-xs xs:text-sm md:text-base">
              <li>
                <a
                  href="#"
                  className="transition-colors hover:opacity-70 inline-block"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors hover:opacity-70 inline-block"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors hover:opacity-70 inline-block"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors hover:opacity-70 inline-block"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="pt-6 xs:pt-8 border-t"
          style={{ borderColor: 'var(--border-color)' }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 xs:space-y-4 sm:space-y-0 gap-3 sm:gap-4">
            <p
              className="text-xs xs:text-sm md:text-base text-center sm:text-left"
              style={{ color: 'var(--text-secondary)' }}
            >
              © 2025 Job Search Portal. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center sm:justify-end gap-x-4 xs:gap-x-6 gap-y-2 text-xs xs:text-sm md:text-base">
              <a
                href="#"
                className="transition-colors hover:opacity-70 whitespace-nowrap"
                style={{ color: 'var(--text-secondary)' }}
              >
                Privacy
              </a>
              <a
                href="#"
                className="transition-colors hover:opacity-70 whitespace-nowrap"
                style={{ color: 'var(--text-secondary)' }}
              >
                Terms
              </a>
              <a
                href="#"
                className="transition-colors hover:opacity-70 whitespace-nowrap"
                style={{ color: 'var(--text-secondary)' }}
              >
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
