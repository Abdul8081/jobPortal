// import React, { useEffect, useState } from 'react'
// import { RadioGroup, RadioGroupItem } from './ui/radio-group'
// import { Label } from './ui/label'
// import { useDispatch } from 'react-redux'
// import { setSearchedQuery } from '@/redux/jobSlice'

// const fitlerData = [
//     {
//         fitlerType: "Location",
//         array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
//     },
//     {
//         fitlerType: "Industry",
//         array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
//     },
//     {
//         fitlerType: "Salary",
//         array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
//     },
// ]

// const FilterCard = () => {
//     const [selectedValue, setSelectedValue] = useState('');
//     const dispatch = useDispatch();
    
//     const changeHandler = (value) => {
//         setSelectedValue(value);
//     }
    
//     useEffect(()=>{
//         dispatch(setSearchedQuery(selectedValue));
//     },[selectedValue]);
    
//     return (
//         <div 
//             className='w-full p-3 sm:p-4 md:p-5 lg:p-6 rounded-lg shadow-sm border mb-4 sm:mb-5 md:mb-6'
//             style={{ 
//                 backgroundColor: 'var(--bg-secondary)', 
//                 borderColor: 'var(--border-color)' 
//             }}
//         >
//             <h1 
//                 className='font-bold text-base sm:text-lg md:text-xl'
//                 style={{ color: 'var(--text-primary)' }}
//             >
//                 Filter Jobs
//             </h1>
//             <hr 
//                 className='mt-2 sm:mt-3'
//                 style={{ borderColor: 'var(--border-color)' }}
//             />
//             <RadioGroup value={selectedValue} onValueChange={changeHandler}>
//                 {
//                     fitlerData.map((data, index) => (
//                         <div key={index} className='mt-3 sm:mt-4 md:mt-5'>
//                             <h1 
//                                 className='font-bold text-sm sm:text-base md:text-lg mb-2 sm:mb-2.5 md:mb-3'
//                                 style={{ color: 'var(--text-primary)' }}
//                             >
//                                 {data.fitlerType}
//                             </h1>
//                             {
//                                 data.array.map((item, idx) => {
//                                     const itemId = `id${index}-${idx}`
//                                     return (
//                                         <div 
//                                             key={itemId} 
//                                             className='flex items-center space-x-2 sm:space-x-2.5 md:space-x-3 my-1.5 sm:my-2 md:my-2.5 py-1'
//                                         >
//                                             <RadioGroupItem 
//                                                 value={item} 
//                                                 id={itemId}
//                                                 className="h-4 w-4 sm:h-4.5 sm:w-4.5 md:h-5 md:w-5"
//                                             />
//                                             <Label 
//                                                 htmlFor={itemId} 
//                                                 className='text-xs sm:text-sm md:text-base cursor-pointer leading-relaxed'
//                                                 style={{ color: 'var(--text-secondary)' }}
//                                             >
//                                                 {item}
//                                             </Label>
//                                         </div>
//                                     )
//                                 })
//                             }
//                         </div>
//                     ))
//                 }
//             </RadioGroup>
//         </div>
//     )
// }

// export default FilterCard


import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { Button } from './ui/button'
import { X, SlidersHorizontal } from 'lucide-react'

const fitlerData = [
    {
        fitlerType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        fitlerType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        fitlerType: "Salary",
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
    },
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    
    const changeHandler = (value) => {
        setSelectedValue(value);
    }

    const clearFilters = () => {
        setSelectedValue('');
        dispatch(setSearchedQuery(''));
    }
    
    useEffect(()=>{
        dispatch(setSearchedQuery(selectedValue));
    },[selectedValue]);
    
    return (
        <>
            {/* Mobile Filter Toggle Button */}
            <Button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden w-full mb-3 xs:mb-4 flex items-center justify-center gap-2 h-10 xs:h-11 text-sm xs:text-base"
                variant="outline"
                style={{ borderColor: 'var(--border-color)' }}
            >
                <SlidersHorizontal className="h-4 w-4" />
                {isOpen ? 'Hide Filters' : 'Show Filters'}
                {selectedValue && (
                    <span 
                        className="ml-2 px-2 py-0.5 rounded-full text-xs"
                        style={{ 
                            backgroundColor: 'var(--accent-primary)',
                            color: 'white'
                        }}
                    >
                        1
                    </span>
                )}
            </Button>

            {/* Filter Card */}
            <div 
                className={`w-full p-3 xs:p-4 sm:p-5 lg:p-6 rounded-lg xs:rounded-xl shadow-sm border transition-all duration-300 ${
                    isOpen ? 'block' : 'hidden lg:block'
                }`}
                style={{ 
                    backgroundColor: 'var(--bg-secondary)', 
                    borderColor: 'var(--border-color)' 
                }}
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-3 xs:mb-4">
                    <h1 
                        className='font-bold text-base xs:text-lg sm:text-xl'
                        style={{ color: 'var(--text-primary)' }}
                    >
                        Filter Jobs
                    </h1>
                    {selectedValue && (
                        <Button
                            onClick={clearFilters}
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2 xs:px-3 text-xs xs:text-sm hover:bg-opacity-10 hover:bg-red-600"
                            style={{ color: 'var(--text-secondary)' }}
                        >
                            <X className="h-3 w-3 xs:h-4 xs:w-4 mr-1" />
                            Clear
                        </Button>
                    )}
                </div>
                
                <hr 
                    className='mb-3 xs:mb-4'
                    style={{ borderColor: 'var(--border-color)' }}
                />
                
                {/* Filter Options */}
                <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                    <div className="space-y-4 xs:space-y-5 sm:space-y-6">
                        {
                            fitlerData.map((data, index) => (
                                <div key={index}>
                                    <h2 
                                        className='font-semibold text-sm xs:text-base sm:text-lg mb-2 xs:mb-2.5 sm:mb-3'
                                        style={{ color: 'var(--text-primary)' }}
                                    >
                                        {data.fitlerType}
                                    </h2>
                                    <div className="space-y-1.5 xs:space-y-2">
                                        {
                                            data.array.map((item, idx) => {
                                                const itemId = `id${index}-${idx}`
                                                const isSelected = selectedValue === item;
                                                return (
                                                    <div 
                                                        key={itemId} 
                                                        className={`flex items-center space-x-2 xs:space-x-2.5 sm:space-x-3 py-1.5 xs:py-2 px-2 xs:px-2.5 sm:px-3 rounded-md transition-all cursor-pointer hover:bg-opacity-5 hover:bg-purple-600 ${
                                                            isSelected ? 'bg-opacity-10 bg-purple-600' : ''
                                                        }`}
                                                        onClick={() => changeHandler(item)}
                                                        style={{
                                                            backgroundColor: isSelected ? 'rgba(147, 51, 234, 0.1)' : 'transparent'
                                                        }}
                                                    >
                                                        <RadioGroupItem 
                                                            value={item} 
                                                            id={itemId}
                                                            className="h-4 w-4 xs:h-4.5 xs:w-4.5 sm:h-5 sm:w-5 flex-shrink-0"
                                                        />
                                                        <Label 
                                                            htmlFor={itemId} 
                                                            className='text-xs xs:text-sm sm:text-base cursor-pointer leading-relaxed flex-1'
                                                            style={{ 
                                                                color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)',
                                                                fontWeight: isSelected ? '500' : '400'
                                                            }}
                                                        >
                                                            {item}
                                                        </Label>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </RadioGroup>

                {/* Mobile Apply Button */}
                {selectedValue && (
                    <Button
                        onClick={() => setIsOpen(false)}
                        className="lg:hidden w-full mt-4 xs:mt-5 bg-purple-600 hover:bg-purple-700 h-10 xs:h-11 text-sm xs:text-base"
                    >
                        Apply Filter
                    </Button>
                )}
            </div>
        </>
    )
}

export default FilterCard
