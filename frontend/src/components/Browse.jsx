import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import Footer from './shared/Footer';

const Browse = () => {
    useGetAllJobs();
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const dispatch = useDispatch();
    
    // Filter jobs based on search query
    const filteredJobs = allJobs.filter((job) => {
        if (!searchedQuery) return true;
        
        const query = searchedQuery.toLowerCase();
        return (
            job.title?.toLowerCase().includes(query) ||
            job.description?.toLowerCase().includes(query) ||
            job.company?.name?.toLowerCase().includes(query) ||
            job.location?.toLowerCase().includes(query) ||
            job.jobType?.toLowerCase().includes(query)
        );
    });
    
    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        }
    }, [])
    
    return (
        <div 
            className="min-h-screen w-full overflow-x-hidden"
            style={{ backgroundColor: 'var(--bg-primary)' }}
        >
            <Navbar />
            <div className='max-w-7xl mx-auto my-4 sm:my-6 md:my-8 lg:my-10 px-3 xs:px-4 sm:px-6 lg:px-8'>
                {/* Header Section */}
                <div className="mb-4 sm:mb-5 md:mb-6 lg:mb-8">
                    {searchedQuery && (
                        <p 
                            style={{ color: 'var(--text-secondary)' }} 
                            className="text-xs sm:text-sm md:text-base mb-2"
                        >
                            Search results for: <span className="font-semibold text-purple-600">"{searchedQuery}"</span>
                        </p>
                    )}
                    <h1 
                        className='font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl'
                        style={{ color: 'var(--text-primary)' }}
                    >
                        {filteredJobs.length} {filteredJobs.length === 1 ? 'Job' : 'Jobs'} Found
                    </h1>
                </div>
                
                {/* Jobs Grid */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6'>
                    {
                        filteredJobs.length === 0 ? (
                            <div className="col-span-full text-center py-8 sm:py-10 md:py-12 lg:py-16 px-4">
                                <p 
                                    style={{ color: 'var(--text-secondary)' }} 
                                    className="text-base sm:text-lg md:text-xl font-medium mb-2"
                                >
                                    No jobs found {searchedQuery && `for "${searchedQuery}"`}
                                </p>
                                <p 
                                    style={{ color: 'var(--text-tertiary)' }} 
                                    className="text-xs sm:text-sm md:text-base mt-1 sm:mt-2"
                                >
                                    Try adjusting your search terms
                                </p>
                            </div>
                        ) : (
                            filteredJobs.map((job) => {
                                return (
                                    <Job key={job._id} job={job}/>
                                )
                            })
                        )
                    }
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Browse
