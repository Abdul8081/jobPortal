// import React, { useEffect } from 'react'
// import Navbar from '../shared/Navbar'
// import ApplicantsTable from './ApplicantsTable'
// import axios from 'axios';
// import { APPLICATION_API_END_POINT } from '@/utils/constant';
// import { useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { setAllApplicants } from '@/redux/applicationSlice';

// const Applicants = () => {
//     const params = useParams();
//     const dispatch = useDispatch();
//     const {applicants} = useSelector(store=>store.application);

//     useEffect(() => {
//         const fetchAllApplicants = async () => {
//             try {
//                 const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
//                 dispatch(setAllApplicants(res.data.job));
//             } catch (error) {
//                 console.log(error);
//             }
//         }
//         fetchAllApplicants();
//     }, []);
    
//     return (
//         <div 
//             className="min-h-screen w-full overflow-x-hidden"
//             style={{ backgroundColor: 'var(--bg-primary)' }}
//         >
//             <Navbar />
//             <div className='max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-4 xs:py-5 sm:py-6 md:py-8'>
//                 {/* Page Header */}
//                 <div className='mb-4 xs:mb-5 sm:mb-6 md:mb-8'>
//                     <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2 xs:gap-3 sm:gap-4 mb-2 xs:mb-3">
//                         <h1 
//                             className='font-bold text-xl xs:text-2xl sm:text-3xl md:text-4xl'
//                             style={{ color: 'var(--text-primary)' }}
//                         >
//                             Job Applicants
//                         </h1>
//                         <div 
//                             className='inline-flex items-center gap-2 px-3 xs:px-4 py-1.5 xs:py-2 rounded-full border text-sm xs:text-base font-semibold self-start xs:self-auto'
//                             style={{ 
//                                 backgroundColor: 'var(--bg-tertiary)',
//                                 borderColor: 'var(--border-color)',
//                                 color: 'var(--accent-primary)'
//                             }}
//                         >
//                             <span className="text-xs xs:text-sm sm:text-base">
//                                 Total: {applicants?.applications?.length || 0}
//                             </span>
//                         </div>
//                     </div>
//                     <p 
//                         className='text-xs xs:text-sm sm:text-base md:text-lg max-w-2xl'
//                         style={{ color: 'var(--text-secondary)' }}
//                     >
//                         Review and manage all applicants for this position
//                     </p>
//                 </div>

//                 {/* Applicants Table */}
//                 <div 
//                     className='rounded-lg xs:rounded-xl border overflow-hidden'
//                     style={{ 
//                         backgroundColor: 'var(--bg-secondary)',
//                         borderColor: 'var(--border-color)'
//                     }}
//                 >
//                     <ApplicantsTable />
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Applicants


import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const {applicants} = useSelector(store=>store.application);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
                dispatch(setAllApplicants(res.data.job));
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllApplicants();
    }, []);
    
    return (
        <div 
            className="min-h-screen w-full overflow-x-hidden"
            style={{ backgroundColor: 'var(--bg-primary)' }}
        >
            <Navbar />
            <div className='max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-4 xs:py-5 sm:py-6 md:py-8'>
                {/* Page Header */}
                <div className='mb-4 xs:mb-5 sm:mb-6 md:mb-8'>
                    <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2 xs:gap-3 sm:gap-4 mb-2 xs:mb-3">
                        <h1 
                            className='font-bold text-xl xs:text-2xl sm:text-3xl md:text-4xl'
                            style={{ color: 'var(--text-primary)' }}
                        >
                            Job Applicants
                        </h1>
                        <div 
                            className='inline-flex items-center gap-2 px-3 xs:px-4 py-1.5 xs:py-2 rounded-full border text-sm xs:text-base font-semibold self-start xs:self-auto'
                            style={{ 
                                backgroundColor: 'var(--bg-tertiary)',
                                borderColor: 'var(--border-color)',
                                color: 'var(--accent-primary)'
                            }}
                        >
                            <span className="text-xs xs:text-sm sm:text-base">
                                Total: {applicants?.applications?.length || 0}
                            </span>
                        </div>
                    </div>
                    <p 
                        className='text-xs xs:text-sm sm:text-base md:text-lg max-w-2xl'
                        style={{ color: 'var(--text-secondary)' }}
                    >
                        Review and manage all applicants for this position
                    </p>
                </div>

                {/* Applicants Table */}
                <div 
                    className='rounded-lg xs:rounded-xl border overflow-hidden'
                    style={{ 
                        backgroundColor: 'var(--bg-secondary)',
                        borderColor: 'var(--border-color)'
                    }}
                >
                    <ApplicantsTable />
                </div>
            </div>
        </div>
    )
}

export default Applicants
