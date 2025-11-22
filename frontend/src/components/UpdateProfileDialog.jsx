// import React, { useState } from 'react'
// import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
// import { Label } from './ui/label'
// import { Input } from './ui/input'
// import { Button } from './ui/button'
// import { Loader2 } from 'lucide-react'
// import { useDispatch, useSelector } from 'react-redux'
// import axios from 'axios'
// import { USER_API_END_POINT } from '@/utils/constant'
// import { setUser } from '@/redux/authSlice'
// import { toast } from 'sonner'

// const UpdateProfileDialog = ({ open, setOpen }) => {
//     const [loading, setLoading] = useState(false);
//     const { user } = useSelector(store => store.auth);

//     const [input, setInput] = useState({
//         fullname: user?.fullname || "",
//         email: user?.email || "",
//         phoneNumber: user?.phoneNumber || "",
//         bio: user?.profile?.bio || "",
//         skills: user?.profile?.skills?.map(skill => skill) || "",
//         file: user?.profile?.resume || null
//     });
//     const dispatch = useDispatch();

//     const changeEventHandler = (e) => {
//         setInput({ ...input, [e.target.name]: e.target.value });
//     }

//     const fileChangeHandler = (e) => {
//         const file = e.target.files?.[0];
        
//         if (file) {
//             const fileExtension = file.name.split('.').pop().toLowerCase();
//             if (fileExtension !== 'pdf') {
//                 toast.error('Only PDF files are allowed for resume upload');
//                 e.target.value = '';
//                 return;
//             }
            
//             const maxSize = 5 * 1024 * 1024;
//             if (file.size > maxSize) {
//                 toast.error('File size must be less than 5MB');
//                 e.target.value = '';
//                 return;
//             }
//         }
        
//         setInput({ ...input, file })
//     }

//     const submitHandler = async (e) => {
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append("fullname", input.fullname);
//         formData.append("email", input.email);
//         formData.append("phoneNumber", input.phoneNumber);
//         formData.append("bio", input.bio);
//         formData.append("skills", input.skills);
//         if (input.file) {
//             formData.append("file", input.file);
//         }
//         try {
//             setLoading(true);
//             const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 },
//                 withCredentials: true
//             });
//             if (res.data.success) {
//                 dispatch(setUser(res.data.user));
//                 toast.success(res.data.message);
//             }
//         } catch (error) {
//             console.log(error);
//             toast.error(error.response.data.message);
//         } finally{
//             setLoading(false);
//         }
//         setOpen(false);
//     }

//     return (
//         <div>
//             <Dialog open={open}>
//                 <DialogContent 
//                     className="max-w-[95vw] xs:max-w-[90vw] sm:max-w-[500px] md:max-w-[550px] max-h-[90vh] overflow-y-auto" 
//                     onInteractOutside={() => setOpen(false)}
//                 >
//                     <DialogHeader className="px-2 xs:px-4 sm:px-6">
//                         <DialogTitle className="text-lg xs:text-xl sm:text-2xl">
//                             Update Profile
//                         </DialogTitle>
//                     </DialogHeader>
                    
//                     <form onSubmit={submitHandler} className="px-2 xs:px-4 sm:px-6">
//                         <div className='grid gap-3 xs:gap-4 sm:gap-5 py-3 xs:py-4 sm:py-5'>
//                             <div className='grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-2 sm:gap-4'>
//                                 <Label 
//                                     htmlFor="fullname" 
//                                     className="text-left sm:text-right text-sm sm:text-base font-medium"
//                                 >
//                                     Name
//                                 </Label>
//                                 <Input
//                                     id="fullname"
//                                     name="fullname"
//                                     type="text"
//                                     value={input.fullname}
//                                     onChange={changeEventHandler}
//                                     className="col-span-1 sm:col-span-3 h-10 sm:h-11 text-sm sm:text-base"
//                                     placeholder="Enter your full name"
//                                 />
//                             </div>

//                             <div className='grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-2 sm:gap-4'>
//                                 <Label 
//                                     htmlFor="email" 
//                                     className="text-left sm:text-right text-sm sm:text-base font-medium"
//                                 >
//                                     Email
//                                 </Label>
//                                 <Input
//                                     id="email"
//                                     name="email"
//                                     type="email"
//                                     value={input.email}
//                                     onChange={changeEventHandler}
//                                     className="col-span-1 sm:col-span-3 h-10 sm:h-11 text-sm sm:text-base"
//                                     placeholder="your.email@example.com"
//                                 />
//                             </div>

//                             <div className='grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-2 sm:gap-4'>
//                                 <Label 
//                                     htmlFor="phoneNumber" 
//                                     className="text-left sm:text-right text-sm sm:text-base font-medium"
//                                 >
//                                     Number
//                                 </Label>
//                                 <Input
//                                     id="phoneNumber"
//                                     name="phoneNumber"
//                                     value={input.phoneNumber}
//                                     onChange={changeEventHandler}
//                                     className="col-span-1 sm:col-span-3 h-10 sm:h-11 text-sm sm:text-base"
//                                     placeholder="Enter phone number"
//                                 />
//                             </div>

//                             <div className='grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-2 sm:gap-4'>
//                                 <Label 
//                                     htmlFor="bio" 
//                                     className="text-left sm:text-right text-sm sm:text-base font-medium"
//                                 >
//                                     Bio
//                                 </Label>
//                                 <Input
//                                     id="bio"
//                                     name="bio"
//                                     value={input.bio}
//                                     onChange={changeEventHandler}
//                                     className="col-span-1 sm:col-span-3 h-10 sm:h-11 text-sm sm:text-base"
//                                     placeholder="Tell us about yourself"
//                                 />
//                             </div>

//                             <div className='grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-2 sm:gap-4'>
//                                 <Label 
//                                     htmlFor="skills" 
//                                     className="text-left sm:text-right text-sm sm:text-base font-medium"
//                                 >
//                                     Skills
//                                 </Label>
//                                 <Input
//                                     id="skills"
//                                     name="skills"
//                                     value={input.skills}
//                                     onChange={changeEventHandler}
//                                     className="col-span-1 sm:col-span-3 h-10 sm:h-11 text-sm sm:text-base"
//                                     placeholder="e.g., React, Node.js, Python"
//                                 />
//                             </div>

//                             <div className='grid grid-cols-1 sm:grid-cols-4 items-start gap-2 sm:gap-4'>
//                                 <Label 
//                                     htmlFor="file" 
//                                     className="text-left sm:text-right text-sm sm:text-base font-medium pt-2"
//                                 >
//                                     Resume
//                                 </Label>
//                                 <div className="col-span-1 sm:col-span-3 space-y-1">
//                                     <Input
//                                         id="file"
//                                         name="file"
//                                         type="file"
//                                         accept="application/pdf"
//                                         onChange={fileChangeHandler}
//                                         className="h-10 sm:h-11 text-sm sm:text-base cursor-pointer"
//                                     />
//                                     <p className="text-xs sm:text-sm text-gray-500">
//                                         PDF only, max 5MB
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>

//                         <DialogFooter className="px-0 pb-2 xs:pb-3 sm:pb-4">
//                             {
//                                 loading ? (
//                                     <Button 
//                                         disabled
//                                         className="w-full my-2 xs:my-3 sm:my-4 h-10 xs:h-11 sm:h-12 text-sm sm:text-base"
//                                     >
//                                         <Loader2 className='mr-2 h-4 w-4 animate-spin' /> 
//                                         Please wait
//                                     </Button>
//                                 ) : (
//                                     <Button 
//                                         type="submit" 
//                                         className="w-full my-2 xs:my-3 sm:my-4 h-10 xs:h-11 sm:h-12 text-sm sm:text-base font-semibold"
//                                     >
//                                         Update Profile
//                                     </Button>
//                                 )
//                             }
//                         </DialogFooter>
//                     </form>
//                 </DialogContent>
//             </Dialog>
//         </div>
//     )
// }

// export default UpdateProfileDialog


import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.map(skill => skill) || "",
        file: user?.profile?.resume || null
    });
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        
        if (file) {
            const fileExtension = file.name.split('.').pop().toLowerCase();
            if (fileExtension !== 'pdf') {
                toast.error('Only PDF files are allowed for resume upload');
                e.target.value = '';
                return;
            }
            
            const maxSize = 5 * 1024 * 1024;
            if (file.size > maxSize) {
                toast.error('File size must be less than 5MB');
                e.target.value = '';
                return;
            }
        }
        
        setInput({ ...input, file })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally{
            setLoading(false);
        }
        setOpen(false);
    }

    return (
        <div>
            <Dialog open={open}>
                <DialogContent 
                    className="max-w-[95vw] xs:max-w-[90vw] sm:max-w-[500px] md:max-w-[550px] max-h-[90vh] overflow-y-auto" 
                    onInteractOutside={() => setOpen(false)}
                >
                    <DialogHeader className="px-2 xs:px-4 sm:px-6">
                        <DialogTitle className="text-lg xs:text-xl sm:text-2xl">
                            Update Profile
                        </DialogTitle>
                    </DialogHeader>
                    
                    <form onSubmit={submitHandler} className="px-2 xs:px-4 sm:px-6">
                        <div className='grid gap-3 xs:gap-4 sm:gap-5 py-3 xs:py-4 sm:py-5'>
                            <div className='grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-2 sm:gap-4'>
                                <Label 
                                    htmlFor="fullname" 
                                    className="text-left sm:text-right text-sm sm:text-base font-medium"
                                >
                                    Name
                                </Label>
                                <Input
                                    id="fullname"
                                    name="fullname"
                                    type="text"
                                    value={input.fullname}
                                    onChange={changeEventHandler}
                                    className="col-span-1 sm:col-span-3 h-10 sm:h-11 text-sm sm:text-base"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div className='grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-2 sm:gap-4'>
                                <Label 
                                    htmlFor="email" 
                                    className="text-left sm:text-right text-sm sm:text-base font-medium"
                                >
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={input.email}
                                    onChange={changeEventHandler}
                                    className="col-span-1 sm:col-span-3 h-10 sm:h-11 text-sm sm:text-base"
                                    placeholder="your.email@example.com"
                                />
                            </div>

                            <div className='grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-2 sm:gap-4'>
                                <Label 
                                    htmlFor="phoneNumber" 
                                    className="text-left sm:text-right text-sm sm:text-base font-medium"
                                >
                                    Number
                                </Label>
                                <Input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={input.phoneNumber}
                                    onChange={changeEventHandler}
                                    className="col-span-1 sm:col-span-3 h-10 sm:h-11 text-sm sm:text-base"
                                    placeholder="Enter phone number"
                                />
                            </div>

                            <div className='grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-2 sm:gap-4'>
                                <Label 
                                    htmlFor="bio" 
                                    className="text-left sm:text-right text-sm sm:text-base font-medium"
                                >
                                    Bio
                                </Label>
                                <Input
                                    id="bio"
                                    name="bio"
                                    value={input.bio}
                                    onChange={changeEventHandler}
                                    className="col-span-1 sm:col-span-3 h-10 sm:h-11 text-sm sm:text-base"
                                    placeholder="Tell us about yourself"
                                />
                            </div>

                            <div className='grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-2 sm:gap-4'>
                                <Label 
                                    htmlFor="skills" 
                                    className="text-left sm:text-right text-sm sm:text-base font-medium"
                                >
                                    Skills
                                </Label>
                                <Input
                                    id="skills"
                                    name="skills"
                                    value={input.skills}
                                    onChange={changeEventHandler}
                                    className="col-span-1 sm:col-span-3 h-10 sm:h-11 text-sm sm:text-base"
                                    placeholder="e.g., React, Node.js, Python"
                                />
                            </div>

                            <div className='grid grid-cols-1 sm:grid-cols-4 items-start gap-2 sm:gap-4'>
                                <Label 
                                    htmlFor="file" 
                                    className="text-left sm:text-right text-sm sm:text-base font-medium pt-2"
                                >
                                    Resume
                                </Label>
                                <div className="col-span-1 sm:col-span-3 space-y-1">
                                    <Input
                                        id="file"
                                        name="file"
                                        type="file"
                                        accept="application/pdf"
                                        onChange={fileChangeHandler}
                                        className="h-10 sm:h-11 text-sm sm:text-base cursor-pointer"
                                    />
                                    <p className="text-xs sm:text-sm text-gray-500">
                                        PDF only, max 5MB
                                    </p>
                                </div>
                            </div>
                        </div>

                        <DialogFooter className="px-0 pb-2 xs:pb-3 sm:pb-4">
                            {
                                loading ? (
                                    <Button 
                                        disabled
                                        className="w-full my-2 xs:my-3 sm:my-4 h-10 xs:h-11 sm:h-12 text-sm sm:text-base"
                                    >
                                        <Loader2 className='mr-2 h-4 w-4 animate-spin' /> 
                                        Please wait
                                    </Button>
                                ) : (
                                    <Button 
                                        type="submit" 
                                        className="w-full my-2 xs:my-3 sm:my-4 h-10 xs:h-11 sm:h-12 text-sm sm:text-base font-semibold"
                                    >
                                        Update Profile
                                    </Button>
                                )
                            }
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UpdateProfileDialog
