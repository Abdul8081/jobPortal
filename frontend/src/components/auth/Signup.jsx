import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });
    const {loading, user} = useSelector(store=>store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }
    
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally{
            dispatch(setLoading(false));
        }
    }

    useEffect(()=>{
        if(user){
            navigate("/");
        }
    },[])
    
    return (
        <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh' }}>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto px-4 py-10'>
                <form 
                    onSubmit={submitHandler} 
                    className='w-full sm:w-2/3 md:w-1/2 border rounded-md p-6 md:p-8 my-10'
                    style={{ 
                        backgroundColor: 'var(--bg-secondary)', 
                        borderColor: 'var(--border-color)' 
                    }}
                >
                    <h1 
                        className='font-bold text-xl mb-5'
                        style={{ color: 'var(--text-primary)' }}
                    >
                        Sign Up
                    </h1>
                    <div className='my-2'>
                        <Label style={{ color: 'var(--text-primary)' }}>Full Name</Label>
                        <Input
                            type="text"
                            value={input.fullname}
                            name="fullname"
                            onChange={changeEventHandler}
                            placeholder="Abdul Muid"
                            required
                            style={{ 
                                backgroundColor: 'var(--bg-primary)', 
                                color: 'var(--text-primary)',
                                borderColor: 'var(--border-color)'
                            }}
                        />
                    </div>
                    <div className='my-2'>
                        <Label style={{ color: 'var(--text-primary)' }}>Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="abdul@gmail.com"
                            required
                            style={{ 
                                backgroundColor: 'var(--bg-primary)', 
                                color: 'var(--text-primary)',
                                borderColor: 'var(--border-color)'
                            }}
                        />
                    </div>
                    <div className='my-2'>
                        <Label style={{ color: 'var(--text-primary)' }}>Phone Number</Label>
                        <Input
                            type="text"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                            placeholder="8080808080"
                            required
                            style={{ 
                                backgroundColor: 'var(--bg-primary)', 
                                color: 'var(--text-primary)',
                                borderColor: 'var(--border-color)'
                            }}
                        />
                    </div>
                    <div className='my-2'>
                        <Label style={{ color: 'var(--text-primary)' }}>Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="Create a strong password"
                            required
                            style={{ 
                                backgroundColor: 'var(--bg-primary)', 
                                color: 'var(--text-primary)',
                                borderColor: 'var(--border-color)'
                            }}
                        />
                    </div>
                    <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
                        <RadioGroup className="flex items-center gap-4 my-5">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer w-4 h-4"
                                />
                                <Label 
                                    htmlFor="r1"
                                    style={{ color: 'var(--text-primary)' }}
                                >
                                    Student
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer w-4 h-4"
                                />
                                <Label 
                                    htmlFor="r2"
                                    style={{ color: 'var(--text-primary)' }}
                                >
                                    Recruiter
                                </Label>
                            </div>
                        </RadioGroup>
                        <div className='flex flex-col gap-2 w-full sm:w-auto'>
                            <Label style={{ color: 'var(--text-primary)' }}>Profile Photo</Label>
                            <Input
                                accept="image/*"
                                type="file"
                                onChange={changeFileHandler}
                                className="cursor-pointer"
                                required
                                style={{ 
                                    backgroundColor: 'var(--bg-primary)', 
                                    color: 'var(--text-primary)',
                                    borderColor: 'var(--border-color)'
                                }}
                            />
                        </div>
                    </div>
                    {
                        loading ? 
                        <Button className="w-full my-4"> 
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait 
                        </Button> : 
                        <Button type="submit" className="w-full my-4">Signup</Button>
                    }
                    <span 
                        className='text-sm'
                        style={{ color: 'var(--text-secondary)' }}
                    >
                        Already have an account? <Link to="/login" style={{ color: 'var(--accent-primary)' }}>Login</Link>
                    </span>
                </form>
            </div>
        </div>
    )
}

export default Signup
