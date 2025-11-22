import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import Footer from './shared/Footer';
import { useSearchParams } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();

    // Sync URL query param with Redux state
    useEffect(() => {
        const queryParam = searchParams.get('query');
        if (queryParam && queryParam !== searchedQuery) {
            dispatch(setSearchedQuery(queryParam));
        }
    }, [searchParams, dispatch, searchedQuery]);

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase())
            })
            setFilterJobs(filteredJobs)
        } else {
            setFilterJobs(allJobs)
        }
    }, [allJobs, searchedQuery]);

    return (
        <div 
            className="min-h-screen flex flex-col w-full overflow-x-hidden"
            style={{ backgroundColor: 'var(--bg-primary)' }}
        >
            <Navbar />
            
            {/* Main Content Container */}
            <div className='flex-1 w-full'>
                <div className='max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-3 xs:py-4 sm:py-5 md:py-6'>
                    {/* Search Results Header */}
                    {searchedQuery && (
                        <div className='mb-3 xs:mb-4 sm:mb-5 md:mb-6'>
                            <h1 
                                className='text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 xs:mb-2'
                                style={{ color: 'var(--text-primary)' }}
                            >
                                Search Results for "{searchedQuery}"
                            </h1>
                            <p 
                                className='text-sm xs:text-base sm:text-lg'
                                style={{ color: 'var(--text-secondary)' }}
                            >
                                Found {filterJobs.length} {filterJobs.length === 1 ? 'job' : 'jobs'}
                            </p>
                        </div>
                    )}
                    
                    {/* Main Content Area - Equal Height Columns */}
                    <div className='flex flex-col lg:flex-row gap-3 xs:gap-4 sm:gap-5 md:gap-6'>
                        {/* Filter Sidebar - Fixed Height, No Scroll, Sticky */}
                        <div className='w-full lg:w-64 xl:w-72 flex-shrink-0'>
                            <div className='lg:sticky lg:top-20'>
                                <FilterCard />
                            </div>
                        </div>
                        
                        {/* Jobs List Container - Same Height as Filter with Scroll */}
                        <div className='flex-1 min-w-0'>
                            <div 
                                className='h-auto lg:h-[calc(100vh-12rem)] flex flex-col'
                            >
                                {
                                    filterJobs.length <= 0 ? (
                                        <div className="flex-1 flex items-center justify-center">
                                            <div 
                                                className="text-center px-4 py-8 xs:py-10 sm:py-12 rounded-lg xs:rounded-xl border max-w-md"
                                                style={{ 
                                                    backgroundColor: 'var(--bg-secondary)',
                                                    borderColor: 'var(--border-color)'
                                                }}
                                            >
                                                <div 
                                                    className="w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 mx-auto mb-4 xs:mb-5 sm:mb-6 rounded-full flex items-center justify-center"
                                                    style={{ backgroundColor: 'var(--bg-tertiary)' }}
                                                >
                                                    <svg 
                                                        className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12" 
                                                        fill="none" 
                                                        stroke="currentColor" 
                                                        viewBox="0 0 24 24"
                                                        style={{ color: 'var(--text-secondary)' }}
                                                    >
                                                        <path 
                                                            strokeLinecap="round" 
                                                            strokeLinejoin="round" 
                                                            strokeWidth={2} 
                                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                                                        />
                                                    </svg>
                                                </div>
                                                <h3 
                                                    className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold mb-2 xs:mb-3"
                                                    style={{ color: 'var(--text-primary)' }}
                                                >
                                                    No jobs found
                                                </h3>
                                                <p 
                                                    className='text-xs xs:text-sm sm:text-base md:text-lg'
                                                    style={{ color: 'var(--text-secondary)' }}
                                                >
                                                    Try adjusting your search or filters to find what you're looking for
                                                </p>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            {/* Jobs Count Badge */}
                                            <div className="flex-shrink-0 mb-3 xs:mb-4 flex items-center justify-between">
                                                <div 
                                                    className="inline-flex items-center gap-2 px-3 xs:px-4 py-1.5 xs:py-2 rounded-full border"
                                                    style={{ 
                                                        backgroundColor: 'var(--bg-secondary)',
                                                        borderColor: 'var(--border-color)'
                                                    }}
                                                >
                                                    <span 
                                                        className="text-xs xs:text-sm font-semibold"
                                                        style={{ color: 'var(--text-primary)' }}
                                                    >
                                                        {filterJobs.length} Jobs Available
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Scrollable Jobs Grid - ONLY THIS SECTION SCROLLS */}
                                            <div 
                                                className='flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-rounded'
                                                style={{
                                                    scrollbarWidth: 'thin',
                                                    scrollbarColor: 'var(--border-color) transparent'
                                                }}
                                            >
                                                <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 xs:gap-4 sm:gap-5 md:gap-6 pb-4'>
                                                    {
                                                        filterJobs.map((job, index) => (
                                                            <motion.div
                                                                initial={{ opacity: 0, y: 20 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                exit={{ opacity: 0, y: -20 }}
                                                                transition={{ 
                                                                    duration: 0.3,
                                                                    delay: index * 0.05
                                                                }}
                                                                key={job?._id}
                                                                className="h-full"
                                                            >
                                                                <Job job={job} />
                                                            </motion.div>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Footer Below Main Content */}
            <Footer />
            
            {/* Custom Scrollbar Styles */}
            <style jsx>{`
                .scrollbar-thin::-webkit-scrollbar {
                    width: 8px;
                    height: 8px;
                }
                
                .scrollbar-thin::-webkit-scrollbar-track {
                    background: transparent;
                    border-radius: 10px;
                }
                
                .scrollbar-thin::-webkit-scrollbar-thumb {
                    background: var(--border-color);
                    border-radius: 10px;
                    transition: background 0.3s;
                }
                
                .scrollbar-thin::-webkit-scrollbar-thumb:hover {
                    background: var(--accent-primary);
                }
                
                @media (max-width: 640px) {
                    .scrollbar-thin::-webkit-scrollbar {
                        width: 4px;
                    }
                }
            `}</style>
        </div>
    )
}

export default Jobs


