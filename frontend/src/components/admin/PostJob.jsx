// import React, { useState } from 'react'
// import Navbar from '../shared/Navbar'
// import { Label } from '../ui/label'
// import { Input } from '../ui/input'
// import { Button } from '../ui/button'
// import { useSelector } from 'react-redux'
// import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
// import axios from 'axios'
// import { JOB_API_END_POINT } from '@/utils/constant'
// import { toast } from 'sonner'
// import { useNavigate } from 'react-router-dom'
// import { Loader2 } from 'lucide-react'

// const PostJob = () => {
//     const [input, setInput] = useState({
//         title: "",
//         description: "",
//         requirements: "",
//         salary: "",
//         location: "",
//         jobType: "",
//         experience: "",
//         position: 0,
//         companyId: ""
//     });
//     const [loading, setLoading]= useState(false);
//     const navigate = useNavigate();

//     const { companies } = useSelector(store => store.company);
    
//     const changeEventHandler = (e) => {
//         setInput({ ...input, [e.target.name]: e.target.value });
//     };

//     const selectChangeHandler = (value) => {
//         const selectedCompany = companies.find((company)=> company.name.toLowerCase() === value);
//         setInput({...input, companyId:selectedCompany._id});
//     };

//     const submitHandler = async (e) => {
//         e.preventDefault();
//         try {
//             setLoading(true);
//             const res = await axios.post(`${JOB_API_END_POINT}/post`, input,{
//                 headers:{
//                     'Content-Type':'application/json'
//                 },
//                 withCredentials:true
//             });
//             if(res.data.success){
//                 toast.success(res.data.message);
//                 navigate("/admin/jobs");
//             }
//         } catch (error) {
//             toast.error(error.response.data.message);
//         } finally{
//             setLoading(false);
//         }
//     }

//     return (
//         <div 
//             className="min-h-screen w-full overflow-x-hidden"
//             style={{ backgroundColor: 'var(--bg-primary)' }}
//         >
//             <Navbar />
//             <div className='w-full px-3 xs:px-4 sm:px-6 lg:px-8 py-4 xs:py-6 sm:py-8 md:py-10'>
//                 <div className='max-w-4xl mx-auto'>
//                     {/* Page Header */}
//                     <div className='mb-4 xs:mb-5 sm:mb-6 md:mb-8'>
//                         <h1 
//                             className='text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold mb-2 xs:mb-3'
//                             style={{ color: 'var(--text-primary)' }}
//                         >
//                             Post a New Job
//                         </h1>
//                         <p 
//                             className='text-sm xs:text-base sm:text-lg'
//                             style={{ color: 'var(--text-secondary)' }}
//                         >
//                             Fill in the details below to create a new job posting
//                         </p>
//                     </div>

//                     {/* Form Container */}
//                     <form 
//                         onSubmit={submitHandler} 
//                         className='p-4 xs:p-6 sm:p-8 border rounded-lg xs:rounded-xl shadow-lg'
//                         style={{ 
//                             backgroundColor: 'var(--bg-secondary)', 
//                             borderColor: 'var(--border-color)' 
//                         }}
//                     >
//                         {/* Form Fields Grid */}
//                         <div className='grid grid-cols-1 md:grid-cols-2 gap-4 xs:gap-5 sm:gap-6'>
//                             {/* Title */}
//                             <div className="space-y-2">
//                                 <Label 
//                                     className="text-sm xs:text-base font-medium"
//                                     style={{ color: 'var(--text-primary)' }}
//                                 >
//                                     Job Title
//                                 </Label>
//                                 <Input
//                                     type="text"
//                                     name="title"
//                                     value={input.title}
//                                     onChange={changeEventHandler}
//                                     className="h-10 xs:h-11 sm:h-12 text-sm xs:text-base"
//                                     placeholder="e.g., Senior Software Engineer"
//                                     required
//                                     style={{ 
//                                         backgroundColor: 'var(--bg-primary)', 
//                                         color: 'var(--text-primary)',
//                                         borderColor: 'var(--border-color)'
//                                     }}
//                                 />
//                             </div>

//                             {/* Description */}
//                             <div className="space-y-2">
//                                 <Label 
//                                     className="text-sm xs:text-base font-medium"
//                                     style={{ color: 'var(--text-primary)' }}
//                                 >
//                                     Description
//                                 </Label>
//                                 <Input
//                                     type="text"
//                                     name="description"
//                                     value={input.description}
//                                     onChange={changeEventHandler}
//                                     className="h-10 xs:h-11 sm:h-12 text-sm xs:text-base"
//                                     placeholder="Brief job description"
//                                     required
//                                     style={{ 
//                                         backgroundColor: 'var(--bg-primary)', 
//                                         color: 'var(--text-primary)',
//                                         borderColor: 'var(--border-color)'
//                                     }}
//                                 />
//                             </div>

//                             {/* Requirements */}
//                             <div className="space-y-2">
//                                 <Label 
//                                     className="text-sm xs:text-base font-medium"
//                                     style={{ color: 'var(--text-primary)' }}
//                                 >
//                                     Requirements
//                                 </Label>
//                                 <Input
//                                     type="text"
//                                     name="requirements"
//                                     value={input.requirements}
//                                     onChange={changeEventHandler}
//                                     className="h-10 xs:h-11 sm:h-12 text-sm xs:text-base"
//                                     placeholder="Required skills, comma separated"
//                                     required
//                                     style={{ 
//                                         backgroundColor: 'var(--bg-primary)', 
//                                         color: 'var(--text-primary)',
//                                         borderColor: 'var(--border-color)'
//                                     }}
//                                 />
//                             </div>

//                             {/* Salary */}
//                             <div className="space-y-2">
//                                 <Label 
//                                     className="text-sm xs:text-base font-medium"
//                                     style={{ color: 'var(--text-primary)' }}
//                                 >
//                                     Salary (Annual)
//                                 </Label>
//                                 <Input
//                                     type="number"
//                                     name="salary"
//                                     value={input.salary}
//                                     onChange={changeEventHandler}
//                                     className="h-10 xs:h-11 sm:h-12 text-sm xs:text-base"
//                                     placeholder="e.g., 100000"
//                                     required
//                                     style={{ 
//                                         backgroundColor: 'var(--bg-primary)', 
//                                         color: 'var(--text-primary)',
//                                         borderColor: 'var(--border-color)'
//                                     }}
//                                 />
//                             </div>

//                             {/* Location */}
//                             <div className="space-y-2">
//                                 <Label 
//                                     className="text-sm xs:text-base font-medium"
//                                     style={{ color: 'var(--text-primary)' }}
//                                 >
//                                     Location
//                                 </Label>
//                                 <Input
//                                     type="text"
//                                     name="location"
//                                     value={input.location}
//                                     onChange={changeEventHandler}
//                                     className="h-10 xs:h-11 sm:h-12 text-sm xs:text-base"
//                                     placeholder="City, Country"
//                                     required
//                                     style={{ 
//                                         backgroundColor: 'var(--bg-primary)', 
//                                         color: 'var(--text-primary)',
//                                         borderColor: 'var(--border-color)'
//                                     }}
//                                 />
//                             </div>

//                             {/* Job Type */}
//                             <div className="space-y-2">
//                                 <Label 
//                                     className="text-sm xs:text-base font-medium"
//                                     style={{ color: 'var(--text-primary)' }}
//                                 >
//                                     Job Type
//                                 </Label>
//                                 <Input
//                                     type="text"
//                                     name="jobType"
//                                     value={input.jobType}
//                                     onChange={changeEventHandler}
//                                     className="h-10 xs:h-11 sm:h-12 text-sm xs:text-base"
//                                     placeholder="Full-time, Part-time, etc."
//                                     required
//                                     style={{ 
//                                         backgroundColor: 'var(--bg-primary)', 
//                                         color: 'var(--text-primary)',
//                                         borderColor: 'var(--border-color)'
//                                     }}
//                                 />
//                             </div>

//                             {/* Experience Level */}
//                             <div className="space-y-2">
//                                 <Label 
//                                     className="text-sm xs:text-base font-medium"
//                                     style={{ color: 'var(--text-primary)' }}
//                                 >
//                                     Experience Level
//                                 </Label>
//                                 <Input
//                                     type="text"
//                                     name="experience"
//                                     value={input.experience}
//                                     onChange={changeEventHandler}
//                                     className="h-10 xs:h-11 sm:h-12 text-sm xs:text-base"
//                                     placeholder="e.g., 3-5 years"
//                                     required
//                                     style={{ 
//                                         backgroundColor: 'var(--bg-primary)', 
//                                         color: 'var(--text-primary)',
//                                         borderColor: 'var(--border-color)'
//                                     }}
//                                 />
//                             </div>

//                             {/* Number of Positions */}
//                             <div className="space-y-2">
//                                 <Label 
//                                     className="text-sm xs:text-base font-medium"
//                                     style={{ color: 'var(--text-primary)' }}
//                                 >
//                                     Number of Positions
//                                 </Label>
//                                 <Input
//                                     type="number"
//                                     name="position"
//                                     value={input.position}
//                                     onChange={changeEventHandler}
//                                     className="h-10 xs:h-11 sm:h-12 text-sm xs:text-base"
//                                     placeholder="How many openings?"
//                                     required
//                                     style={{ 
//                                         backgroundColor: 'var(--bg-primary)', 
//                                         color: 'var(--text-primary)',
//                                         borderColor: 'var(--border-color)'
//                                     }}
//                                 />
//                             </div>

//                             {/* Company Select */}
//                             {companies.length > 0 && (
//                                 <div className="space-y-2">
//                                     <Label 
//                                         className="text-sm xs:text-base font-medium"
//                                         style={{ color: 'var(--text-primary)' }}
//                                     >
//                                         Select Company
//                                     </Label>
//                                     <Select onValueChange={selectChangeHandler}>
//                                         <SelectTrigger 
//                                             className="w-full h-10 xs:h-11 sm:h-12 text-sm xs:text-base"
//                                             style={{ 
//                                                 backgroundColor: 'var(--bg-primary)', 
//                                                 color: 'var(--text-primary)',
//                                                 borderColor: 'var(--border-color)'
//                                             }}
//                                         >
//                                             <SelectValue placeholder="Choose a company" />
//                                         </SelectTrigger>
//                                         <SelectContent
//                                             style={{ 
//                                                 backgroundColor: 'var(--bg-secondary)', 
//                                                 borderColor: 'var(--border-color)'
//                                             }}
//                                         >
//                                             <SelectGroup>
//                                                 {companies.map((company) => (
//                                                     <SelectItem 
//                                                         key={company._id}
//                                                         value={company?.name?.toLowerCase()}
//                                                         className="text-sm xs:text-base"
//                                                         style={{ color: 'var(--text-primary)' }}
//                                                     >
//                                                         {company.name}
//                                                     </SelectItem>
//                                                 ))}
//                                             </SelectGroup>
//                                         </SelectContent>
//                                     </Select>
//                                 </div>
//                             )}
//                         </div>

//                         {/* Warning Message */}
//                         {companies.length === 0 && (
//                             <div 
//                                 className='mt-6 p-3 xs:p-4 rounded-lg border border-red-500 bg-red-50 dark:bg-red-900/20'
//                             >
//                                 <p 
//                                     className='text-xs xs:text-sm font-semibold text-center'
//                                     style={{ color: '#ef4444' }}
//                                 >
//                                     ⚠️ Please register a company first before posting jobs
//                                 </p>
//                             </div>
//                         )}

//                         {/* Submit Button */}
//                         <div className="mt-6 xs:mt-8">
//                             {loading ? (
//                                 <Button 
//                                     disabled
//                                     className="w-full h-11 xs:h-12 sm:h-13 text-sm xs:text-base font-semibold"
//                                 > 
//                                     <Loader2 className='mr-2 h-4 w-4 animate-spin' /> 
//                                     Posting Job...
//                                 </Button>
//                             ) : (
//                                 <Button 
//                                     type="submit" 
//                                     className="w-full bg-purple-600 hover:bg-purple-700 h-11 xs:h-12 sm:h-13 text-sm xs:text-base font-semibold"
//                                     disabled={companies.length === 0}
//                                 >
//                                     Post New Job
//                                 </Button>
//                             )}
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default PostJob


import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });
    const [loading, setLoading]= useState(false);
    const navigate = useNavigate();

    const { companies } = useSelector(store => store.company);
    
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company)=> company.name.toLowerCase() === value);
        setInput({...input, companyId:selectedCompany._id});
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input,{
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });
            if(res.data.success){
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally{
            setLoading(false);
        }
    }

    return (
        <div 
            className="min-h-screen w-full overflow-x-hidden"
            style={{ backgroundColor: 'var(--bg-primary)' }}
        >
            <Navbar />
            <div className='w-full px-3 xs:px-4 sm:px-6 lg:px-8 py-4 xs:py-6 sm:py-8 md:py-10'>
                <div className='max-w-4xl mx-auto'>
                    {/* Page Header */}
                    <div className='mb-4 xs:mb-5 sm:mb-6 md:mb-8'>
                        <h1 
                            className='text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold mb-2 xs:mb-3'
                            style={{ color: 'var(--text-primary)' }}
                        >
                            Post a New Job
                        </h1>
                        <p 
                            className='text-sm xs:text-base sm:text-lg'
                            style={{ color: 'var(--text-secondary)' }}
                        >
                            Fill in the details below to create a new job posting
                        </p>
                    </div>

                    {/* Form Container */}
                    <form 
                        onSubmit={submitHandler} 
                        className='p-4 xs:p-6 sm:p-8 border rounded-lg xs:rounded-xl shadow-lg'
                        style={{ 
                            backgroundColor: 'var(--bg-secondary)', 
                            borderColor: 'var(--border-color)' 
                        }}
                    >
                        {/* Form Fields Grid */}
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 xs:gap-5 sm:gap-6'>
                            {/* Title */}
                            <div className="space-y-2">
                                <Label 
                                    className="text-sm xs:text-base font-medium"
                                    style={{ color: 'var(--text-primary)' }}
                                >
                                    Job Title
                                </Label>
                                <Input
                                    type="text"
                                    name="title"
                                    value={input.title}
                                    onChange={changeEventHandler}
                                    className="h-10 xs:h-11 sm:h-12 text-sm xs:text-base"
                                    placeholder="e.g., Senior Software Engineer"
                                    required
                                    style={{ 
                                        backgroundColor: 'var(--bg-primary)', 
                                        color: 'var(--text-primary)',
                                        borderColor: 'var(--border-color)'
                                    }}
                                />
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <Label 
                                    className="text-sm xs:text-base font-medium"
                                    style={{ color: 'var(--text-primary)' }}
                                >
                                    Description
                                </Label>
                                <Input
                                    type="text"
                                    name="description"
                                    value={input.description}
                                    onChange={changeEventHandler}
                                    className="h-10 xs:h-11 sm:h-12 text-sm xs:text-base"
                                    placeholder="Brief job description"
                                    required
                                    style={{ 
                                        backgroundColor: 'var(--bg-primary)', 
                                        color: 'var(--text-primary)',
                                        borderColor: 'var(--border-color)'
                                    }}
                                />
                            </div>

                            {/* Requirements */}
                            <div className="space-y-2">
                                <Label 
                                    className="text-sm xs:text-base font-medium"
                                    style={{ color: 'var(--text-primary)' }}
                                >
                                    Requirements
                                </Label>
                                <Input
                                    type="text"
                                    name="requirements"
                                    value={input.requirements}
                                    onChange={changeEventHandler}
                                    className="h-10 xs:h-11 sm:h-12 text-sm xs:text-base"
                                    placeholder="Required skills, comma separated"
                                    required
                                    style={{ 
                                        backgroundColor: 'var(--bg-primary)', 
                                        color: 'var(--text-primary)',
                                        borderColor: 'var(--border-color)'
                                    }}
                                />
                            </div>

                            {/* Salary */}
                            <div className="space-y-2">
                                <Label 
                                    className="text-sm xs:text-base font-medium"
                                    style={{ color: 'var(--text-primary)' }}
                                >
                                    Salary (Annual)
                                </Label>
                                <Input
                                    type="number"
                                    name="salary"
                                    value={input.salary}
                                    onChange={changeEventHandler}
                                    className="h-10 xs:h-11 sm:h-12 text-sm xs:text-base"
                                    placeholder="e.g., 100000"
                                    required
                                    style={{ 
                                        backgroundColor: 'var(--bg-primary)', 
                                        color: 'var(--text-primary)',
                                        borderColor: 'var(--border-color)'
                                    }}
                                />
                            </div>

                            {/* Location */}
                            <div className="space-y-2">
                                <Label 
                                    className="text-sm xs:text-base font-medium"
                                    style={{ color: 'var(--text-primary)' }}
                                >
                                    Location
                                </Label>
                                <Input
                                    type="text"
                                    name="location"
                                    value={input.location}
                                    onChange={changeEventHandler}
                                    className="h-10 xs:h-11 sm:h-12 text-sm xs:text-base"
                                    placeholder="City, Country"
                                    required
                                    style={{ 
                                        backgroundColor: 'var(--bg-primary)', 
                                        color: 'var(--text-primary)',
                                        borderColor: 'var(--border-color)'
                                    }}
                                />
                            </div>

                            {/* Job Type */}
                            <div className="space-y-2">
                                <Label 
                                    className="text-sm xs:text-base font-medium"
                                    style={{ color: 'var(--text-primary)' }}
                                >
                                    Job Type
                                </Label>
                                <Input
                                    type="text"
                                    name="jobType"
                                    value={input.jobType}
                                    onChange={changeEventHandler}
                                    className="h-10 xs:h-11 sm:h-12 text-sm xs:text-base"
                                    placeholder="Full-time, Part-time, etc."
                                    required
                                    style={{ 
                                        backgroundColor: 'var(--bg-primary)', 
                                        color: 'var(--text-primary)',
                                        borderColor: 'var(--border-color)'
                                    }}
                                />
                            </div>

                            {/* Experience Level */}
                            <div className="space-y-2">
                                <Label 
                                    className="text-sm xs:text-base font-medium"
                                    style={{ color: 'var(--text-primary)' }}
                                >
                                    Experience Level
                                </Label>
                                <Input
                                    type="text"
                                    name="experience"
                                    value={input.experience}
                                    onChange={changeEventHandler}
                                    className="h-10 xs:h-11 sm:h-12 text-sm xs:text-base"
                                    placeholder="e.g., 3-5 years"
                                    required
                                    style={{ 
                                        backgroundColor: 'var(--bg-primary)', 
                                        color: 'var(--text-primary)',
                                        borderColor: 'var(--border-color)'
                                    }}
                                />
                            </div>

                            {/* Number of Positions */}
                            <div className="space-y-2">
                                <Label 
                                    className="text-sm xs:text-base font-medium"
                                    style={{ color: 'var(--text-primary)' }}
                                >
                                    Number of Positions
                                </Label>
                                <Input
                                    type="number"
                                    name="position"
                                    value={input.position}
                                    onChange={changeEventHandler}
                                    className="h-10 xs:h-11 sm:h-12 text-sm xs:text-base"
                                    placeholder="How many openings?"
                                    required
                                    style={{ 
                                        backgroundColor: 'var(--bg-primary)', 
                                        color: 'var(--text-primary)',
                                        borderColor: 'var(--border-color)'
                                    }}
                                />
                            </div>

                            {/* Company Select */}
                            {companies.length > 0 && (
                                <div className="space-y-2">
                                    <Label 
                                        className="text-sm xs:text-base font-medium"
                                        style={{ color: 'var(--text-primary)' }}
                                    >
                                        Select Company
                                    </Label>
                                    <Select onValueChange={selectChangeHandler}>
                                        <SelectTrigger 
                                            className="w-full h-10 xs:h-11 sm:h-12 text-sm xs:text-base"
                                            style={{ 
                                                backgroundColor: 'var(--bg-primary)', 
                                                color: 'var(--text-primary)',
                                                borderColor: 'var(--border-color)'
                                            }}
                                        >
                                            <SelectValue placeholder="Choose a company" />
                                        </SelectTrigger>
                                        <SelectContent
                                            style={{ 
                                                backgroundColor: 'var(--bg-secondary)', 
                                                borderColor: 'var(--border-color)'
                                            }}
                                        >
                                            <SelectGroup>
                                                {companies.map((company) => (
                                                    <SelectItem 
                                                        key={company._id}
                                                        value={company?.name?.toLowerCase()}
                                                        className="text-sm xs:text-base"
                                                        style={{ color: 'var(--text-primary)' }}
                                                    >
                                                        {company.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}
                        </div>

                        {/* Warning Message */}
                        {companies.length === 0 && (
                            <div 
                                className='mt-6 p-3 xs:p-4 rounded-lg border border-red-500 bg-red-50 dark:bg-red-900/20'
                            >
                                <p 
                                    className='text-xs xs:text-sm font-semibold text-center'
                                    style={{ color: '#ef4444' }}
                                >
                                    ⚠️ Please register a company first before posting jobs
                                </p>
                            </div>
                        )}

                        {/* Submit Button */}
                        <div className="mt-6 xs:mt-8">
                            {loading ? (
                                <Button 
                                    disabled
                                    className="w-full h-11 xs:h-12 sm:h-13 text-sm xs:text-base font-semibold"
                                > 
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' /> 
                                    Posting Job...
                                </Button>
                            ) : (
                                <Button 
                                    type="submit" 
                                    className="w-full bg-purple-600 hover:bg-purple-700 h-11 xs:h-12 sm:h-13 text-sm xs:text-base font-semibold"
                                    disabled={companies.length === 0}
                                >
                                    Post New Job
                                </Button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PostJob
