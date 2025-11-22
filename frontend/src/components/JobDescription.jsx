import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';

const JobDescription = () => {
    const {singleJob} = useSelector(store => store.job);
    const {user} = useSelector(store=>store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {withCredentials:true});
            
            if(res.data.success){
                setIsApplied(true);
                const updatedSingleJob = {...singleJob, applications:[...singleJob.applications,{applicant:user?._id}]}
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(()=>{
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application=>application.applicant === user?._id))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob(); 
    },[jobId,dispatch, user?._id]);

    return (
        <div 
            className="min-h-screen w-full overflow-x-hidden"
            style={{ backgroundColor: 'var(--bg-primary)' }}
        >
            <Navbar />
            <div className='max-w-7xl mx-auto my-4 sm:my-6 md:my-8 lg:my-10 px-3 xs:px-4 sm:px-6 lg:px-8'>
                <div 
                    className='p-4 sm:p-5 md:p-6 lg:p-8 rounded-lg border mb-4 sm:mb-5 md:mb-6'
                    style={{ 
                        backgroundColor: 'var(--bg-secondary)', 
                        borderColor: 'var(--border-color)' 
                    }}
                >
                    {/* Header Section */}
                    <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 mb-4 sm:mb-5 md:mb-6'>
                        <div className="flex-1 w-full sm:w-auto">
                            <h1 
                                className='font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-3 sm:mb-4'
                                style={{ color: 'var(--text-primary)' }}
                            >
                                {singleJob?.title}
                            </h1>
                            <div className='flex flex-wrap items-center gap-1.5 sm:gap-2 md:gap-2.5'>
                                <Badge 
                                    className='font-bold border text-[10px] sm:text-xs md:text-sm px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1'
                                    variant="secondary"
                                    style={{ 
                                        backgroundColor: 'var(--bg-tertiary)',
                                        color: 'var(--text-primary)',
                                        borderColor: 'var(--border-color)'
                                    }}
                                >
                                    {singleJob?.position} Positions
                                </Badge>
                                <Badge 
                                    className='font-bold border text-[10px] sm:text-xs md:text-sm px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 whitespace-nowrap'
                                    variant="secondary"
                                    style={{ 
                                        backgroundColor: 'var(--bg-tertiary)',
                                        color: 'var(--text-primary)',
                                        borderColor: 'var(--border-color)'
                                    }}
                                >
                                    {singleJob?.jobType}
                                </Badge>
                                <Badge 
                                    className='font-bold border text-[10px] sm:text-xs md:text-sm px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 whitespace-nowrap'
                                    variant="secondary"
                                    style={{ 
                                        backgroundColor: 'var(--bg-tertiary)',
                                        color: 'var(--text-primary)',
                                        borderColor: 'var(--border-color)'
                                    }}
                                >
                                    {singleJob?.salary} LPA
                                </Badge>
                            </div>
                        </div>
                        
                        {/* Apply Button */}
                        <Button
                            onClick={isApplied ? null : applyJobHandler}
                            disabled={isApplied}
                            className={`rounded-lg w-full sm:w-auto px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base md:text-lg whitespace-nowrap ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'}`}
                        >
                            {isApplied ? 'Already Applied' : 'Apply Now'}
                        </Button>
                    </div>
                    
                    {/* Job Description Header */}
                    <h2 
                        className='border-b-2 font-medium py-3 sm:py-4 text-base sm:text-lg md:text-xl'
                        style={{ 
                            color: 'var(--text-primary)', 
                            borderColor: 'var(--border-color)' 
                        }}
                    >
                        Job Description
                    </h2>
                    
                    {/* Job Details */}
                    <div className='my-4 sm:my-5 md:my-6 space-y-2.5 sm:space-y-3 md:space-y-4'>
                        <div className='flex flex-col sm:flex-row gap-1 sm:gap-0'>
                            <h3 
                                className='font-bold min-w-[120px] sm:min-w-[140px] md:min-w-[160px] text-sm sm:text-base md:text-lg'
                                style={{ color: 'var(--text-primary)' }}
                            >
                                Role:
                            </h3>
                            <span 
                                className='sm:pl-4 text-sm sm:text-base md:text-lg break-words'
                                style={{ color: 'var(--text-secondary)' }}
                            >
                                {singleJob?.title}
                            </span>
                        </div>
                        
                        <div className='flex flex-col sm:flex-row gap-1 sm:gap-0'>
                            <h3 
                                className='font-bold min-w-[120px] sm:min-w-[140px] md:min-w-[160px] text-sm sm:text-base md:text-lg'
                                style={{ color: 'var(--text-primary)' }}
                            >
                                Location:
                            </h3>
                            <span 
                                className='sm:pl-4 text-sm sm:text-base md:text-lg break-words'
                                style={{ color: 'var(--text-secondary)' }}
                            >
                                {singleJob?.location}
                            </span>
                        </div>
                        
                        <div className='flex flex-col sm:flex-row gap-1 sm:gap-0'>
                            <h3 
                                className='font-bold min-w-[120px] sm:min-w-[140px] md:min-w-[160px] text-sm sm:text-base md:text-lg flex-shrink-0'
                                style={{ color: 'var(--text-primary)' }}
                            >
                                Description:
                            </h3>
                            <span 
                                className='sm:pl-4 text-sm sm:text-base md:text-lg break-words leading-relaxed'
                                style={{ color: 'var(--text-secondary)' }}
                            >
                                {singleJob?.description}
                            </span>
                        </div>
                        
                        <div className='flex flex-col sm:flex-row gap-1 sm:gap-0'>
                            <h3 
                                className='font-bold min-w-[120px] sm:min-w-[140px] md:min-w-[160px] text-sm sm:text-base md:text-lg'
                                style={{ color: 'var(--text-primary)' }}
                            >
                                Experience:
                            </h3>
                            <span 
                                className='sm:pl-4 text-sm sm:text-base md:text-lg'
                                style={{ color: 'var(--text-secondary)' }}
                            >
                                {singleJob?.experience} yrs
                            </span>
                        </div>
                        
                        <div className='flex flex-col sm:flex-row gap-1 sm:gap-0'>
                            <h3 
                                className='font-bold min-w-[120px] sm:min-w-[140px] md:min-w-[160px] text-sm sm:text-base md:text-lg'
                                style={{ color: 'var(--text-primary)' }}
                            >
                                Salary:
                            </h3>
                            <span 
                                className='sm:pl-4 text-sm sm:text-base md:text-lg'
                                style={{ color: 'var(--text-secondary)' }}
                            >
                                {singleJob?.salary} LPA
                            </span>
                        </div>
                        
                        <div className='flex flex-col sm:flex-row gap-1 sm:gap-0'>
                            <h3 
                                className='font-bold min-w-[120px] sm:min-w-[140px] md:min-w-[160px] text-sm sm:text-base md:text-lg'
                                style={{ color: 'var(--text-primary)' }}
                            >
                                Total Applicants:
                            </h3>
                            <span 
                                className='sm:pl-4 text-sm sm:text-base md:text-lg'
                                style={{ color: 'var(--text-secondary)' }}
                            >
                                {singleJob?.applications?.length}
                            </span>
                        </div>
                        
                        <div className='flex flex-col sm:flex-row gap-1 sm:gap-0'>
                            <h3 
                                className='font-bold min-w-[120px] sm:min-w-[140px] md:min-w-[160px] text-sm sm:text-base md:text-lg'
                                style={{ color: 'var(--text-primary)' }}
                            >
                                Posted Date:
                            </h3>
                            <span 
                                className='sm:pl-4 text-sm sm:text-base md:text-lg'
                                style={{ color: 'var(--text-secondary)' }}
                            >
                                {singleJob?.createdAt?.split("T")[0]}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default JobDescription
