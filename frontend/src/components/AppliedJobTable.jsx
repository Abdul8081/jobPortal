// import React from 'react'
// import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
// import { Badge } from './ui/badge'
// import { useSelector } from 'react-redux'

// const AppliedJobTable = () => {
//     const { allAppliedJobs } = useSelector(store => store.job);
    
//     return (
//         <div 
//             className="rounded-lg border overflow-hidden"
//             style={{ 
//                 backgroundColor: 'var(--bg-secondary)', 
//                 borderColor: 'var(--border-color)' 
//             }}
//         >
//             {/* Responsive table wrapper with horizontal scroll on mobile */}
//             <div className="overflow-x-auto">
//                 <Table className="min-w-full">
//                     <TableCaption 
//                         className="text-xs sm:text-sm md:text-base py-3 sm:py-4"
//                         style={{ color: 'var(--text-secondary)' }}
//                     >
//                         A list of your applied jobs
//                     </TableCaption>
//                     <TableHeader>
//                         <TableRow style={{ borderColor: 'var(--border-color)' }}>
//                             <TableHead 
//                                 className="text-xs sm:text-sm md:text-base px-2 sm:px-4 py-2 sm:py-3"
//                                 style={{ color: 'var(--text-primary)' }}
//                             >
//                                 Date
//                             </TableHead>
//                             <TableHead 
//                                 className="text-xs sm:text-sm md:text-base px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap"
//                                 style={{ color: 'var(--text-primary)' }}
//                             >
//                                 Job Role
//                             </TableHead>
//                             <TableHead 
//                                 className="text-xs sm:text-sm md:text-base px-2 sm:px-4 py-2 sm:py-3"
//                                 style={{ color: 'var(--text-primary)' }}
//                             >
//                                 Company
//                             </TableHead>
//                             <TableHead 
//                                 className="text-right text-xs sm:text-sm md:text-base px-2 sm:px-4 py-2 sm:py-3"
//                                 style={{ color: 'var(--text-primary)' }}
//                             >
//                                 Status
//                             </TableHead>
//                         </TableRow>
//                     </TableHeader>
//                     <TableBody>
//                         {
//                             allAppliedJobs.length <= 0 ? (
//                                 <TableRow>
//                                     <TableCell 
//                                         colSpan={4} 
//                                         className="text-center text-xs sm:text-sm md:text-base px-2 sm:px-4 py-6 sm:py-8 md:py-10" 
//                                         style={{ color: 'var(--text-secondary)' }}
//                                     >
//                                         You haven't applied to any jobs yet.
//                                     </TableCell>
//                                 </TableRow>
//                             ) : (
//                                 allAppliedJobs.map((appliedJob) => (
//                                     <TableRow 
//                                         key={appliedJob._id} 
//                                         className="hover:bg-opacity-50"
//                                         style={{ borderColor: 'var(--border-color)' }}
//                                     >
//                                         <TableCell 
//                                             className="text-xs sm:text-sm md:text-base px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap"
//                                             style={{ color: 'var(--text-secondary)' }}
//                                         >
//                                             {appliedJob?.createdAt?.split("T")[0]}
//                                         </TableCell>
//                                         <TableCell 
//                                             className="text-xs sm:text-sm md:text-base px-2 sm:px-4 py-2 sm:py-3 font-medium"
//                                             style={{ color: 'var(--text-primary)' }}
//                                         >
//                                             <div className="max-w-[120px] sm:max-w-[200px] md:max-w-none truncate sm:whitespace-normal">
//                                                 {appliedJob.job?.title}
//                                             </div>
//                                         </TableCell>
//                                         <TableCell 
//                                             className="text-xs sm:text-sm md:text-base px-2 sm:px-4 py-2 sm:py-3"
//                                             style={{ color: 'var(--text-primary)' }}
//                                         >
//                                             <div className="max-w-[100px] sm:max-w-[180px] md:max-w-none truncate sm:whitespace-normal">
//                                                 {appliedJob.job?.company?.name}
//                                             </div>
//                                         </TableCell>
//                                         <TableCell className="text-right px-2 sm:px-4 py-2 sm:py-3">
//                                             <Badge 
//                                                 className="border font-semibold text-[10px] sm:text-xs md:text-sm px-2 sm:px-3 py-0.5 sm:py-1 whitespace-nowrap"
//                                                 variant="secondary"
//                                                 style={{
//                                                     backgroundColor: appliedJob?.status === "rejected" 
//                                                         ? 'rgba(239, 68, 68, 0.1)' 
//                                                         : appliedJob?.status === 'pending' 
//                                                         ? 'var(--bg-tertiary)' 
//                                                         : 'rgba(34, 197, 94, 0.1)',
//                                                     color: appliedJob?.status === "rejected" 
//                                                         ? '#dc2626' 
//                                                         : appliedJob?.status === 'pending' 
//                                                         ? 'var(--text-primary)' 
//                                                         : '#16a34a',
//                                                     borderColor: appliedJob?.status === "rejected" 
//                                                         ? '#dc2626' 
//                                                         : appliedJob?.status === 'pending' 
//                                                         ? 'var(--border-color)' 
//                                                         : '#16a34a'
//                                                 }}
//                                             >
//                                                 {appliedJob.status.toUpperCase()}
//                                             </Badge>
//                                         </TableCell>
//                                     </TableRow>
//                                 ))
//                             )
//                         }
//                     </TableBody>
//                 </Table>
//             </div>
//         </div>
//     )
// }

// export default AppliedJobTable


import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector(store => store.job);
    
    return (
        <div 
            className="rounded-lg border overflow-hidden"
            style={{ 
                backgroundColor: 'var(--bg-secondary)', 
                borderColor: 'var(--border-color)' 
            }}
        >
            {/* Responsive table wrapper with horizontal scroll on mobile */}
            <div className="overflow-x-auto">
                <Table className="min-w-full">
                    <TableCaption 
                        className="text-xs sm:text-sm md:text-base py-3 sm:py-4"
                        style={{ color: 'var(--text-secondary)' }}
                    >
                        A list of your applied jobs
                    </TableCaption>
                    <TableHeader>
                        <TableRow style={{ borderColor: 'var(--border-color)' }}>
                            <TableHead 
                                className="text-xs sm:text-sm md:text-base px-2 sm:px-4 py-2 sm:py-3"
                                style={{ color: 'var(--text-primary)' }}
                            >
                                Date
                            </TableHead>
                            <TableHead 
                                className="text-xs sm:text-sm md:text-base px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap"
                                style={{ color: 'var(--text-primary)' }}
                            >
                                Job Role
                            </TableHead>
                            <TableHead 
                                className="text-xs sm:text-sm md:text-base px-2 sm:px-4 py-2 sm:py-3"
                                style={{ color: 'var(--text-primary)' }}
                            >
                                Company
                            </TableHead>
                            <TableHead 
                                className="text-right text-xs sm:text-sm md:text-base px-2 sm:px-4 py-2 sm:py-3"
                                style={{ color: 'var(--text-primary)' }}
                            >
                                Status
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            allAppliedJobs.length <= 0 ? (
                                <TableRow>
                                    <TableCell 
                                        colSpan={4} 
                                        className="text-center text-xs sm:text-sm md:text-base px-2 sm:px-4 py-6 sm:py-8 md:py-10" 
                                        style={{ color: 'var(--text-secondary)' }}
                                    >
                                        You haven't applied to any jobs yet.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                allAppliedJobs.map((appliedJob) => (
                                    <TableRow 
                                        key={appliedJob._id} 
                                        className="hover:bg-opacity-50"
                                        style={{ borderColor: 'var(--border-color)' }}
                                    >
                                        <TableCell 
                                            className="text-xs sm:text-sm md:text-base px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap"
                                            style={{ color: 'var(--text-secondary)' }}
                                        >
                                            {appliedJob?.createdAt?.split("T")[0]}
                                        </TableCell>
                                        <TableCell 
                                            className="text-xs sm:text-sm md:text-base px-2 sm:px-4 py-2 sm:py-3 font-medium"
                                            style={{ color: 'var(--text-primary)' }}
                                        >
                                            <div className="max-w-[120px] sm:max-w-[200px] md:max-w-none truncate sm:whitespace-normal">
                                                {appliedJob.job?.title}
                                            </div>
                                        </TableCell>
                                        <TableCell 
                                            className="text-xs sm:text-sm md:text-base px-2 sm:px-4 py-2 sm:py-3"
                                            style={{ color: 'var(--text-primary)' }}
                                        >
                                            <div className="max-w-[100px] sm:max-w-[180px] md:max-w-none truncate sm:whitespace-normal">
                                                {appliedJob.job?.company?.name}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right px-2 sm:px-4 py-2 sm:py-3">
                                            <Badge 
                                                className="border font-semibold text-[10px] sm:text-xs md:text-sm px-2 sm:px-3 py-0.5 sm:py-1 whitespace-nowrap"
                                                variant="secondary"
                                                style={{
                                                    backgroundColor: appliedJob?.status === "rejected" 
                                                        ? 'rgba(239, 68, 68, 0.1)' 
                                                        : appliedJob?.status === 'pending' 
                                                        ? 'var(--bg-tertiary)' 
                                                        : 'rgba(34, 197, 94, 0.1)',
                                                    color: appliedJob?.status === "rejected" 
                                                        ? '#dc2626' 
                                                        : appliedJob?.status === 'pending' 
                                                        ? 'var(--text-primary)' 
                                                        : '#16a34a',
                                                    borderColor: appliedJob?.status === "rejected" 
                                                        ? '#dc2626' 
                                                        : appliedJob?.status === 'pending' 
                                                        ? 'var(--border-color)' 
                                                        : '#16a34a'
                                                }}
                                            >
                                                {appliedJob.status.toUpperCase()}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )
                        }
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default AppliedJobTable
