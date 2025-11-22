// import React, { useEffect, useState } from 'react'
// import Navbar from '../shared/Navbar'
// import { Input } from '../ui/input'
// import { Button } from '../ui/button' 
// import { useNavigate } from 'react-router-dom' 
// import { useDispatch } from 'react-redux' 
// import AdminJobsTable from './AdminJobsTable'
// import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
// import { setSearchJobByText } from '@/redux/jobSlice'

// const AdminJobs = () => {
//   useGetAllAdminJobs();
//   const [input, setInput] = useState("");
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(setSearchJobByText(input));
//   }, [input]);
  
//   return (
//     <div 
//       className="min-h-screen w-full overflow-x-hidden"
//       style={{ backgroundColor: 'var(--bg-primary)' }}
//     >
//       <Navbar />
//       <div className='max-w-6xl mx-auto my-4 xs:my-6 sm:my-8 md:my-10 px-3 xs:px-4 sm:px-6 lg:px-8'>
//         {/* Page Header */}
//         <div className='mb-4 xs:mb-5 sm:mb-6 md:mb-8'>
//           <h1 
//             className='text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold mb-2 xs:mb-3'
//             style={{ color: 'var(--text-primary)' }}
//           >
//             Manage Jobs
//           </h1>
//           <p 
//             className='text-sm xs:text-base sm:text-lg'
//             style={{ color: 'var(--text-secondary)' }}
//           >
//             View and manage all job postings
//           </p>
//         </div>

//         {/* Filter and Action Bar */}
//         <div className='flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 xs:gap-4 sm:gap-5 mb-4 xs:mb-5 sm:mb-6 md:mb-8'>
//           <Input
//             className="w-full sm:flex-1 sm:max-w-sm md:max-w-md h-10 xs:h-11 sm:h-12 text-sm xs:text-base"
//             placeholder="Filter by name, role"
//             onChange={(e) => setInput(e.target.value)}
//             value={input}
//             style={{ 
//               backgroundColor: 'var(--bg-secondary)', 
//               color: 'var(--text-primary)',
//               borderColor: 'var(--border-color)'
//             }}
//           />
//           <Button 
//             onClick={() => navigate("/admin/jobs/create")}
//             className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 h-10 xs:h-11 sm:h-12 px-4 xs:px-6 sm:px-8 text-sm xs:text-base font-semibold whitespace-nowrap"
//           >
//             New Job
//           </Button>
//         </div>

//         {/* Jobs Table */}
//         <div 
//           className='rounded-lg xs:rounded-xl border overflow-hidden'
//           style={{ 
//             backgroundColor: 'var(--bg-secondary)',
//             borderColor: 'var(--border-color)'
//           }}
//         >
//           <AdminJobsTable />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AdminJobs

import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button' 
import { useNavigate } from 'react-router-dom' 
import { useDispatch } from 'react-redux' 
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);
  
  return (
    <div 
      className="min-h-screen w-full overflow-x-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <Navbar />
      <div className='max-w-6xl mx-auto my-4 xs:my-6 sm:my-8 md:my-10 px-3 xs:px-4 sm:px-6 lg:px-8'>
        {/* Page Header */}
        <div className='mb-4 xs:mb-5 sm:mb-6 md:mb-8'>
          <h1 
            className='text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold mb-2 xs:mb-3'
            style={{ color: 'var(--text-primary)' }}
          >
            Manage Jobs
          </h1>
          <p 
            className='text-sm xs:text-base sm:text-lg'
            style={{ color: 'var(--text-secondary)' }}
          >
            View and manage all job postings
          </p>
        </div>

        {/* Filter and Action Bar */}
        <div className='flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 xs:gap-4 sm:gap-5 mb-4 xs:mb-5 sm:mb-6 md:mb-8'>
          <Input
            className="w-full sm:flex-1 sm:max-w-sm md:max-w-md h-10 xs:h-11 sm:h-12 text-sm xs:text-base"
            placeholder="Filter by name, role"
            onChange={(e) => setInput(e.target.value)}
            value={input}
            style={{ 
              backgroundColor: 'var(--bg-secondary)', 
              color: 'var(--text-primary)',
              borderColor: 'var(--border-color)'
            }}
          />
          <Button 
            onClick={() => navigate("/admin/jobs/create")}
            className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 h-10 xs:h-11 sm:h-12 px-4 xs:px-6 sm:px-8 text-sm xs:text-base font-semibold whitespace-nowrap"
          >
            New Job
          </Button>
        </div>

        {/* Jobs Table */}
        <div 
          className='rounded-lg xs:rounded-xl border overflow-hidden'
          style={{ 
            backgroundColor: 'var(--bg-secondary)',
            borderColor: 'var(--border-color)'
          }}
        >
          <AdminJobsTable />
        </div>
      </div>
    </div>
  )
}

export default AdminJobs
