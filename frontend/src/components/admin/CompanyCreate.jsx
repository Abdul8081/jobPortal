// import React, { useState } from 'react'
// import Navbar from '../shared/Navbar'
// import { Label } from '../ui/label'
// import { Input } from '../ui/input'
// import { Button } from '../ui/button'
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios'
// import { COMPANY_API_END_POINT } from '@/utils/constant'
// import { toast } from 'sonner'
// import { useDispatch } from 'react-redux'
// import { setSingleCompany } from '@/redux/companySlice'

// const CompanyCreate = () => {
//     const navigate = useNavigate();
//     const [companyName, setCompanyName] = useState();
//     const dispatch = useDispatch();
    
//     const registerNewCompany = async () => {
//         try {
//             const res = await axios.post(`${COMPANY_API_END_POINT}/register`, {companyName}, {
//                 headers:{
//                     'Content-Type':'application/json'
//                 },
//                 withCredentials:true
//             });
//             if(res?.data?.success){
//                 dispatch(setSingleCompany(res.data.company));
//                 toast.success(res.data.message);
//                 const companyId = res?.data?.company?._id;
//                 navigate(`/admin/companies/${companyId}`);
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     }
    
//     return (
//         <div 
//             className="min-h-screen w-full overflow-x-hidden"
//             style={{ backgroundColor: 'var(--bg-primary)' }}
//         >
//             <Navbar />
//             <div className='max-w-4xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-6 xs:py-8 sm:py-10 md:py-12'>
//                 {/* Form Container */}
//                 <div 
//                     className='rounded-lg xs:rounded-xl border p-4 xs:p-6 sm:p-8 md:p-10'
//                     style={{ 
//                         backgroundColor: 'var(--bg-secondary)',
//                         borderColor: 'var(--border-color)'
//                     }}
//                 >
//                     {/* Header Section */}
//                     <div className='mb-6 xs:mb-8 sm:mb-10'>
//                         <h1 
//                             className='font-bold text-xl xs:text-2xl sm:text-3xl md:text-4xl mb-2 xs:mb-3'
//                             style={{ color: 'var(--text-primary)' }}
//                         >
//                             Your Company Name
//                         </h1>
//                         <p 
//                             className='text-sm xs:text-base sm:text-lg max-w-2xl'
//                             style={{ color: 'var(--text-secondary)' }}
//                         >
//                             What would you like to give your company name? You can change this later.
//                         </p>
//                     </div>

//                     {/* Form Section */}
//                     <div className="space-y-4 xs:space-y-5 sm:space-y-6">
//                         <div className="space-y-2 xs:space-y-2.5">
//                             <Label 
//                                 className="text-sm xs:text-base font-medium"
//                                 style={{ color: 'var(--text-primary)' }}
//                             >
//                                 Company Name
//                             </Label>
//                             <Input
//                                 type="text"
//                                 className="h-11 xs:h-12 sm:h-13 md:h-14 text-sm xs:text-base"
//                                 placeholder="JobHunt, Microsoft etc."
//                                 onChange={(e) => setCompanyName(e.target.value)}
//                                 required
//                                 style={{ 
//                                     backgroundColor: 'var(--bg-primary)', 
//                                     color: 'var(--text-primary)',
//                                     borderColor: 'var(--border-color)'
//                                 }}
//                             />
//                             <p 
//                                 className="text-xs xs:text-sm mt-1"
//                                 style={{ color: 'var(--text-secondary)' }}
//                             >
//                                 Choose a unique and memorable name for your company
//                             </p>
//                         </div>

//                         {/* Action Buttons */}
//                         <div className='flex flex-col-reverse xs:flex-row items-stretch xs:items-center gap-3 xs:gap-4 pt-4 xs:pt-6 sm:pt-8'>
//                             <Button 
//                                 variant="outline" 
//                                 onClick={() => navigate("/admin/companies")}
//                                 className="w-full xs:w-auto h-11 xs:h-12 sm:h-13 px-6 xs:px-8 text-sm xs:text-base font-medium"
//                                 style={{
//                                     borderColor: 'var(--border-color)'
//                                 }}
//                             >
//                                 Cancel
//                             </Button>
//                             <Button 
//                                 onClick={registerNewCompany}
//                                 className="w-full xs:w-auto bg-purple-600 hover:bg-purple-700 h-11 xs:h-12 sm:h-13 px-6 xs:px-8 text-sm xs:text-base font-semibold"
//                             >
//                                 Continue
//                             </Button>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Helper Text */}
//                 <div 
//                     className="mt-4 xs:mt-5 sm:mt-6 text-center text-xs xs:text-sm"
//                     style={{ color: 'var(--text-secondary)' }}
//                 >
//                     <p>
//                         By continuing, you agree to register your company in our system
//                     </p>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default CompanyCreate


import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState();
    const dispatch = useDispatch();
    
    const registerNewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, {companyName}, {
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });
            if(res?.data?.success){
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <div 
            className="min-h-screen w-full overflow-x-hidden"
            style={{ backgroundColor: 'var(--bg-primary)' }}
        >
            <Navbar />
            <div className='max-w-4xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-6 xs:py-8 sm:py-10 md:py-12'>
                {/* Form Container */}
                <div 
                    className='rounded-lg xs:rounded-xl border p-4 xs:p-6 sm:p-8 md:p-10'
                    style={{ 
                        backgroundColor: 'var(--bg-secondary)',
                        borderColor: 'var(--border-color)'
                    }}
                >
                    {/* Header Section */}
                    <div className='mb-6 xs:mb-8 sm:mb-10'>
                        <h1 
                            className='font-bold text-xl xs:text-2xl sm:text-3xl md:text-4xl mb-2 xs:mb-3'
                            style={{ color: 'var(--text-primary)' }}
                        >
                            Your Company Name
                        </h1>
                        <p 
                            className='text-sm xs:text-base sm:text-lg max-w-2xl'
                            style={{ color: 'var(--text-secondary)' }}
                        >
                            What would you like to give your company name? You can change this later.
                        </p>
                    </div>

                    {/* Form Section */}
                    <div className="space-y-4 xs:space-y-5 sm:space-y-6">
                        <div className="space-y-2 xs:space-y-2.5">
                            <Label 
                                className="text-sm xs:text-base font-medium"
                                style={{ color: 'var(--text-primary)' }}
                            >
                                Company Name
                            </Label>
                            <Input
                                type="text"
                                className="h-11 xs:h-12 sm:h-13 md:h-14 text-sm xs:text-base"
                                placeholder="JobHunt, Microsoft etc."
                                onChange={(e) => setCompanyName(e.target.value)}
                                required
                                style={{ 
                                    backgroundColor: 'var(--bg-primary)', 
                                    color: 'var(--text-primary)',
                                    borderColor: 'var(--border-color)'
                                }}
                            />
                            <p 
                                className="text-xs xs:text-sm mt-1"
                                style={{ color: 'var(--text-secondary)' }}
                            >
                                Choose a unique and memorable name for your company
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className='flex flex-col-reverse xs:flex-row items-stretch xs:items-center gap-3 xs:gap-4 pt-4 xs:pt-6 sm:pt-8'>
                            <Button 
                                variant="outline" 
                                onClick={() => navigate("/admin/companies")}
                                className="w-full xs:w-auto h-11 xs:h-12 sm:h-13 px-6 xs:px-8 text-sm xs:text-base font-medium"
                                style={{
                                    borderColor: 'var(--border-color)'
                                }}
                            >
                                Cancel
                            </Button>
                            <Button 
                                onClick={registerNewCompany}
                                className="w-full xs:w-auto bg-purple-600 hover:bg-purple-700 h-11 xs:h-12 sm:h-13 px-6 xs:px-8 text-sm xs:text-base font-semibold"
                            >
                                Continue
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Helper Text */}
                <div 
                    className="mt-4 xs:mt-5 sm:mt-6 text-center text-xs xs:text-sm"
                    style={{ color: 'var(--text-secondary)' }}
                >
                    <p>
                        By continuing, you agree to register your company in our system
                    </p>
                </div>
            </div>
        </div>
    )
}

export default CompanyCreate
