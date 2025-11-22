// import React, { useEffect, useState } from 'react'
// import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
// import { Avatar, AvatarImage } from '../ui/avatar'
// import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
// import { Edit2, MoreHorizontal, Calendar, Building2 } from 'lucide-react'
// import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'

// const CompaniesTable = () => {
//     const { companies, searchCompanyByText } = useSelector(store => store.company);
//     const [filterCompany, setFilterCompany] = useState(companies);
//     const navigate = useNavigate();
    
//     useEffect(()=>{
//         const filteredCompany = companies.length >= 0 && companies.filter((company)=>{
//             if(!searchCompanyByText){
//                 return true
//             };
//             return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
//         });
//         setFilterCompany(filteredCompany);
//     },[companies,searchCompanyByText])
    
//     return (
//         <div 
//             className="w-full"
//             style={{ 
//                 backgroundColor: 'var(--bg-secondary)', 
//                 borderColor: 'var(--border-color)' 
//             }}
//         >
//             {/* Mobile: Card Layout */}
//             <div className="block md:hidden">
//                 <div className="p-3 xs:p-4 space-y-3 xs:space-y-4">
//                     {filterCompany?.length > 0 ? (
//                         filterCompany.map((company) => (
//                             <div
//                                 key={company._id}
//                                 className="rounded-lg border p-3 xs:p-4 space-y-3"
//                                 style={{ 
//                                     backgroundColor: 'var(--bg-primary)',
//                                     borderColor: 'var(--border-color)'
//                                 }}
//                             >
//                                 {/* Company Header */}
//                                 <div className="flex items-center justify-between gap-3">
//                                     <div className="flex items-center gap-3 flex-1 min-w-0">
//                                         <Avatar className="h-12 w-12 xs:h-14 xs:w-14 flex-shrink-0 ring-2 ring-offset-2" 
//                                             style={{ 
//                                                 ringColor: 'var(--border-color)',
//                                                 ringOffsetColor: 'var(--bg-primary)'
//                                             }}
//                                         >
//                                             <AvatarImage src={company.logo} alt={company.name} />
//                                         </Avatar>
//                                         <div className="flex-1 min-w-0">
//                                             <h3 
//                                                 className="font-semibold text-sm xs:text-base truncate"
//                                                 style={{ color: 'var(--text-primary)' }}
//                                             >
//                                                 {company.name}
//                                             </h3>
//                                             <div className="flex items-center gap-1.5 text-xs mt-1">
//                                                 <Calendar 
//                                                     className="h-3 w-3 flex-shrink-0"
//                                                     style={{ color: 'var(--text-secondary)' }}
//                                                 />
//                                                 <span style={{ color: 'var(--text-secondary)' }}>
//                                                     {company.createdAt.split("T")[0]}
//                                                 </span>
//                                             </div>
//                                         </div>
//                                     </div>
                                    
//                                     {/* Edit Button */}
//                                     <button
//                                         onClick={() => navigate(`/admin/companies/${company._id}`)}
//                                         className="p-2.5 rounded-lg border transition-all active:scale-95 min-h-[44px] min-w-[44px] flex items-center justify-center"
//                                         style={{
//                                             borderColor: 'var(--border-color)',
//                                             color: 'var(--text-primary)'
//                                         }}
//                                         aria-label="Edit company"
//                                     >
//                                         <Edit2 className="h-4 w-4" />
//                                     </button>
//                                 </div>
//                             </div>
//                         ))
//                     ) : (
//                         <div 
//                             className="text-center py-8 text-sm"
//                             style={{ color: 'var(--text-secondary)' }}
//                         >
//                             No companies found
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
//                         A list of your recent registered companies
//                     </TableCaption>
//                     <TableHeader>
//                         <TableRow style={{ borderColor: 'var(--border-color)' }}>
//                             <TableHead 
//                                 className="text-sm lg:text-base font-semibold"
//                                 style={{ color: 'var(--text-primary)' }}
//                             >
//                                 Logo
//                             </TableHead>
//                             <TableHead 
//                                 className="text-sm lg:text-base font-semibold"
//                                 style={{ color: 'var(--text-primary)' }}
//                             >
//                                 Name
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
//                         {filterCompany?.length > 0 ? (
//                             filterCompany.map((company) => (
//                                 <TableRow 
//                                     key={company._id}
//                                     className="hover:bg-opacity-5 hover:bg-purple-600 transition-colors"
//                                     style={{ borderColor: 'var(--border-color)' }}
//                                 >
//                                     <TableCell>
//                                         <Avatar className="h-10 w-10 lg:h-12 lg:w-12">
//                                             <AvatarImage src={company.logo} alt={company.name} />
//                                         </Avatar>
//                                     </TableCell>
//                                     <TableCell 
//                                         className="font-medium text-sm lg:text-base"
//                                         style={{ color: 'var(--text-primary)' }}
//                                     >
//                                         {company.name}
//                                     </TableCell>
//                                     <TableCell 
//                                         className="text-sm lg:text-base"
//                                         style={{ color: 'var(--text-secondary)' }}
//                                     >
//                                         {company.createdAt.split("T")[0]}
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
//                                                 <button
//                                                     onClick={() => navigate(`/admin/companies/${company._id}`)} 
//                                                     className='flex items-center gap-3 w-full px-3 py-2.5 rounded-md hover:bg-opacity-10 hover:bg-purple-600 transition-all text-left'
//                                                     style={{ color: 'var(--text-primary)' }}
//                                                 >
//                                                     <Edit2 className='w-4 h-4 flex-shrink-0' />
//                                                     <span className="text-sm">Edit Company</span>
//                                                 </button>
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
//                                     No companies found
//                                 </TableCell>
//                             </TableRow>
//                         )}
//                     </TableBody>
//                 </Table>
//             </div>
//         </div>
//     )
// }

// export default CompaniesTable


import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal, Calendar, Building2 } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();
    
    useEffect(()=>{
        const filteredCompany = companies.length >= 0 && companies.filter((company)=>{
            if(!searchCompanyByText){
                return true
            };
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });
        setFilterCompany(filteredCompany);
    },[companies,searchCompanyByText])
    
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
                    {filterCompany?.length > 0 ? (
                        filterCompany.map((company) => (
                            <div
                                key={company._id}
                                className="rounded-lg border p-3 xs:p-4 space-y-3"
                                style={{ 
                                    backgroundColor: 'var(--bg-primary)',
                                    borderColor: 'var(--border-color)'
                                }}
                            >
                                {/* Company Header */}
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-3 flex-1 min-w-0">
                                        <Avatar className="h-12 w-12 xs:h-14 xs:w-14 flex-shrink-0 ring-2 ring-offset-2" 
                                            style={{ 
                                                ringColor: 'var(--border-color)',
                                                ringOffsetColor: 'var(--bg-primary)'
                                            }}
                                        >
                                            <AvatarImage src={company.logo} alt={company.name} />
                                        </Avatar>
                                        <div className="flex-1 min-w-0">
                                            <h3 
                                                className="font-semibold text-sm xs:text-base truncate"
                                                style={{ color: 'var(--text-primary)' }}
                                            >
                                                {company.name}
                                            </h3>
                                            <div className="flex items-center gap-1.5 text-xs mt-1">
                                                <Calendar 
                                                    className="h-3 w-3 flex-shrink-0"
                                                    style={{ color: 'var(--text-secondary)' }}
                                                />
                                                <span style={{ color: 'var(--text-secondary)' }}>
                                                    {company.createdAt.split("T")[0]}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Edit Button */}
                                    <button
                                        onClick={() => navigate(`/admin/companies/${company._id}`)}
                                        className="p-2.5 rounded-lg border transition-all active:scale-95 min-h-[44px] min-w-[44px] flex items-center justify-center"
                                        style={{
                                            borderColor: 'var(--border-color)',
                                            color: 'var(--text-primary)'
                                        }}
                                        aria-label="Edit company"
                                    >
                                        <Edit2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div 
                            className="text-center py-8 text-sm"
                            style={{ color: 'var(--text-secondary)' }}
                        >
                            No companies found
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
                        A list of your recent registered companies
                    </TableCaption>
                    <TableHeader>
                        <TableRow style={{ borderColor: 'var(--border-color)' }}>
                            <TableHead 
                                className="text-sm lg:text-base font-semibold"
                                style={{ color: 'var(--text-primary)' }}
                            >
                                Logo
                            </TableHead>
                            <TableHead 
                                className="text-sm lg:text-base font-semibold"
                                style={{ color: 'var(--text-primary)' }}
                            >
                                Name
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
                        {filterCompany?.length > 0 ? (
                            filterCompany.map((company) => (
                                <TableRow 
                                    key={company._id}
                                    className="hover:bg-opacity-5 hover:bg-purple-600 transition-colors"
                                    style={{ borderColor: 'var(--border-color)' }}
                                >
                                    <TableCell>
                                        <Avatar className="h-10 w-10 lg:h-12 lg:w-12">
                                            <AvatarImage src={company.logo} alt={company.name} />
                                        </Avatar>
                                    </TableCell>
                                    <TableCell 
                                        className="font-medium text-sm lg:text-base"
                                        style={{ color: 'var(--text-primary)' }}
                                    >
                                        {company.name}
                                    </TableCell>
                                    <TableCell 
                                        className="text-sm lg:text-base"
                                        style={{ color: 'var(--text-secondary)' }}
                                    >
                                        {company.createdAt.split("T")[0]}
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
                                                <button
                                                    onClick={() => navigate(`/admin/companies/${company._id}`)} 
                                                    className='flex items-center gap-3 w-full px-3 py-2.5 rounded-md hover:bg-opacity-10 hover:bg-purple-600 transition-all text-left'
                                                    style={{ color: 'var(--text-primary)' }}
                                                >
                                                    <Edit2 className='w-4 h-4 flex-shrink-0' />
                                                    <span className="text-sm">Edit Company</span>
                                                </button>
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
                                    No companies found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default CompaniesTable
