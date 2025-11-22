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
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                // Redirect to /home after successful login
                navigate("/home");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    }
    
    useEffect(() => {
        if (user) {
            // If already logged in, redirect to home
            navigate("/home");
        }
    }, [user, navigate])
    
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
                        Login
                    </h1>
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
                        <Label style={{ color: 'var(--text-primary)' }}>Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="Enter your password"
                            required
                            style={{ 
                                backgroundColor: 'var(--bg-primary)', 
                                color: 'var(--text-primary)',
                                borderColor: 'var(--border-color)'
                            }}
                        />
                    </div>
                    <div className='flex items-center justify-between'>
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
                    </div>
                    {
                        loading ? 
                        <Button className="w-full my-4"> 
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait 
                        </Button> : 
                        <Button type="submit" className="w-full my-4">Login</Button>
                    }
                    <span 
                        className='text-sm'
                        style={{ color: 'var(--text-secondary)' }}
                    >
                        Don't have an account? <Link to="/signup" style={{ color: 'var(--accent-primary)' }}>Signup</Link>
                    </span>
                </form>
            </div>
        </div>
    )
}

export default Login
