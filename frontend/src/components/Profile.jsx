// import React, { useState } from 'react'
// import Navbar from './shared/Navbar'
// import { Avatar, AvatarImage } from './ui/avatar'
// import { Button } from './ui/button'
// import { Contact, Mail, Pen } from 'lucide-react'
// import { Badge } from './ui/badge'
// import { Label } from './ui/label'
// import AppliedJobTable from './AppliedJobTable'
// import UpdateProfileDialog from './UpdateProfileDialog'
// import { useSelector } from 'react-redux'
// import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
// import Footer from './shared/Footer'

// const Profile = () => {
//     useGetAppliedJobs();
//     const [open, setOpen] = useState(false);
//     const {user} = useSelector(store=>store.auth);

//     return (
//         <div 
//             className="min-h-screen w-full overflow-x-hidden"
//             style={{ backgroundColor: 'var(--bg-primary)' }}
//         >
//             <Navbar />
            
//             {/* Profile Card */}
//             <div className='max-w-4xl mx-auto my-3 xs:my-4 sm:my-5 md:my-6 lg:my-8 p-4 xs:p-5 sm:p-6 md:p-7 lg:p-8 rounded-xl sm:rounded-2xl border mx-3 xs:mx-4 sm:mx-6 lg:mx-8'
//                 style={{ 
//                     backgroundColor: 'var(--bg-secondary)',
//                     borderColor: 'var(--border-color)'
//                 }}
//             >
//                 {/* Profile Header */}
//                 <div className='flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 md:gap-5'>
//                     <div className='flex flex-col xs:flex-row items-start xs:items-center gap-3 sm:gap-4 md:gap-5 flex-1'>
//                         <Avatar className="h-16 w-16 xs:h-20 xs:w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 border-2 flex-shrink-0" style={{ borderColor: 'var(--border-color)' }}>
//                             <AvatarImage src={user?.profile?.profilePhoto || "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"} alt="profile" />
//                         </Avatar>
//                         <div className="flex-1 min-w-0">
//                             <h1 
//                                 className='font-medium text-lg xs:text-xl sm:text-2xl md:text-3xl truncate'
//                                 style={{ color: 'var(--text-primary)' }}
//                             >
//                                 {user?.fullname}
//                             </h1>
//                             <p 
//                                 className='text-sm xs:text-base sm:text-lg mt-1 line-clamp-2'
//                                 style={{ color: 'var(--text-secondary)' }}
//                             >
//                                 {user?.profile?.bio}
//                             </p>
//                         </div>
//                     </div>
//                     <Button 
//                         onClick={() => setOpen(true)} 
//                         className="self-start sm:self-auto h-9 w-9 sm:h-10 sm:w-10 p-2" 
//                         variant="outline"
//                         size="icon"
//                         style={{ 
//                             borderColor: 'var(--border-color)',
//                         }}
//                     >
//                         <Pen className="h-4 w-4 sm:h-5 sm:w-5" />
//                     </Button>
//                 </div>

//                 {/* Contact Information */}
//                 <div className='my-4 sm:my-5 md:my-6 space-y-2 sm:space-y-3'>
//                     <div 
//                         className='flex items-center gap-2 sm:gap-3 text-sm sm:text-base md:text-lg'
//                         style={{ color: 'var(--text-secondary)' }}
//                     >
//                         <Mail className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
//                         <span className="break-all">{user?.email}</span>
//                     </div>
//                     <div 
//                         className='flex items-center gap-2 sm:gap-3 text-sm sm:text-base md:text-lg'
//                         style={{ color: 'var(--text-secondary)' }}
//                     >
//                         <Contact className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
//                         <span>{user?.phoneNumber}</span>
//                     </div>
//                 </div>

//                 {/* Skills Section */}
//                 <div className='my-4 sm:my-5 md:my-6'>
//                     <h1 
//                         className='font-bold mb-2 sm:mb-3 text-base sm:text-lg md:text-xl'
//                         style={{ color: 'var(--text-primary)' }}
//                     >
//                         Skills
//                     </h1>
//                     <div className='flex flex-wrap items-center gap-1.5 sm:gap-2'>
//                         {
//                             user?.profile?.skills.length !== 0 ? 
//                             user?.profile?.skills.map((item, index) => (
//                                 <Badge 
//                                     key={index}
//                                     className="text-xs sm:text-sm px-2 sm:px-2.5 py-0.5 sm:py-1"
//                                 >
//                                     {item}
//                                 </Badge>
//                             )) : 
//                             <span 
//                                 className='text-sm sm:text-base'
//                                 style={{ color: 'var(--text-secondary)' }}
//                             >
//                                 NA
//                             </span>
//                         }
//                     </div>
//                 </div>

//                 {/* Resume Section */}
//                 <div className='grid w-full items-center gap-2 sm:gap-2.5'>
//                     <Label 
//                         className="text-base sm:text-lg md:text-xl font-bold"
//                         style={{ color: 'var(--text-primary)' }}
//                     >
//                         Resume
//                     </Label>
//                     {
//                         user?.profile?.resume ? 
//                         <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-2 sm:gap-3">
//                             <a 
//                                 target='_blank' 
//                                 rel='noopener noreferrer'
//                                 href={user?.profile?.resume} 
//                                 className='hover:underline cursor-pointer font-medium flex-1 truncate text-sm sm:text-base'
//                                 style={{ color: 'var(--accent-primary)' }}
//                             >
//                                 {user?.profile?.resumeOriginalName || 'Resume.pdf'}
//                             </a>
//                             <div className="flex gap-2 sm:gap-3">
//                                 <Button
//                                     variant="outline"
//                                     size="sm"
//                                     onClick={() => window.open(user?.profile?.resume, '_blank')}
//                                     className="flex-1 xs:flex-none text-xs sm:text-sm px-3 sm:px-4 py-2"
//                                     style={{ 
//                                         borderColor: 'var(--border-color)',
//                                     }}
//                                 >
//                                     View
//                                 </Button>
//                                 <Button
//                                     variant="outline"
//                                     size="sm"
//                                     onClick={async () => {
//                                         try {
//                                             const response = await fetch(user?.profile?.resume);
//                                             const blob = await response.blob();
//                                             const blobUrl = window.URL.createObjectURL(blob);
//                                             const link = document.createElement('a');
//                                             link.href = blobUrl;
//                                             let filename = user?.profile?.resumeOriginalName || 'Resume.pdf';
//                                             if (!filename.toLowerCase().endsWith('.pdf')) {
//                                                 filename = filename + '.pdf';
//                                             }
//                                             link.download = filename;
//                                             document.body.appendChild(link);
//                                             link.click();
//                                             document.body.removeChild(link);
//                                             window.URL.revokeObjectURL(blobUrl);
//                                         } catch (error) {
//                                             console.error('Download error:', error);
//                                             window.open(user?.profile?.resume, '_blank');
//                                         }
//                                     }}
//                                     className="flex-1 xs:flex-none text-xs sm:text-sm px-3 sm:px-4 py-2"
//                                     style={{ 
//                                         borderColor: 'var(--border-color)',
//                                     }}
//                                 >
//                                     Download
//                                 </Button>
//                             </div>
//                         </div> : 
//                         <span 
//                             className='text-sm sm:text-base'
//                             style={{ color: 'var(--text-secondary)' }}
//                         >
//                             NA
//                         </span>
//                     }
//                 </div>
//             </div>

//             {/* Applied Jobs Section */}
//             <div 
//                 className='max-w-4xl mx-auto rounded-xl sm:rounded-2xl p-4 xs:p-5 sm:p-6 md:p-7 lg:p-8 mx-3 xs:mx-4 sm:mx-6 lg:mx-8 mb-4 sm:mb-6 md:mb-8'
//                 style={{ 
//                     backgroundColor: 'var(--bg-secondary)',
//                     borderColor: 'var(--border-color)'
//                 }}
//             >
//                 <h1 
//                     className='font-bold text-lg sm:text-xl md:text-2xl my-3 sm:my-4 md:my-5'
//                     style={{ color: 'var(--text-primary)' }}
//                 >
//                     Applied Jobs
//                 </h1>
//                 <AppliedJobTable />
//             </div>

//             <UpdateProfileDialog open={open} setOpen={setOpen}/>
//             <Footer />
//         </div>
//     )
// }

// export default Profile



import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
import Footer from './shared/Footer'

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const {user} = useSelector(store=>store.auth);

    return (
        <div 
            className="min-h-screen w-full overflow-x-hidden"
            style={{ backgroundColor: 'var(--bg-primary)' }}
        >
            <Navbar />
            
            <div className="w-full px-3 xs:px-4 sm:px-6 lg:px-8">
                {/* Profile Card */}
                <div className='max-w-4xl mx-auto my-3 xs:my-4 sm:my-5 md:my-6 lg:my-8 p-4 xs:p-5 sm:p-6 md:p-7 lg:p-8 rounded-xl sm:rounded-2xl border'
                    style={{ 
                        backgroundColor: 'var(--bg-secondary)',
                        borderColor: 'var(--border-color)'
                    }}
                >
                    {/* Profile Header */}
                    <div className='flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 md:gap-5'>
                        <div className='flex flex-col xs:flex-row items-start xs:items-center gap-3 sm:gap-4 md:gap-5 flex-1 min-w-0'>
                            <Avatar className="h-16 w-16 xs:h-20 xs:w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 border-2 flex-shrink-0" style={{ borderColor: 'var(--border-color)' }}>
                                <AvatarImage src={user?.profile?.profilePhoto || "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"} alt="profile" />
                            </Avatar>
                            <div className="flex-1 min-w-0">
                                <h1 
                                    className='font-medium text-lg xs:text-xl sm:text-2xl md:text-3xl truncate'
                                    style={{ color: 'var(--text-primary)' }}
                                >
                                    {user?.fullname}
                                </h1>
                                <p 
                                    className='text-sm xs:text-base sm:text-lg mt-1 line-clamp-2'
                                    style={{ color: 'var(--text-secondary)' }}
                                >
                                    {user?.profile?.bio}
                                </p>
                            </div>
                        </div>
                        <Button 
                            onClick={() => setOpen(true)} 
                            className="self-start sm:self-auto h-9 w-9 sm:h-10 sm:w-10 p-2 flex-shrink-0" 
                            variant="outline"
                            size="icon"
                            style={{ 
                                borderColor: 'var(--border-color)',
                            }}
                        >
                            <Pen className="h-4 w-4 sm:h-5 sm:w-5" />
                        </Button>
                    </div>

                    {/* Contact Information */}
                    <div className='my-4 sm:my-5 md:my-6 space-y-2 sm:space-y-3'>
                        <div 
                            className='flex items-center gap-2 sm:gap-3 text-sm sm:text-base md:text-lg'
                            style={{ color: 'var(--text-secondary)' }}
                        >
                            <Mail className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                            <span className="break-all">{user?.email}</span>
                        </div>
                        <div 
                            className='flex items-center gap-2 sm:gap-3 text-sm sm:text-base md:text-lg'
                            style={{ color: 'var(--text-secondary)' }}
                        >
                            <Contact className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                            <span>{user?.phoneNumber}</span>
                        </div>
                    </div>

                    {/* Skills Section */}
                    <div className='my-4 sm:my-5 md:my-6'>
                        <h1 
                            className='font-bold mb-2 sm:mb-3 text-base sm:text-lg md:text-xl'
                            style={{ color: 'var(--text-primary)' }}
                        >
                            Skills
                        </h1>
                        <div className='flex flex-wrap items-center gap-1.5 sm:gap-2'>
                            {
                                user?.profile?.skills && user?.profile?.skills.length > 0 ? 
                                user?.profile?.skills.map((item, index) => (
                                    <Badge 
                                        key={index}
                                        className="text-xs sm:text-sm px-2 sm:px-2.5 py-0.5 sm:py-1"
                                    >
                                        {item}
                                    </Badge>
                                )) : 
                                <span 
                                    className='text-sm sm:text-base'
                                    style={{ color: 'var(--text-secondary)' }}
                                >
                                    NA
                                </span>
                            }
                        </div>
                    </div>

                    {/* Resume Section */}
                    <div className='grid w-full items-center gap-2 sm:gap-2.5'>
                        <Label 
                            className="text-base sm:text-lg md:text-xl font-bold"
                            style={{ color: 'var(--text-primary)' }}
                        >
                            Resume
                        </Label>
                        {
                            user?.profile?.resume ? 
                            <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-2 sm:gap-3">
                                <a 
                                    target='_blank' 
                                    rel='noopener noreferrer'
                                    href={user?.profile?.resume} 
                                    className='hover:underline cursor-pointer font-medium flex-1 truncate text-sm sm:text-base'
                                    style={{ color: 'var(--accent-primary)' }}
                                >
                                    {user?.profile?.resumeOriginalName || 'Resume.pdf'}
                                </a>
                                <div className="flex gap-2 sm:gap-3">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => window.open(user?.profile?.resume, '_blank')}
                                        className="flex-1 xs:flex-none text-xs sm:text-sm px-3 sm:px-4 py-2 h-9 sm:h-10"
                                        style={{ 
                                            borderColor: 'var(--border-color)',
                                        }}
                                    >
                                        View
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={async () => {
                                            try {
                                                const response = await fetch(user?.profile?.resume);
                                                const blob = await response.blob();
                                                const blobUrl = window.URL.createObjectURL(blob);
                                                const link = document.createElement('a');
                                                link.href = blobUrl;
                                                let filename = user?.profile?.resumeOriginalName || 'Resume.pdf';
                                                if (!filename.toLowerCase().endsWith('.pdf')) {
                                                    filename = filename + '.pdf';
                                                }
                                                link.download = filename;
                                                document.body.appendChild(link);
                                                link.click();
                                                document.body.removeChild(link);
                                                window.URL.revokeObjectURL(blobUrl);
                                            } catch (error) {
                                                console.error('Download error:', error);
                                                window.open(user?.profile?.resume, '_blank');
                                            }
                                        }}
                                        className="flex-1 xs:flex-none text-xs sm:text-sm px-3 sm:px-4 py-2 h-9 sm:h-10"
                                        style={{ 
                                            borderColor: 'var(--border-color)',
                                        }}
                                    >
                                        Download
                                    </Button>
                                </div>
                            </div> : 
                            <span 
                                className='text-sm sm:text-base'
                                style={{ color: 'var(--text-secondary)' }}
                            >
                                NA
                            </span>
                        }
                    </div>
                </div>

                {/* Applied Jobs Section */}
                <div 
                    className='max-w-4xl mx-auto rounded-xl sm:rounded-2xl border p-4 xs:p-5 sm:p-6 md:p-7 lg:p-8 mb-4 sm:mb-6 md:mb-8'
                    style={{ 
                        backgroundColor: 'var(--bg-secondary)',
                        borderColor: 'var(--border-color)'
                    }}
                >
                    <h1 
                        className='font-bold text-lg sm:text-xl md:text-2xl mb-3 sm:mb-4 md:mb-5'
                        style={{ color: 'var(--text-primary)' }}
                    >
                        Applied Jobs
                    </h1>
                    <AppliedJobTable />
                </div>
            </div>

            <UpdateProfileDialog open={open} setOpen={setOpen}/>
            <Footer />
        </div>
    )
}

export default Profile
