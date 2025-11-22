// import React, { useEffect, useState } from 'react'
// import Navbar from '../shared/Navbar'
// import { Button } from '../ui/button'
// import { ArrowLeft, Loader2 } from 'lucide-react'
// import { Label } from '../ui/label'
// import { Input } from '../ui/input'
// import axios from 'axios'
// import { COMPANY_API_END_POINT } from '@/utils/constant'
// import { useNavigate, useParams } from 'react-router-dom'
// import { toast } from 'sonner'
// import { useSelector } from 'react-redux'
// import useGetCompanyById from '@/hooks/useGetCompanyById'

// const CompanySetup = () => {
//     const params = useParams();
//     useGetCompanyById(params.id);
//     const [input, setInput] = useState({
//         name: "",
//         description: "",
//         website: "",
//         location: "",
//         file: null
//     });
//     const {singleCompany} = useSelector(store=>store.company);
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     const changeEventHandler = (e) => {
//         setInput({ ...input, [e.target.name]: e.target.value });
//     }

//     const changeFileHandler = (e) => {
//         const file = e.target.files?.[0];
//         setInput({ ...input, file });
//     }

//     const submitHandler = async (e) => {
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append("name", input.name);
//         formData.append("description", input.description);
//         formData.append("website", input.website);
//         formData.append("location", input.location);
//         if (input.file) {
//             formData.append("file", input.file);
//         }
//         try {
//             setLoading(true);
//             const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 },
//                 withCredentials: true
//             });
//             if (res.data.success) {
//                 toast.success(res.data.message);
//                 navigate("/admin/companies");
//             }
//         } catch (error) {
//             console.log(error);
//             toast.error(error.response.data.message);
//         } finally {
//             setLoading(false);
//         }
//     }

//     useEffect(() => {
//         setInput({
//             name: singleCompany.name || "",
//             description: singleCompany.description || "",
//             website: singleCompany.website || "",
//             location: singleCompany.location || "",
//             file: singleCompany.file || null
//         })
//     },[singleCompany]);

//     return (
//         <div 
//             className="min-h-screen w-full overflow-x-hidden"
//             style={{ backgroundColor: 'var(--bg-primary)' }}
//         >
//             <Navbar />
//             <div className='max-w-4xl mx-auto my-4 xs:my-6 sm:my-8 md:my-10 px-3 xs:px-4 sm:px-6 lg:px-8'>
//                 {/* Form Container */}
//                 <div 
//                     className='rounded-lg xs:rounded-xl border overflow-hidden'
//                     style={{ 
//                         backgroundColor: 'var(--bg-secondary)',
//                         borderColor: 'var(--border-color)'
//                     }}
//                 >
//                     <form onSubmit={submitHandler}>
//                         {/* Header Section */}
//                         <div className='flex flex-col xs:flex-row items-start xs:items-center gap-3 xs:gap-5 p-4 xs:p-6 sm:p-8 border-b'
//                             style={{ borderColor: 'var(--border-color)' }}
//                         >
//                             <Button 
//                                 onClick={() => navigate("/admin/companies")} 
//                                 variant="outline" 
//                                 type="button"
//                                 className="flex items-center gap-2 font-semibold h-10 xs:h-11 text-sm xs:text-base px-3 xs:px-4"
//                                 style={{ borderColor: 'var(--border-color)' }}
//                             >
//                                 <ArrowLeft className="h-4 w-4" />
//                                 <span>Back</span>
//                             </Button>
//                             <div className="flex-1">
//                                 <h1 
//                                     className='font-bold text-lg xs:text-xl sm:text-2xl md:text-3xl'
//                                     style={{ color: 'var(--text-primary)' }}
//                                 >
//                                     Company Setup
//                                 </h1>
//                                 <p 
//                                     className='text-xs xs:text-sm mt-1'
//                                     style={{ color: 'var(--text-secondary)' }}
//                                 >
//                                     Update your company information
//                                 </p>
//                             </div>
//                         </div>

//                         {/* Form Fields */}
//                         <div className='p-4 xs:p-6 sm:p-8 space-y-5 xs:space-y-6'>
//                             <div className='grid grid-cols-1 md:grid-cols-2 gap-4 xs:gap-5 sm:gap-6'>
//                                 {/* Company Name */}
//                                 <div className="space-y-2">
//                                     <Label 
//                                         className="text-sm xs:text-base font-medium"
//                                         style={{ color: 'var(--text-primary)' }}
//                                     >
//                                         Company Name
//                                     </Label>
//                                     <Input
//                                         type="text"
//                                         name="name"
//                                         value={input.name}
//                                         onChange={changeEventHandler}
//                                         required
//                                         className="h-10 xs:h-11 sm:h-12 text-sm xs:text-base"
//                                         placeholder="Enter company name"
//                                         style={{ 
//                                             backgroundColor: 'var(--bg-primary)', 
//                                             color: 'var(--text-primary)',
//                                             borderColor: 'var(--border-color)'
//                                         }}
//                                     />
//                                 </div>

//                                 {/* Description */}
//                                 <div className="space-y-2">
//                                     <Label 
//                                         className="text-sm xs:text-base font-medium"
//                                         style={{ color: 'var(--text-primary)' }}
//                                     >
//                                         Description
//                                     </Label>
//                                     <Input
//                                         type="text"
//                                         name="description"
//                                         value={input.description}
//                                         onChange={changeEventHandler}
//                                         required
//                                         className="h-10 xs:h-11 sm:h-12 text-sm xs:text-base"
//                                         placeholder="Brief company description"
//                                         style={{ 
//                                             backgroundColor: 'var(--bg-primary)', 
//                                             color: 'var(--text-primary)',
//                                             borderColor: 'var(--border-color)'
//                                         }}
//                                     />
//                                 </div>

//                                 {/* Website */}
//                                 <div className="space-y-2">
//                                     <Label 
//                                         className="text-sm xs:text-base font-medium"
//                                         style={{ color: 'var(--text-primary)' }}
//                                     >
//                                         Website
//                                     </Label>
//                                     <Input
//                                         type="url"
//                                         name="website"
//                                         value={input.website}
//                                         onChange={changeEventHandler}
//                                         required
//                                         className="h-10 xs:h-11 sm:h-12 text-sm xs:text-base"
//                                         placeholder="https://example.com"
//                                         style={{ 
//                                             backgroundColor: 'var(--bg-primary)', 
//                                             color: 'var(--text-primary)',
//                                             borderColor: 'var(--border-color)'
//                                         }}
//                                     />
//                                 </div>

//                                 {/* Location */}
//                                 <div className="space-y-2">
//                                     <Label 
//                                         className="text-sm xs:text-base font-medium"
//                                         style={{ color: 'var(--text-primary)' }}
//                                     >
//                                         Location
//                                     </Label>
//                                     <Input
//                                         type="text"
//                                         name="location"
//                                         value={input.location}
//                                         onChange={changeEventHandler}
//                                         required
//                                         className="h-10 xs:h-11 sm:h-12 text-sm xs:text-base"
//                                         placeholder="City, Country"
//                                         style={{ 
//                                             backgroundColor: 'var(--bg-primary)', 
//                                             color: 'var(--text-primary)',
//                                             borderColor: 'var(--border-color)'
//                                         }}
//                                     />
//                                 </div>

//                                 {/* Logo */}
//                                 <div className="space-y-2 md:col-span-2">
//                                     <Label 
//                                         className="text-sm xs:text-base font-medium"
//                                         style={{ color: 'var(--text-primary)' }}
//                                     >
//                                         Company Logo
//                                     </Label>
//                                     <Input
//                                         type="file"
//                                         accept="image/*"
//                                         onChange={changeFileHandler}
//                                         className="h-10 xs:h-11 sm:h-12 text-sm xs:text-base cursor-pointer"
//                                         style={{ 
//                                             backgroundColor: 'var(--bg-primary)', 
//                                             color: 'var(--text-primary)',
//                                             borderColor: 'var(--border-color)'
//                                         }}
//                                     />
//                                     <p 
//                                         className="text-xs mt-1"
//                                         style={{ color: 'var(--text-secondary)' }}
//                                     >
//                                         Accepted formats: JPG, PNG, GIF (Max 5MB)
//                                     </p>
//                                 </div>
//                             </div>

//                             {/* Submit Button */}
//                             <div className="pt-4 xs:pt-6">
//                                 {loading ? (
//                                     <Button 
//                                         disabled
//                                         className="w-full h-11 xs:h-12 sm:h-13 text-sm xs:text-base font-semibold"
//                                     > 
//                                         <Loader2 className='mr-2 h-4 w-4 animate-spin' /> 
//                                         Updating...
//                                     </Button>
//                                 ) : (
//                                     <Button 
//                                         type="submit" 
//                                         className="w-full bg-purple-600 hover:bg-purple-700 h-11 xs:h-12 sm:h-13 text-sm xs:text-base font-semibold"
//                                     >
//                                         Update Company
//                                     </Button>
//                                 )}
//                             </div>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default CompanySetup


import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });
    const {singleCompany} = useSelector(store=>store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: singleCompany.file || null
        })
    },[singleCompany]);

    return (
        <div 
            className="min-h-screen w-full overflow-x-hidden"
            style={{ backgroundColor: 'var(--bg-primary)' }}
        >
            <Navbar />
            <div className='max-w-4xl mx-auto my-4 xs:my-6 sm:my-8 md:my-10 px-3 xs:px-4 sm:px-6 lg:px-8'>
                {/* Form Container */}
                <div 
                    className='rounded-lg xs:rounded-xl border overflow-hidden'
                    style={{ 
                        backgroundColor: 'var(--bg-secondary)',
                        borderColor: 'var(--border-color)'
                    }}
                >
                    <form onSubmit={submitHandler}>
                        {/* Header Section */}
                        <div className='flex flex-col xs:flex-row items-start xs:items-center gap-3 xs:gap-5 p-4 xs:p-6 sm:p-8 border-b'
                            style={{ borderColor: 'var(--border-color)' }}
                        >
                            <Button 
                                onClick={() => navigate("/admin/companies")} 
                                variant="outline" 
                                type="button"
                                className="flex items-center gap-2 font-semibold h-10 xs:h-11 text-sm xs:text-base px-3 xs:px-4"
                                style={{ borderColor: 'var(--border-color)' }}
                            >
                                <ArrowLeft className="h-4 w-4" />
                                <span>Back</span>
                            </Button>
                            <div className="flex-1">
                                <h1 
                                    className='font-bold text-lg xs:text-xl sm:text-2xl md:text-3xl'
                                    style={{ color: 'var(--text-primary)' }}
                                >
                                    Company Setup
                                </h1>
                                <p 
                                    className='text-xs xs:text-sm mt-1'
                                    style={{ color: 'var(--text-secondary)' }}
                                >
                                    Update your company information
                                </p>
                            </div>
                        </div>

                        {/* Form Fields */}
                        <div className='p-4 xs:p-6 sm:p-8 space-y-5 xs:space-y-6'>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 xs:gap-5 sm:gap-6'>
                                {/* Company Name */}
                                <div className="space-y-2">
                                    <Label 
                                        className="text-sm xs:text-base font-medium"
                                        style={{ color: 'var(--text-primary)' }}
                                    >
                                        Company Name
                                    </Label>
                                    <Input
                                        type="text"
                                        name="name"
                                        value={input.name}
                                        onChange={changeEventHandler}
                                        required
                                        className="h-10 xs:h-11 sm:h-12 text-sm xs:text-base"
                                        placeholder="Enter company name"
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
                                        required
                                        className="h-10 xs:h-11 sm:h-12 text-sm xs:text-base"
                                        placeholder="Brief company description"
                                        style={{ 
                                            backgroundColor: 'var(--bg-primary)', 
                                            color: 'var(--text-primary)',
                                            borderColor: 'var(--border-color)'
                                        }}
                                    />
                                </div>

                                {/* Website */}
                                <div className="space-y-2">
                                    <Label 
                                        className="text-sm xs:text-base font-medium"
                                        style={{ color: 'var(--text-primary)' }}
                                    >
                                        Website
                                    </Label>
                                    <Input
                                        type="url"
                                        name="website"
                                        value={input.website}
                                        onChange={changeEventHandler}
                                        required
                                        className="h-10 xs:h-11 sm:h-12 text-sm xs:text-base"
                                        placeholder="https://example.com"
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
                                        required
                                        className="h-10 xs:h-11 sm:h-12 text-sm xs:text-base"
                                        placeholder="City, Country"
                                        style={{ 
                                            backgroundColor: 'var(--bg-primary)', 
                                            color: 'var(--text-primary)',
                                            borderColor: 'var(--border-color)'
                                        }}
                                    />
                                </div>

                                {/* Logo */}
                                <div className="space-y-2 md:col-span-2">
                                    <Label 
                                        className="text-sm xs:text-base font-medium"
                                        style={{ color: 'var(--text-primary)' }}
                                    >
                                        Company Logo
                                    </Label>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={changeFileHandler}
                                        className="h-10 xs:h-11 sm:h-12 text-sm xs:text-base cursor-pointer"
                                        style={{ 
                                            backgroundColor: 'var(--bg-primary)', 
                                            color: 'var(--text-primary)',
                                            borderColor: 'var(--border-color)'
                                        }}
                                    />
                                    <p 
                                        className="text-xs mt-1"
                                        style={{ color: 'var(--text-secondary)' }}
                                    >
                                        Accepted formats: JPG, PNG, GIF (Max 5MB)
                                    </p>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4 xs:pt-6">
                                {loading ? (
                                    <Button 
                                        disabled
                                        className="w-full h-11 xs:h-12 sm:h-13 text-sm xs:text-base font-semibold"
                                    > 
                                        <Loader2 className='mr-2 h-4 w-4 animate-spin' /> 
                                        Updating...
                                    </Button>
                                ) : (
                                    <Button 
                                        type="submit" 
                                        className="w-full bg-purple-600 hover:bg-purple-700 h-11 xs:h-12 sm:h-13 text-sm xs:text-base font-semibold"
                                    >
                                        Update Company
                                    </Button>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CompanySetup
