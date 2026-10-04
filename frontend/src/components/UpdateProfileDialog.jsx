import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2, X } from 'lucide-react'
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
        skills: user?.profile?.skills ? user.profile.skills.join(", ") : "",
        file: null
    });
    const dispatch = useDispatch();

    // Keep form fields synced whenever dialog opens or user state updates
    useEffect(() => {
        if (open && user) {
            setInput({
                fullname: user.fullname || "",
                email: user.email || "",
                phoneNumber: user.phoneNumber || "",
                bio: user.profile?.bio || "",
                skills: user.profile?.skills ? user.profile.skills.join(", ") : "",
                file: null
            });
        }
    }, [open, user]);

    const changeEventHandler = (e) => {
        setInput(prev => ({ ...prev, [e.target.name]: e.target.value }));
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
        setInput(prev => ({ ...prev, file }));
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
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
                setOpen(false);
            }
        } catch (error) {
            console.error('Update profile error:', error);
            toast.error(error?.response?.data?.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent 
                className="max-w-[95vw] xs:max-w-[90vw] sm:max-w-[500px] md:max-w-[550px] max-h-[90vh] overflow-y-auto"
                style={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)'
                }}
            >
                <DialogHeader className="px-2 xs:px-4 sm:px-6">
                    <DialogTitle 
                        className="text-lg xs:text-xl sm:text-2xl"
                        style={{ color: 'var(--text-primary)' }}
                    >
                        Update Profile
                    </DialogTitle>
                </DialogHeader>
                
                <form onSubmit={submitHandler} className="px-2 xs:px-4 sm:px-6">
                    <div className='grid gap-3 xs:gap-4 sm:gap-5 py-3 xs:py-4 sm:py-5'>
                        {/* Name */}
                        <div className='grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-2 sm:gap-4'>
                            <Label 
                                htmlFor="fullname" 
                                className="text-left sm:text-right text-sm sm:text-base font-medium"
                                style={{ color: 'var(--text-primary)' }}
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
                                required
                                style={{
                                    backgroundColor: 'var(--bg-primary)',
                                    borderColor: 'var(--border-color)',
                                    color: 'var(--text-primary)'
                                }}
                            />
                        </div>

                        {/* Email */}
                        <div className='grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-2 sm:gap-4'>
                            <Label 
                                htmlFor="email" 
                                className="text-left sm:text-right text-sm sm:text-base font-medium"
                                style={{ color: 'var(--text-primary)' }}
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
                                required
                                style={{
                                    backgroundColor: 'var(--bg-primary)',
                                    borderColor: 'var(--border-color)',
                                    color: 'var(--text-primary)'
                                }}
                            />
                        </div>

                        {/* Phone Number */}
                        <div className='grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-2 sm:gap-4'>
                            <Label 
                                htmlFor="phoneNumber" 
                                className="text-left sm:text-right text-sm sm:text-base font-medium"
                                style={{ color: 'var(--text-primary)' }}
                            >
                                Phone
                            </Label>
                            <Input
                                id="phoneNumber"
                                name="phoneNumber"
                                value={input.phoneNumber}
                                onChange={changeEventHandler}
                                className="col-span-1 sm:col-span-3 h-10 sm:h-11 text-sm sm:text-base"
                                placeholder="Enter phone number"
                                style={{
                                    backgroundColor: 'var(--bg-primary)',
                                    borderColor: 'var(--border-color)',
                                    color: 'var(--text-primary)'
                                }}
                            />
                        </div>

                        {/* Bio */}
                        <div className='grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-2 sm:gap-4'>
                            <Label 
                                htmlFor="bio" 
                                className="text-left sm:text-right text-sm sm:text-base font-medium"
                                style={{ color: 'var(--text-primary)' }}
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
                                style={{
                                    backgroundColor: 'var(--bg-primary)',
                                    borderColor: 'var(--border-color)',
                                    color: 'var(--text-primary)'
                                }}
                            />
                        </div>

                        {/* Skills (especially for students) */}
                        <div className='grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-2 sm:gap-4'>
                            <Label 
                                htmlFor="skills" 
                                className="text-left sm:text-right text-sm sm:text-base font-medium"
                                style={{ color: 'var(--text-primary)' }}
                            >
                                Skills
                            </Label>
                            <Input
                                id="skills"
                                name="skills"
                                value={input.skills}
                                onChange={changeEventHandler}
                                className="col-span-1 sm:col-span-3 h-10 sm:h-11 text-sm sm:text-base"
                                placeholder="e.g. React, Node.js, Python (comma separated)"
                                style={{
                                    backgroundColor: 'var(--bg-primary)',
                                    borderColor: 'var(--border-color)',
                                    color: 'var(--text-primary)'
                                }}
                            />
                        </div>

                        {/* Resume (for students or anyone wishing to attach a resume) */}
                        <div className='grid grid-cols-1 sm:grid-cols-4 items-start gap-2 sm:gap-4'>
                            <Label 
                                htmlFor="file" 
                                className="text-left sm:text-right text-sm sm:text-base font-medium pt-2"
                                style={{ color: 'var(--text-primary)' }}
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
                                    style={{
                                        backgroundColor: 'var(--bg-primary)',
                                        borderColor: 'var(--border-color)',
                                        color: 'var(--text-primary)'
                                    }}
                                />
                                <p 
                                    className="text-xs sm:text-sm"
                                    style={{ color: 'var(--text-secondary)' }}
                                >
                                    PDF only, max 5MB {user?.profile?.resumeOriginalName ? `(Current: ${user.profile.resumeOriginalName})` : ''}
                                </p>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="px-0 pb-2 xs:pb-3 sm:pb-4 flex flex-col sm:flex-row gap-2 sm:justify-end">
                        <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => setOpen(false)}
                            className="w-full sm:w-auto h-10 sm:h-11 text-sm sm:text-base"
                            style={{
                                borderColor: 'var(--border-color)',
                                color: 'var(--text-primary)'
                            }}
                        >
                            Cancel
                        </Button>
                        {
                            loading ? (
                                <Button 
                                    disabled
                                    className="w-full sm:w-auto h-10 sm:h-11 text-sm sm:text-base bg-purple-600"
                                >
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' /> 
                                    Saving...
                                </Button>
                            ) : (
                                <Button 
                                    type="submit" 
                                    className="w-full sm:w-auto h-10 sm:h-11 text-sm sm:text-base font-semibold bg-purple-600 hover:bg-purple-700 text-white"
                                >
                                    Update Profile
                                </Button>
                            )
                        }
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateProfileDialog
