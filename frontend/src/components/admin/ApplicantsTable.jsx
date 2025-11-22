// import React from 'react'
// import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
// import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
// import { MoreHorizontal, User, Mail, Phone, FileText, Calendar, CheckCircle, XCircle } from 'lucide-react';
// import { useSelector } from 'react-redux';
// import { toast } from 'sonner';
// import { APPLICATION_API_END_POINT } from '@/utils/constant';
// import axios from 'axios';

// const shortlistingStatus = ["Accepted", "Rejected"];

// const ApplicantsTable = () => {
//     const { applicants } = useSelector(store => store.application);

//     const statusHandler = async (status, id) => {
//         try {
//             axios.defaults.withCredentials = true;
//             const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
//             if (res.data.success) {
//                 toast.success(res.data.message);
//             }
//         } catch (error) {
//             toast.error(error.response.data.message);
//         }
//     }

//     return (
//         <div 
//             className="w-full"
//             style={{ 
//                 backgroundColor: 'var(--bg-secondary)', 
//                 borderColor: 'var(--border-color)' 
//             }}
//         >
//             {/* Mobile: Card Layout */}
//             <div className="block lg:hidden">
//                 <div className="p-3 xs:p-4 space-y-3 xs:space-y-4">
//                     {applicants && applicants?.applications?.length > 0 ? (
//                         applicants.applications.map((item) => (
//                             <div
//                                 key={item._id}
//                                 className="rounded-lg border p-3 xs:p-4 space-y-3"
//                                 style={{ 
//                                     backgroundColor: 'var(--bg-primary)',
//                                     borderColor: 'var(--border-color)'
//                                 }}
//                             >
//                                 {/* Applicant Name */}
//                                 <div className="flex items-start justify-between gap-3">
//                                     <div className="flex items-center gap-2 flex-1 min-w-0">
//                                         <User 
//                                             className="h-4 w-4 xs:h-5 xs:w-5 flex-shrink-0"
//                                             style={{ color: 'var(--text-secondary)' }}
//                                         />
//                                         <h3 
//                                             className="font-semibold text-sm xs:text-base truncate"
//                                             style={{ color: 'var(--text-primary)' }}
//                                         >
//                                             {item?.applicant?.fullname}
//                                         </h3>
//                                     </div>
                                    
//                                     {/* Status Badge */}
//                                     <div 
//                                         className={`px-2 xs:px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
//                                             item?.status === 'Accepted' 
//                                                 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
//                                                 : item?.status === 'Rejected'
//                                                 ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
//                                                 : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
//                                         }`}
//                                     >
//                                         {item?.status || 'Pending'}
//                                     </div>
//                                 </div>

//                                 {/* Contact Information */}
//                                 <div className="space-y-2">
//                                     <div className="flex items-center gap-2 text-xs xs:text-sm">
//                                         <Mail 
//                                             className="h-3.5 w-3.5 xs:h-4 xs:w-4 flex-shrink-0"
//                                             style={{ color: 'var(--text-secondary)' }}
//                                         />
//                                         <span 
//                                             className="truncate"
//                                             style={{ color: 'var(--text-primary)' }}
//                                         >
//                                             {item?.applicant?.email}
//                                         </span>
//                                     </div>
                                    
//                                     <div className="flex items-center gap-2 text-xs xs:text-sm">
//                                         <Phone 
//                                             className="h-3.5 w-3.5 xs:h-4 xs:w-4 flex-shrink-0"
//                                             style={{ color: 'var(--text-secondary)' }}
//                                         />
//                                         <span style={{ color: 'var(--text-primary)' }}>
//                                             {item?.applicant?.phoneNumber}
//                                         </span>
//                                     </div>

//                                     {item.applicant?.profile?.resume && (
//                                         <div className="flex items-center gap-2 text-xs xs:text-sm">
//                                             <FileText 
//                                                 className="h-3.5 w-3.5 xs:h-4 xs:w-4 flex-shrink-0"
//                                                 style={{ color: 'var(--text-secondary)' }}
//                                             />
//                                             <a 
//                                                 className="cursor-pointer hover:underline truncate"
//                                                 style={{ color: 'var(--accent-primary)' }}
//                                                 href={item?.applicant?.profile?.resume} 
//                                                 target="_blank" 
//                                                 rel="noopener noreferrer"
//                                             >
//                                                 {item?.applicant?.profile?.resumeOriginalName || 'View Resume'}
//                                             </a>
//                                         </div>
//                                     )}

//                                     <div className="flex items-center gap-2 text-xs xs:text-sm">
//                                         <Calendar 
//                                             className="h-3.5 w-3.5 xs:h-4 xs:w-4 flex-shrink-0"
//                                             style={{ color: 'var(--text-secondary)' }}
//                                         />
//                                         <span style={{ color: 'var(--text-secondary)' }}>
//                                             Applied: {item?.applicant.createdAt.split("T")[0]}
//                                         </span>
//                                     </div>
//                                 </div>

//                                 {/* Action Buttons */}
//                                 <div className="flex gap-2 pt-2 border-t" style={{ borderColor: 'var(--border-color)' }}>
//                                     <button
//                                         onClick={() => statusHandler('Accepted', item?._id)}
//                                         className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border transition-all active:scale-95 text-xs xs:text-sm font-medium"
//                                         style={{
//                                             borderColor: 'var(--border-color)',
//                                             color: 'var(--text-primary)'
//                                         }}
//                                     >
//                                         <CheckCircle className="h-4 w-4 text-green-600" />
//                                         <span>Accept</span>
//                                     </button>
//                                     <button
//                                         onClick={() => statusHandler('Rejected', item?._id)}
//                                         className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border transition-all active:scale-95 text-xs xs:text-sm font-medium"
//                                         style={{
//                                             borderColor: 'var(--border-color)',
//                                             color: 'var(--text-primary)'
//                                         }}
//                                     >
//                                         <XCircle className="h-4 w-4 text-red-600" />
//                                         <span>Reject</span>
//                                     </button>
//                                 </div>
//                             </div>
//                         ))
//                     ) : (
//                         <div 
//                             className="text-center py-8 text-sm"
//                             style={{ color: 'var(--text-secondary)' }}
//                         >
//                             No applicants yet
//                         </div>
//                     )}
//                 </div>
//             </div>

//             {/* Desktop: Table Layout */}
//             <div className="hidden lg:block overflow-x-auto">
//                 <Table>
//                     <TableCaption 
//                         className="text-sm"
//                         style={{ color: 'var(--text-secondary)' }}
//                     >
//                         A list of your recent applied users
//                     </TableCaption>
//                     <TableHeader>
//                         <TableRow style={{ borderColor: 'var(--border-color)' }}>
//                             <TableHead 
//                                 className="text-sm font-semibold"
//                                 style={{ color: 'var(--text-primary)' }}
//                             >
//                                 Full Name
//                             </TableHead>
//                             <TableHead 
//                                 className="text-sm font-semibold"
//                                 style={{ color: 'var(--text-primary)' }}
//                             >
//                                 Email
//                             </TableHead>
//                             <TableHead 
//                                 className="text-sm font-semibold"
//                                 style={{ color: 'var(--text-primary)' }}
//                             >
//                                 Contact
//                             </TableHead>
//                             <TableHead 
//                                 className="text-sm font-semibold"
//                                 style={{ color: 'var(--text-primary)' }}
//                             >
//                                 Resume
//                             </TableHead>
//                             <TableHead 
//                                 className="text-sm font-semibold"
//                                 style={{ color: 'var(--text-primary)' }}
//                             >
//                                 Date
//                             </TableHead>
//                             <TableHead 
//                                 className="text-right text-sm font-semibold" 
//                                 style={{ color: 'var(--text-primary)' }}
//                             >
//                                 Action
//                             </TableHead>
//                         </TableRow>
//                     </TableHeader>
//                     <TableBody>
//                         {applicants && applicants?.applications?.length > 0 ? (
//                             applicants.applications.map((item) => (
//                                 <TableRow 
//                                     key={item._id}
//                                     className="hover:bg-opacity-5 hover:bg-purple-600 transition-colors"
//                                     style={{ borderColor: 'var(--border-color)' }}
//                                 >
//                                     <TableCell 
//                                         className="font-medium text-sm"
//                                         style={{ color: 'var(--text-primary)' }}
//                                     >
//                                         {item?.applicant?.fullname}
//                                     </TableCell>
//                                     <TableCell 
//                                         className="text-sm"
//                                         style={{ color: 'var(--text-primary)' }}
//                                     >
//                                         {item?.applicant?.email}
//                                     </TableCell>
//                                     <TableCell 
//                                         className="text-sm"
//                                         style={{ color: 'var(--text-primary)' }}
//                                     >
//                                         {item?.applicant?.phoneNumber}
//                                     </TableCell>
//                                     <TableCell className="text-sm">
//                                         {item.applicant?.profile?.resume ? (
//                                             <a 
//                                                 className="cursor-pointer hover:underline truncate max-w-[150px] inline-block"
//                                                 style={{ color: 'var(--accent-primary)' }}
//                                                 href={item?.applicant?.profile?.resume} 
//                                                 target="_blank" 
//                                                 rel="noopener noreferrer"
//                                             >
//                                                 {item?.applicant?.profile?.resumeOriginalName || 'View Resume'}
//                                             </a>
//                                         ) : (
//                                             <span style={{ color: 'var(--text-secondary)' }}>NA</span>
//                                         )}
//                                     </TableCell>
//                                     <TableCell 
//                                         className="text-sm"
//                                         style={{ color: 'var(--text-secondary)' }}
//                                     >
//                                         {item?.applicant.createdAt.split("T")[0]}
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
//                                                 className="w-40"
//                                                 align="end"
//                                                 style={{ 
//                                                     backgroundColor: 'var(--bg-secondary)', 
//                                                     borderColor: 'var(--border-color)' 
//                                                 }}
//                                             >
//                                                 <div className="space-y-1">
//                                                     {shortlistingStatus.map((status, index) => (
//                                                         <button
//                                                             key={index}
//                                                             onClick={() => statusHandler(status, item?._id)}
//                                                             className='flex items-center gap-3 w-full px-3 py-2.5 rounded-md hover:bg-opacity-10 hover:bg-purple-600 transition-all text-left'
//                                                             style={{ color: 'var(--text-primary)' }}
//                                                         >
//                                                             {status === 'Accepted' ? (
//                                                                 <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
//                                                             ) : (
//                                                                 <XCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
//                                                             )}
//                                                             <span className="text-sm">{status}</span>
//                                                         </button>
//                                                     ))}
//                                                 </div>
//                                             </PopoverContent>
//                                         </Popover>
//                                     </TableCell>
//                                 </TableRow>
//                             ))
//                         ) : (
//                             <TableRow>
//                                 <TableCell 
//                                     colSpan={6} 
//                                     className="text-center py-8 text-sm"
//                                     style={{ color: 'var(--text-secondary)' }}
//                                 >
//                                     No applicants yet
//                                 </TableCell>
//                             </TableRow>
//                         )}
//                     </TableBody>
//                 </Table>
//             </div>
//         </div>
//     )
// }

// export default ApplicantsTable


import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal, User, Mail, Phone, FileText, Calendar, CheckCircle, XCircle } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);

    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <div 
            className="w-full"
            style={{ 
                backgroundColor: 'var(--bg-secondary)', 
                borderColor: 'var(--border-color)' 
            }}
        >
            {/* Mobile: Card Layout */}
            <div className="block lg:hidden">
                <div className="p-3 xs:p-4 space-y-3 xs:space-y-4">
                    {applicants && applicants?.applications?.length > 0 ? (
                        applicants.applications.map((item) => (
                            <div
                                key={item._id}
                                className="rounded-lg border p-3 xs:p-4 space-y-3"
                                style={{ 
                                    backgroundColor: 'var(--bg-primary)',
                                    borderColor: 'var(--border-color)'
                                }}
                            >
                                {/* Applicant Name */}
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex items-center gap-2 flex-1 min-w-0">
                                        <User 
                                            className="h-4 w-4 xs:h-5 xs:w-5 flex-shrink-0"
                                            style={{ color: 'var(--text-secondary)' }}
                                        />
                                        <h3 
                                            className="font-semibold text-sm xs:text-base truncate"
                                            style={{ color: 'var(--text-primary)' }}
                                        >
                                            {item?.applicant?.fullname}
                                        </h3>
                                    </div>
                                    
                                    {/* Status Badge */}
                                    <div 
                                        className={`px-2 xs:px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                                            item?.status === 'Accepted' 
                                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                                : item?.status === 'Rejected'
                                                ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                                : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                                        }`}
                                    >
                                        {item?.status || 'Pending'}
                                    </div>
                                </div>

                                {/* Contact Information */}
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-xs xs:text-sm">
                                        <Mail 
                                            className="h-3.5 w-3.5 xs:h-4 xs:w-4 flex-shrink-0"
                                            style={{ color: 'var(--text-secondary)' }}
                                        />
                                        <span 
                                            className="truncate"
                                            style={{ color: 'var(--text-primary)' }}
                                        >
                                            {item?.applicant?.email}
                                        </span>
                                    </div>
                                    
                                    <div className="flex items-center gap-2 text-xs xs:text-sm">
                                        <Phone 
                                            className="h-3.5 w-3.5 xs:h-4 xs:w-4 flex-shrink-0"
                                            style={{ color: 'var(--text-secondary)' }}
                                        />
                                        <span style={{ color: 'var(--text-primary)' }}>
                                            {item?.applicant?.phoneNumber}
                                        </span>
                                    </div>

                                    {item.applicant?.profile?.resume && (
                                        <div className="flex items-center gap-2 text-xs xs:text-sm">
                                            <FileText 
                                                className="h-3.5 w-3.5 xs:h-4 xs:w-4 flex-shrink-0"
                                                style={{ color: 'var(--text-secondary)' }}
                                            />
                                            <a 
                                                className="cursor-pointer hover:underline truncate"
                                                style={{ color: 'var(--accent-primary)' }}
                                                href={item?.applicant?.profile?.resume} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                            >
                                                {item?.applicant?.profile?.resumeOriginalName || 'View Resume'}
                                            </a>
                                        </div>
                                    )}

                                    <div className="flex items-center gap-2 text-xs xs:text-sm">
                                        <Calendar 
                                            className="h-3.5 w-3.5 xs:h-4 xs:w-4 flex-shrink-0"
                                            style={{ color: 'var(--text-secondary)' }}
                                        />
                                        <span style={{ color: 'var(--text-secondary)' }}>
                                            Applied: {item?.applicant.createdAt.split("T")[0]}
                                        </span>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-2 pt-2 border-t" style={{ borderColor: 'var(--border-color)' }}>
                                    <button
                                        onClick={() => statusHandler('Accepted', item?._id)}
                                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border transition-all active:scale-95 text-xs xs:text-sm font-medium"
                                        style={{
                                            borderColor: 'var(--border-color)',
                                            color: 'var(--text-primary)'
                                        }}
                                    >
                                        <CheckCircle className="h-4 w-4 text-green-600" />
                                        <span>Accept</span>
                                    </button>
                                    <button
                                        onClick={() => statusHandler('Rejected', item?._id)}
                                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border transition-all active:scale-95 text-xs xs:text-sm font-medium"
                                        style={{
                                            borderColor: 'var(--border-color)',
                                            color: 'var(--text-primary)'
                                        }}
                                    >
                                        <XCircle className="h-4 w-4 text-red-600" />
                                        <span>Reject</span>
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div 
                            className="text-center py-8 text-sm"
                            style={{ color: 'var(--text-secondary)' }}
                        >
                            No applicants yet
                        </div>
                    )}
                </div>
            </div>

            {/* Desktop: Table Layout */}
            <div className="hidden lg:block overflow-x-auto">
                <Table>
                    <TableCaption 
                        className="text-sm"
                        style={{ color: 'var(--text-secondary)' }}
                    >
                        A list of your recent applied users
                    </TableCaption>
                    <TableHeader>
                        <TableRow style={{ borderColor: 'var(--border-color)' }}>
                            <TableHead 
                                className="text-sm font-semibold"
                                style={{ color: 'var(--text-primary)' }}
                            >
                                Full Name
                            </TableHead>
                            <TableHead 
                                className="text-sm font-semibold"
                                style={{ color: 'var(--text-primary)' }}
                            >
                                Email
                            </TableHead>
                            <TableHead 
                                className="text-sm font-semibold"
                                style={{ color: 'var(--text-primary)' }}
                            >
                                Contact
                            </TableHead>
                            <TableHead 
                                className="text-sm font-semibold"
                                style={{ color: 'var(--text-primary)' }}
                            >
                                Resume
                            </TableHead>
                            <TableHead 
                                className="text-sm font-semibold"
                                style={{ color: 'var(--text-primary)' }}
                            >
                                Date
                            </TableHead>
                            <TableHead 
                                className="text-right text-sm font-semibold" 
                                style={{ color: 'var(--text-primary)' }}
                            >
                                Action
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {applicants && applicants?.applications?.length > 0 ? (
                            applicants.applications.map((item) => (
                                <TableRow 
                                    key={item._id}
                                    className="hover:bg-opacity-5 hover:bg-purple-600 transition-colors"
                                    style={{ borderColor: 'var(--border-color)' }}
                                >
                                    <TableCell 
                                        className="font-medium text-sm"
                                        style={{ color: 'var(--text-primary)' }}
                                    >
                                        {item?.applicant?.fullname}
                                    </TableCell>
                                    <TableCell 
                                        className="text-sm"
                                        style={{ color: 'var(--text-primary)' }}
                                    >
                                        {item?.applicant?.email}
                                    </TableCell>
                                    <TableCell 
                                        className="text-sm"
                                        style={{ color: 'var(--text-primary)' }}
                                    >
                                        {item?.applicant?.phoneNumber}
                                    </TableCell>
                                    <TableCell className="text-sm">
                                        {item.applicant?.profile?.resume ? (
                                            <a 
                                                className="cursor-pointer hover:underline truncate max-w-[150px] inline-block"
                                                style={{ color: 'var(--accent-primary)' }}
                                                href={item?.applicant?.profile?.resume} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                            >
                                                {item?.applicant?.profile?.resumeOriginalName || 'View Resume'}
                                            </a>
                                        ) : (
                                            <span style={{ color: 'var(--text-secondary)' }}>NA</span>
                                        )}
                                    </TableCell>
                                    <TableCell 
                                        className="text-sm"
                                        style={{ color: 'var(--text-secondary)' }}
                                    >
                                        {item?.applicant.createdAt.split("T")[0]}
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
                                                className="w-40"
                                                align="end"
                                                style={{ 
                                                    backgroundColor: 'var(--bg-secondary)', 
                                                    borderColor: 'var(--border-color)' 
                                                }}
                                            >
                                                <div className="space-y-1">
                                                    {shortlistingStatus.map((status, index) => (
                                                        <button
                                                            key={index}
                                                            onClick={() => statusHandler(status, item?._id)}
                                                            className='flex items-center gap-3 w-full px-3 py-2.5 rounded-md hover:bg-opacity-10 hover:bg-purple-600 transition-all text-left'
                                                            style={{ color: 'var(--text-primary)' }}
                                                        >
                                                            {status === 'Accepted' ? (
                                                                <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                                                            ) : (
                                                                <XCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
                                                            )}
                                                            <span className="text-sm">{status}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell 
                                    colSpan={6} 
                                    className="text-center py-8 text-sm"
                                    style={{ color: 'var(--text-secondary)' }}
                                >
                                    No applicants yet
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default ApplicantsTable
