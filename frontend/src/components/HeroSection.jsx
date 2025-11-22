import React, { useState, useRef, useCallback } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import Hyperspeed, { hyperspeedPresets } from './ui/Hyperspeed';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const debounceTimeout = useRef(null);

    // Debounced search function
    const debouncedDispatch = useCallback((value) => {
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }
        
        debounceTimeout.current = setTimeout(() => {
            dispatch(setSearchedQuery(value));
        }, 500); // 500ms delay
    }, [dispatch]);

    const handleQueryChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        debouncedDispatch(value);
    };

    const searchJobHandler = () => {
        if (query.trim()) {
            dispatch(setSearchedQuery(query));
            // Navigate to jobs page with query parameter for shareable/bookmarkable results
            navigate(`/jobs?query=${encodeURIComponent(query)}`);
        }
    };

    return (
        <div 
            className='relative overflow-hidden min-h-[500px] sm:min-h-[550px] md:min-h-[600px] lg:min-h-[650px] xl:min-h-[700px]'
            style={{ backgroundColor: 'var(--bg-primary)' }}
        >
            {/* ========== HYPERSPEED BACKGROUND ANIMATION ========== */}
            <div className='absolute inset-0 w-full h-full opacity-30 sm:opacity-35 md:opacity-40'>
                <Hyperspeed effectOptions={hyperspeedPresets.two} />
            </div>

            {/* Gradient Overlay */}
            <div 
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%)',
                    zIndex: 1,
                    pointerEvents: 'none'
                }}
            />

            {/* ========== HERO CONTENT ========== */}
            <div className='relative z-10 container mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12 lg:py-16 xl:py-20'>
                <div className='flex flex-col items-center justify-center text-center space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8'>
                    
                    {/* Badge */}
                    <span 
                        className='text-purple-600 inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-medium text-xs sm:text-sm md:text-base'
                        style={{ 
                            backgroundColor: 'var(--bg-tertiary)', 
                        }}
                    >
                        🚀 No. 1 Job Hunt Website
                    </span>
                    
                    {/* Main Heading */}
                    <h1 
                        className='text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight max-w-5xl px-2'
                        style={{ color: 'var(--text-primary)' }}
                    >
                        Search, Apply &{' '}
                        <br className="hidden sm:block" /> 
                        Get Your <span className='text-purple-600'>Dream Jobs</span>
                    </h1>
                    
                    {/* Subheading */}
                    <p 
                        className='text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-3xl px-4 leading-relaxed'
                        style={{ color: 'var(--text-secondary)' }}
                    >
                        Empowering Your Career Journey: Smarter Job Search, Faster Opportunities. 
                        Connect with top companies and unlock your potential.
                    </p>
                    
                    {/* Search Bar with Debounce */}
                    <div 
                        className='flex flex-col sm:flex-row w-full max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-3xl shadow-lg sm:shadow-xl md:shadow-2xl border rounded-2xl sm:rounded-full items-stretch sm:items-center gap-2 sm:gap-0 p-2 sm:pl-4 md:pl-6 mx-auto'
                        style={{ 
                            backgroundColor: 'var(--bg-secondary)', 
                            borderColor: 'var(--border-color)' 
                        }}
                    >
                        <input
                            type="text"
                            placeholder='Job title, keywords, or company...'
                            value={query}
                            onChange={handleQueryChange}
                            onKeyDown={(e) => e.key === 'Enter' && searchJobHandler()}
                            className='outline-none border-none w-full px-3 sm:px-4 py-2.5 sm:py-3 md:py-4 bg-transparent rounded-xl sm:rounded-none text-sm sm:text-base md:text-lg'
                            style={{ 
                                color: 'var(--text-primary)',
                            }}
                        />
                        <Button 
                            onClick={searchJobHandler} 
                            className="rounded-xl sm:rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 font-semibold text-sm sm:text-base w-full sm:w-auto"
                        >
                            <Search className='h-4 w-4 sm:h-5 sm:w-5 mr-2' />
                            Search
                        </Button>
                    </div>

                    {/* Quick Search Tags */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-2.5 justify-center max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-3xl px-2">
                        <span 
                            style={{ color: 'var(--text-primary)' }} 
                            className="text-xs sm:text-sm md:text-base font-medium"
                        >
                            Popular:
                        </span>
                        {['Frontend Developer', 'Data Science', 'UI/UX Designer', 'Backend Developer'].map((tag) => (
                            <button
                                key={tag}
                                onClick={() => {
                                    setQuery(tag);
                                    dispatch(setSearchedQuery(tag));
                                    navigate(`/jobs?query=${encodeURIComponent(tag)}`);
                                }}
                                className="px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm md:text-base hover:bg-purple-600 hover:text-white transition-all duration-200 hover:scale-105 whitespace-nowrap"
                                style={{ 
                                    backgroundColor: 'var(--bg-tertiary)',
                                    color: 'var(--text-secondary)'
                                }}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection
