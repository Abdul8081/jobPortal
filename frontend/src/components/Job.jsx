import React from 'react'
import { Button } from './ui/button'
import { Bookmark, MapPin, Briefcase, DollarSign } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import TiltCard from './ui/TiltCard'

const Job = ({job}) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference/(1000*24*60*60));
    }
    
    return (
        <TiltCard 
            className="border h-full flex flex-col rounded-lg sm:rounded-xl transition-all duration-300"
            style={{ 
                backgroundColor: 'var(--bg-secondary)', 
                borderColor: 'var(--border-color)' 
            }}
        >
            <div className='p-3 xs:p-4 sm:p-5 md:p-6 flex flex-col h-full'>
                {/* Header: Date and Bookmark */}
                <div className='flex items-center justify-between mb-3 xs:mb-3.5 sm:mb-4'>
                    <p 
                        className='text-xs xs:text-sm sm:text-base font-medium'
                        style={{ color: 'var(--text-secondary)' }}
                    >
                        {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}
                    </p>
                    <Button 
                        variant="outline" 
                        className="rounded-full min-h-[36px] min-w-[36px] h-9 w-9 sm:h-10 sm:w-10 p-0 hover:bg-opacity-10 hover:bg-purple-600 transition-all active:scale-95" 
                        size="icon"
                        style={{ 
                            borderColor: 'var(--border-color)',
                        }}
                        aria-label="Bookmark job"
                    >
                        <Bookmark className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
                    </Button>
                </div>

                {/* Company Info */}
                <div className='flex items-start gap-2 xs:gap-3 sm:gap-4 mb-3 xs:mb-3.5 sm:mb-4'>
                    <Avatar 
                        className="h-12 w-12 xs:h-14 xs:w-14 sm:h-16 sm:w-16 border-2 flex-shrink-0 ring-2 ring-offset-2 ring-transparent hover:ring-purple-600 transition-all"
                        style={{ 
                            borderColor: 'var(--border-color)',
                            ringOffsetColor: 'var(--bg-secondary)'
                        }}
                    >
                        <AvatarImage src={job?.company?.logo} alt={job?.company?.name} />
                    </Avatar>
                    <div className="flex-1 min-w-0">
                        <h2 
                            className='font-semibold text-sm xs:text-base sm:text-lg md:text-xl truncate'
                            style={{ color: 'var(--text-primary)' }}
                        >
                            {job?.company?.name}
                        </h2>
                        <div 
                            className="flex items-center gap-1 xs:gap-1.5 text-xs xs:text-sm sm:text-base mt-0.5 xs:mt-1"
                            style={{ color: 'var(--text-secondary)' }}
                        >
                            <MapPin className="h-3 w-3 xs:h-3.5 xs:w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                            <span className="truncate">{job?.location || 'India'}</span>
                        </div>
                    </div>
                </div>

                {/* Job Title and Description */}
                <div className="mb-3 xs:mb-3.5 sm:mb-4 flex-1">
                    <h1 
                        className='font-bold text-base xs:text-lg sm:text-xl md:text-2xl mb-2 xs:mb-2.5 line-clamp-2 leading-tight'
                        style={{ color: 'var(--text-primary)' }}
                    >
                        {job?.title}
                    </h1>
                    <div 
                        className="rounded-md sm:rounded-lg p-2 xs:p-2.5 sm:p-3 md:p-3.5 max-h-16 xs:max-h-20 sm:max-h-24 overflow-y-auto scrollbar-thin"
                        style={{ backgroundColor: 'var(--bg-tertiary)' }}
                    >
                        <p 
                            className='text-xs xs:text-sm sm:text-base line-clamp-3 leading-relaxed'
                            style={{ color: 'var(--text-secondary)' }}
                        >
                            {job?.description}
                        </p>
                    </div>
                </div>

                {/* Badges */}
                <div className='flex flex-wrap items-center gap-1.5 xs:gap-2 sm:gap-2.5 mb-3 xs:mb-3.5 sm:mb-4'>
                    <Badge 
                        className='font-semibold text-[10px] xs:text-xs sm:text-sm border px-2 xs:px-2.5 sm:px-3 py-1 xs:py-1.5 flex items-center gap-1'
                        variant="secondary"
                        style={{ 
                            backgroundColor: 'var(--bg-tertiary)',
                            color: 'var(--text-primary)',
                            borderColor: 'var(--border-color)'
                        }}
                    >
                        <Briefcase className="h-2.5 w-2.5 xs:h-3 xs:w-3 sm:h-3.5 sm:w-3.5 flex-shrink-0" style={{ color: 'var(--text-primary)' }} />
                        <span className="whitespace-nowrap">{job?.position} Position{job?.position > 1 ? 's' : ''}</span>
                    </Badge>
                    <Badge 
                        className='font-semibold text-[10px] xs:text-xs sm:text-sm border px-2 xs:px-2.5 sm:px-3 py-1 xs:py-1.5 whitespace-nowrap'
                        variant="secondary"
                        style={{ 
                            backgroundColor: 'var(--bg-tertiary)',
                            color: 'var(--accent-primary)',
                            borderColor: 'var(--border-color)'
                        }}
                    >
                        {job?.jobType}
                    </Badge>
                    <Badge 
                        className='font-semibold text-[10px] xs:text-xs sm:text-sm border px-2 xs:px-2.5 sm:px-3 py-1 xs:py-1.5 flex items-center gap-1'
                        variant="secondary"
                        style={{ 
                            backgroundColor: 'var(--bg-tertiary)',
                            color: 'var(--text-primary)',
                            borderColor: 'var(--border-color)'
                        }}
                    >
                        <DollarSign className="h-2.5 w-2.5 xs:h-3 xs:w-3 sm:h-3.5 sm:w-3.5 flex-shrink-0" style={{ color: 'var(--text-primary)' }} />
                        <span className="whitespace-nowrap">{job?.salary} LPA</span>
                    </Badge>
                </div>

                {/* Action Buttons */}
                <div className='flex flex-col xs:flex-row items-stretch gap-2 xs:gap-2.5 sm:gap-3 mt-auto'>
                    <Button 
                        onClick={() => navigate(`/description/${job?._id}`)} 
                        variant="outline"
                        className="flex-1 hover:scale-105 active:scale-95 transition-transform text-xs xs:text-sm sm:text-base h-9 xs:h-10 sm:h-11 font-semibold"
                        style={{ 
                            borderColor: 'var(--border-color)',
                            color: 'var(--text-primary)',
                            backgroundColor: 'var(--bg-tertiary)',
                        }}
                    >
                        View Details
                    </Button>
                    <Button 
                        className="flex-1 bg-purple-600 hover:bg-purple-700 hover:scale-105 active:scale-95 transition-transform text-xs xs:text-sm sm:text-base h-9 xs:h-10 sm:h-11 font-semibold"
                    >
                        Save For Later
                    </Button>
                </div>
            </div>
        </TiltCard>
    )
}

export default Job
