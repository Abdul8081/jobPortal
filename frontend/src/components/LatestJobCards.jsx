import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import TiltCard from './ui/TiltCard'
import { MapPin, Briefcase, DollarSign } from 'lucide-react'

const LatestJobCards = ({job}) => {
    const navigate = useNavigate();
    return (
        <TiltCard 
            className="cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 border h-full flex flex-col"
            style={{ 
                backgroundColor: 'var(--bg-secondary)',
                borderColor: 'var(--border-color)'
            }}
        >
            <div 
                onClick={() => navigate(`/description/${job._id}`)} 
                className='p-3 xs:p-4 sm:p-5 md:p-6 flex flex-col h-full'
            >
                {/* Company Info */}
                <div className="mb-2 sm:mb-3 md:mb-4">
                    <h1 
                        className='font-semibold text-sm xs:text-base sm:text-lg md:text-xl truncate'
                        style={{ color: 'var(--text-primary)' }}
                    >
                        {job?.company?.name}
                    </h1>
                    <div 
                        className="flex items-center gap-1 text-xs sm:text-sm md:text-base mt-0.5 sm:mt-1"
                        style={{ color: 'var(--text-secondary)' }}
                    >
                        <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 flex-shrink-0" style={{ color: 'var(--text-secondary)' }} />
                        <span className="truncate">{job?.location || 'India'}</span>
                    </div>
                </div>
                
                {/* Job Title and Description */}
                <div className="mb-3 sm:mb-4 md:mb-5 flex-1">
                    <h1 
                        className='font-bold text-base xs:text-lg sm:text-xl md:text-2xl mb-1.5 sm:mb-2 line-clamp-1'
                        style={{ color: 'var(--text-primary)' }}
                    >
                        {job?.title}
                    </h1>
                    <p 
                        className='text-xs sm:text-sm md:text-base line-clamp-2 leading-relaxed'
                        style={{ color: 'var(--text-secondary)' }}
                    >
                        {job?.description}
                    </p>
                </div>
                
                {/* Badges */}
                <div className='flex flex-wrap items-center gap-1.5 sm:gap-2 md:gap-2.5 mt-auto'>
                    <Badge 
                        className='font-semibold text-[10px] xs:text-xs sm:text-sm border px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 whitespace-nowrap'
                        variant="secondary"
                        style={{ 
                            backgroundColor: 'var(--bg-tertiary)',
                            color: 'var(--text-primary)',
                            borderColor: 'var(--border-color)'
                        }}
                    >
                        <Briefcase className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5 mr-1" style={{ color: 'var(--text-primary)' }} />
                        <span>{job?.position} Positions</span>
                    </Badge>
                    <Badge 
                        className='font-semibold text-[10px] xs:text-xs sm:text-sm border px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 whitespace-nowrap'
                        variant="secondary"
                        style={{ 
                            backgroundColor: 'var(--bg-tertiary)',
                            color: 'var(--text-primary)',
                            borderColor: 'var(--border-color)'
                        }}
                    >
                        {job?.jobType}
                    </Badge>
                    <Badge 
                        className='font-semibold text-[10px] xs:text-xs sm:text-sm border px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 whitespace-nowrap'
                        variant="secondary"
                        style={{ 
                            backgroundColor: 'var(--bg-tertiary)',
                            color: 'var(--text-primary)',
                            borderColor: 'var(--border-color)'
                        }}
                    >
                        <DollarSign className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5 mr-1" style={{ color: 'var(--text-primary)' }} />
                        <span>{job?.salary} LPA</span>
                    </Badge>
                </div>
            </div>
        </TiltCard>
    )
}

export default LatestJobCards
