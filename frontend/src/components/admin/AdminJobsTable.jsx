// import React, { useEffect, useState } from 'react'
// import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
// import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
// import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
// import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'

// const AdminJobsTable = () => { 
//     const {allAdminJobs, searchJobByText} = useSelector(store=>store.job);
//     const [filterJobs, setFilterJobs] = useState(allAdminJobs);
//     const navigate = useNavigate();

//     useEffect(()=>{ 
//         const filteredJobs = allAdminJobs.filter((job)=>{
//             if(!searchJobByText){
//                 return true;
//             };
//             return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || 
//                    job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
//         });
//         setFilterJobs(filteredJobs);
//     },[allAdminJobs,searchJobByText])
    
//     return (
//         <div 
//           className="w-full"
//           style={{ 
//             backgroundColor: 'var(--bg-secondary)', 
//             borderColor: 'var(--border-color)' 
//           }}
//         >
//             {/* Mobile: Card Layout */}
//             <div className="block md:hidden">
//                 <div className="p-3 xs:p-4 space-y-3 xs:space-y-4">
//                     {filterJobs?.length > 0 ? (
//                         filterJobs.map((job) => (
//                             <div
//                                 key={job._id}
//                                 className="rounded-lg border p-3 xs:p-4 space-y-2 xs:space-y-3"
//                                 style={{ 
//                                     backgroundColor: 'var(--bg-primary)',
//                                     borderColor: 'var(--border-color)'
//                                 }}
//                             >
//                                 <div className="flex items-start justify-between gap-3">
//                                     <div className="flex-1 min-w-0">
//                                         <h3 
//                                             className="font-semibold text-sm xs:text-base truncate mb-1"
//                                             style={{ color: 'var(--text-primary)' }}
//                                         >
//                                             {job?.company?.name}
//                                         </h3>
//                                         <p 
//                                             className="text-xs xs:text-sm truncate"
//                                             style={{ color: 'var(--text-secondary)' }}
//                                         >
//                                             {job?.title}
//                                         </p>
//                                     </div>
//                                     <Popover>
//                                         <PopoverTrigger asChild>
//                                             <button 
//                                                 className="p-2 rounded-md hover:bg-opacity-10 hover:bg-gray-500 active:scale-95 transition-all min-h-[44px] min-w-[44px] flex items-center justify-center -mr-2"
//                                                 aria-label="More options"
//                                             >
//                                                 <MoreHorizontal 
//                                                     className="h-5 w-5"
//                                                     style={{ color: 'var(--text-primary)' }} 
//                                                 />
//                                             </button>
//                                         </PopoverTrigger>
//                                         <PopoverContent 
//                                             className="w-44"
//                                             align="end"
//                                             style={{ 
//                                                 backgroundColor: 'var(--bg-secondary)', 
//                                                 borderColor: 'var(--border-color)' 
//                                             }}
//                                         >
//                                             <div className="space-y-1">
//                                                 <button
//                                                     onClick={() => navigate(`/admin/companies/${job._id}`)} 
//                                                     className='flex items-center gap-3 w-full px-3 py-2.5 rounded-md hover:bg-opacity-10 hover:bg-purple-600 active:scale-95 transition-all text-left'
//                                                     style={{ color: 'var(--text-primary)' }}
//                                                 >
//                                                     <Edit2 className='w-4 h-4 flex-shrink-0' />
//                                                     <span className="text-sm">Edit Job</span>
//                                                 </button>
//                                                 <button
//                                                     onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} 
//                                                     className='flex items-center gap-3 w-full px-3 py-2.5 rounded-md hover:bg-opacity-10 hover:bg-purple-600 active:scale-95 transition-all text-left'
//                                                     style={{ color: 'var(--text-primary)' }}
//                                                 >
//                                                     <Eye className='w-4 h-4 flex-shrink-0'/>
//                                                     <span className="text-sm">View Applicants</span>
//                                                 </button>
//                                             </div>
//                                         </PopoverContent>
//                                     </Popover>
//                                 </div>
//                                 <div 
//                                     className="text-xs xs:text-sm pt-2 border-t"
//                                     style={{ 
//                                         color: 'var(--text-secondary)',
//                                         borderColor: 'var(--border-color)'
//                                     }}
//                                 >
//                                     Posted: {job?.createdAt.split("T")[0]}
//                                 </div>
//                             </div>
//                         ))
//                     ) : (
//                         <div 
//                             className="text-center py-8 text-sm"
//                             style={{ color: 'var(--text-secondary)' }}
//                         >
//                             No jobs found
//                         </div>
//                     )}
//                 </div>
//             </div>

//             {/* Desktop: Table Layout */}
//             <div className="hidden md:block overflow-x-auto">
//                 <Table>
//                     <TableCaption 
//                         className="text-sm"
//                         style={{ color: 'var(--text-secondary)' }}
//                     >
//                         A list of your recent posted jobs
//                     </TableCaption>
//                     <TableHeader>
//                         <TableRow style={{ borderColor: 'var(--border-color)' }}>
//                             <TableHead 
//                                 className="text-sm lg:text-base font-semibold"
//                                 style={{ color: 'var(--text-primary)' }}
//                             >
//                                 Company Name
//                             </TableHead>
//                             <TableHead 
//                                 className="text-sm lg:text-base font-semibold"
//                                 style={{ color: 'var(--text-primary)' }}
//                             >
//                                 Role
//                             </TableHead>
//                             <TableHead 
//                                 className="text-sm lg:text-base font-semibold"
//                                 style={{ color: 'var(--text-primary)' }}
//                             >
//                                 Date
//                             </TableHead>
//                             <TableHead 
//                                 className="text-right text-sm lg:text-base font-semibold" 
//                                 style={{ color: 'var(--text-primary)' }}
//                             >
//                                 Action
//                             </TableHead>
//                         </TableRow>
//                     </TableHeader>
//                     <TableBody>
//                         {filterJobs?.length > 0 ? (
//                             filterJobs.map((job) => (
//                                 <TableRow 
//                                     key={job._id} 
//                                     className="hover:bg-opacity-5 hover:bg-purple-600 transition-colors"
//                                     style={{ borderColor: 'var(--border-color)' }}
//                                 >
//                                     <TableCell 
//                                         className="font-medium text-sm lg:text-base"
//                                         style={{ color: 'var(--text-primary)' }}
//                                     >
//                                         {job?.company?.name}
//                                     </TableCell>
//                                     <TableCell 
//                                         className="text-sm lg:text-base"
//                                         style={{ color: 'var(--text-primary)' }}
//                                     >
//                                         {job?.title}
//                                     </TableCell>
//                                     <TableCell 
//                                         className="text-sm lg:text-base"
//                                         style={{ color: 'var(--text-secondary)' }}
//                                     >
//                                         {job?.createdAt.split("T")[0]}
//                                     </TableCell>
//                                     <TableCell className="text-right">
//                                         <Popover>
//                                             <PopoverTrigger asChild>
//                                                 <button 
//                                                     className="p-2 rounded-md hover:bg-opacity-10 hover:bg-gray-500 active:scale-95 transition-all inline-flex items-center justify-center"
//                                                     aria-label="More options"
//                                                 >
//                                                     <MoreHorizontal 
//                                                         className="h-5 w-5"
//                                                         style={{ color: 'var(--text-primary)' }} 
//                                                     />
//                                                 </button>
//                                             </PopoverTrigger>
//                                             <PopoverContent 
//                                                 className="w-44"
//                                                 align="end"
//                                                 style={{ 
//                                                     backgroundColor: 'var(--bg-secondary)', 
//                                                     borderColor: 'var(--border-color)' 
//                                                 }}
//                                             >
//                                                 <div className="space-y-1">
//                                                     <button
//                                                         onClick={() => navigate(`/admin/companies/${job._id}`)} 
//                                                         className='flex items-center gap-3 w-full px-3 py-2.5 rounded-md hover:bg-opacity-10 hover:bg-purple-600 transition-all text-left'
//                                                         style={{ color: 'var(--text-primary)' }}
//                                                     >
//                                                         <Edit2 className='w-4 h-4 flex-shrink-0' />
//                                                         <span className="text-sm">Edit Job</span>
//                                                     </button>
//                                                     <button
//                                                         onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} 
//                                                         className='flex items-center gap-3 w-full px-3 py-2.5 rounded-md hover:bg-opacity-10 hover:bg-purple-600 transition-all text-left'
//                                                         style={{ color: 'var(--text-primary)' }}
//                                                     >
//                                                         <Eye className='w-4 h-4 flex-shrink-0'/>
//                                                         <span className="text-sm">View Applicants</span>
//                                                     </button>
//                                                 </div>
//                                             </PopoverContent>
//                                         </Popover>
//                                     </TableCell>
//                                 </TableRow>
//                             ))
//                         ) : (
//                             <TableRow>
//                                 <TableCell 
//                                     colSpan={4} 
//                                     className="text-center py-8 text-sm"
//                                     style={{ color: 'var(--text-secondary)' }}
//                                 >
//                                     No jobs found
//                                 </TableCell>
//                             </TableRow>
//                         )}
//                     </TableBody>
//                 </Table>
//             </div>
//         </div>
//     )
// }

// export default AdminJobsTable


import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => { 
    const {allAdminJobs, searchJobByText} = useSelector(store=>store.job);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    useEffect(()=>{ 
        const filteredJobs = allAdminJobs.filter((job)=>{
            if(!searchJobByText){
                return true;
            };
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || 
                   job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
        });
        setFilterJobs(filteredJobs);
    },[allAdminJobs,searchJobByText])
    
    return (
        <div 
          className="w-full"
          style={{ 
            backgroundColor: 'var(--bg-secondary)', 
            borderColor: 'var(--border-color)' 
          }}
        >
            {/* Mobile: Card Layout */}
            <div className="block md:hidden">
                <div className="p-3 xs:p-4 space-y-3 xs:space-y-4">
                    {filterJobs?.length > 0 ? (
                        filterJobs.map((job) => (
                            <div
                                key={job._id}
                                className="rounded-lg border p-3 xs:p-4 space-y-2 xs:space-y-3"
                                style={{ 
                                    backgroundColor: 'var(--bg-primary)',
                                    borderColor: 'var(--border-color)'
                                }}
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex-1 min-w-0">
                                        <h3 
                                            className="font-semibold text-sm xs:text-base truncate mb-1"
                                            style={{ color: 'var(--text-primary)' }}
                                        >
                                            {job?.company?.name}
                                        </h3>
                                        <p 
                                            className="text-xs xs:text-sm truncate"
                                            style={{ color: 'var(--text-secondary)' }}
                                        >
                                            {job?.title}
                                        </p>
                                    </div>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <button 
                                                className="p-2 rounded-md hover:bg-opacity-10 hover:bg-gray-500 active:scale-95 transition-all min-h-[44px] min-w-[44px] flex items-center justify-center -mr-2"
                                                aria-label="More options"
                                            >
                                                <MoreHorizontal 
                                                    className="h-5 w-5"
                                                    style={{ color: 'var(--text-primary)' }} 
                                                />
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent 
                                            className="w-44"
                                            align="end"
                                            style={{ 
                                                backgroundColor: 'var(--bg-secondary)', 
                                                borderColor: 'var(--border-color)' 
                                            }}
                                        >
                                            <div className="space-y-1">
                                                <button
                                                    onClick={() => navigate(`/admin/companies/${job._id}`)} 
                                                    className='flex items-center gap-3 w-full px-3 py-2.5 rounded-md hover:bg-opacity-10 hover:bg-purple-600 active:scale-95 transition-all text-left'
                                                    style={{ color: 'var(--text-primary)' }}
                                                >
                                                    <Edit2 className='w-4 h-4 flex-shrink-0' />
                                                    <span className="text-sm">Edit Job</span>
                                                </button>
                                                <button
                                                    onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} 
                                                    className='flex items-center gap-3 w-full px-3 py-2.5 rounded-md hover:bg-opacity-10 hover:bg-purple-600 active:scale-95 transition-all text-left'
                                                    style={{ color: 'var(--text-primary)' }}
                                                >
                                                    <Eye className='w-4 h-4 flex-shrink-0'/>
                                                    <span className="text-sm">View Applicants</span>
                                                </button>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div 
                                    className="text-xs xs:text-sm pt-2 border-t"
                                    style={{ 
                                        color: 'var(--text-secondary)',
                                        borderColor: 'var(--border-color)'
                                    }}
                                >
                                    Posted: {job?.createdAt.split("T")[0]}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div 
                            className="text-center py-8 text-sm"
                            style={{ color: 'var(--text-secondary)' }}
                        >
                            No jobs found
                        </div>
                    )}
                </div>
            </div>

            {/* Desktop: Table Layout */}
            <div className="hidden md:block overflow-x-auto">
                <Table>
                    <TableCaption 
                        className="text-sm"
                        style={{ color: 'var(--text-secondary)' }}
                    >
                        A list of your recent posted jobs
                    </TableCaption>
                    <TableHeader>
                        <TableRow style={{ borderColor: 'var(--border-color)' }}>
                            <TableHead 
                                className="text-sm lg:text-base font-semibold"
                                style={{ color: 'var(--text-primary)' }}
                            >
                                Company Name
                            </TableHead>
                            <TableHead 
                                className="text-sm lg:text-base font-semibold"
                                style={{ color: 'var(--text-primary)' }}
                            >
                                Role
                            </TableHead>
                            <TableHead 
                                className="text-sm lg:text-base font-semibold"
                                style={{ color: 'var(--text-primary)' }}
                            >
                                Date
                            </TableHead>
                            <TableHead 
                                className="text-right text-sm lg:text-base font-semibold" 
                                style={{ color: 'var(--text-primary)' }}
                            >
                                Action
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filterJobs?.length > 0 ? (
                            filterJobs.map((job) => (
                                <TableRow 
                                    key={job._id} 
                                    className="hover:bg-opacity-5 hover:bg-purple-600 transition-colors"
                                    style={{ borderColor: 'var(--border-color)' }}
                                >
                                    <TableCell 
                                        className="font-medium text-sm lg:text-base"
                                        style={{ color: 'var(--text-primary)' }}
                                    >
                                        {job?.company?.name}
                                    </TableCell>
                                    <TableCell 
                                        className="text-sm lg:text-base"
                                        style={{ color: 'var(--text-primary)' }}
                                    >
                                        {job?.title}
                                    </TableCell>
                                    <TableCell 
                                        className="text-sm lg:text-base"
                                        style={{ color: 'var(--text-secondary)' }}
                                    >
                                        {job?.createdAt.split("T")[0]}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <button 
                                                    className="p-2 rounded-md hover:bg-opacity-10 hover:bg-gray-500 active:scale-95 transition-all inline-flex items-center justify-center"
                                                    aria-label="More options"
                                                >
                                                    <MoreHorizontal 
                                                        className="h-5 w-5"
                                                        style={{ color: 'var(--text-primary)' }} 
                                                    />
                                                </button>
                                            </PopoverTrigger>
                                            <PopoverContent 
                                                className="w-44"
                                                align="end"
                                                style={{ 
                                                    backgroundColor: 'var(--bg-secondary)', 
                                                    borderColor: 'var(--border-color)' 
                                                }}
                                            >
                                                <div className="space-y-1">
                                                    <button
                                                        onClick={() => navigate(`/admin/companies/${job._id}`)} 
                                                        className='flex items-center gap-3 w-full px-3 py-2.5 rounded-md hover:bg-opacity-10 hover:bg-purple-600 transition-all text-left'
                                                        style={{ color: 'var(--text-primary)' }}
                                                    >
                                                        <Edit2 className='w-4 h-4 flex-shrink-0' />
                                                        <span className="text-sm">Edit Job</span>
                                                    </button>
                                                    <button
                                                        onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} 
                                                        className='flex items-center gap-3 w-full px-3 py-2.5 rounded-md hover:bg-opacity-10 hover:bg-purple-600 transition-all text-left'
                                                        style={{ color: 'var(--text-primary)' }}
                                                    >
                                                        <Eye className='w-4 h-4 flex-shrink-0'/>
                                                        <span className="text-sm">View Applicants</span>
                                                    </button>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell 
                                    colSpan={4} 
                                    className="text-center py-8 text-sm"
                                    style={{ color: 'var(--text-secondary)' }}
                                >
                                    No jobs found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default AdminJobsTable
