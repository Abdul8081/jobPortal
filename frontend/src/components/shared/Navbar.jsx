import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2, Menu, X } from 'lucide-react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import ShuffleText from './ShuffleText'
import Logo from './Logo'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const isActive = (path) => {
        if (path === '/home' && (location.pathname === '/' || location.pathname === '/home')) {
            return true;
        }
        return location.pathname === path;
    };

    const handleNavigation = (path, requiresAuth = true) => {
        if (requiresAuth && !user) {
            if (path === '/jobs') {
                navigate('/login');
                toast.info('Please login to view jobs');
            } else if (path === '/browse') {
                navigate('/signup');
                toast.info('Please signup to browse jobs');
            } else {
                navigate('/login');
            }
        } else {
            navigate(path);
        }
        setMobileMenuOpen(false);
    };

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    return (
        <nav
            className='border-b sticky top-0 z-40 w-full'
            style={{
                backgroundColor: 'var(--bg-secondary)',
                borderColor: 'var(--border-color)'
            }}
        >
            <div className='flex items-center justify-between mx-auto max-w-7xl h-14 xs:h-16 sm:h-16 md:h-16 px-3 xs:px-4 sm:px-6 lg:px-8'>
                {/* Logo Section */}
                <div className="flex-shrink-0">
                    <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                        <div className="flex items-center gap-2 xs:gap-3">
                            <Logo size={28} className="xs:w-8 xs:h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex-shrink-0" />
                            <div className="">
                                <ShuffleText
                                    text="JobPortal"
                                    className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-[hsl(222.2deg,30.47%,55.61%)] to-cyan-500 bg-clip-text text-transparent"
                                />
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <div className='hidden md:flex items-center gap-6 lg:gap-8 xl:gap-12'>
                    <ul className='flex font-medium items-center gap-3 lg:gap-4 xl:gap-5'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li>
                                        <Link
                                            to="/admin/companies"
                                            className="transition-all hover:opacity-70 text-sm lg:text-base"
                                            style={{ color: 'var(--text-primary)' }}
                                        >
                                            Companies
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/admin/jobs"
                                            className="transition-all hover:opacity-70 text-sm lg:text-base"
                                            style={{ color: 'var(--text-primary)' }}
                                        >
                                            Jobs
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link
                                            to={user ? "/home" : "/"}
                                            className={`transition-all hover:opacity-70 text-sm lg:text-base ${isActive('/home') ? 'font-bold border-b-2 border-purple-600' : ''}`}
                                            style={{ color: isActive('/home') ? 'var(--accent-primary)' : 'var(--text-primary)' }}
                                        >
                                            Home
                                        </Link>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => handleNavigation('/jobs', true)}
                                            className={`transition-all hover:opacity-70 text-sm lg:text-base ${isActive('/jobs') ? 'font-bold border-b-2 border-purple-600' : ''}`}
                                            style={{ color: isActive('/jobs') ? 'var(--accent-primary)' : 'var(--text-primary)' }}
                                        >
                                            Jobs
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => handleNavigation('/browse', true)}
                                            className={`transition-all hover:opacity-70 text-sm lg:text-base ${isActive('/browse') ? 'font-bold border-b-2 border-purple-600' : ''}`}
                                            style={{ color: isActive('/browse') ? 'var(--accent-primary)' : 'var(--text-primary)' }}
                                        >
                                            Browse
                                        </button>
                                    </li>
                                </>
                            )
                        }
                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to="/login">
                                    <Button variant="outline" size="sm" className="text-xs lg:text-sm">
                                        Login
                                    </Button>
                                </Link>
                                <Link to="/signup">
                                    <Button className="bg-purple-600 hover:bg-purple-700 text-xs lg:text-sm" size="sm">
                                        Signup
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer h-8 w-8 lg:h-9 lg:w-9 ring-2 ring-transparent hover:ring-purple-600 transition-all">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-72 sm:w-80"
                                    style={{
                                        backgroundColor: 'var(--bg-secondary)',
                                        borderColor: 'var(--border-color)'
                                    }}
                                >
                                    <div>
                                        <div className='flex gap-3 items-start'>
                                            <Avatar className="cursor-pointer h-12 w-12 flex-shrink-0">
                                                <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                                            </Avatar>
                                            <div className="flex-1 min-w-0">
                                                <h4
                                                    className='font-medium truncate text-sm sm:text-base'
                                                    style={{ color: 'var(--text-primary)' }}
                                                >
                                                    {user?.fullname}
                                                </h4>
                                                <p
                                                    className='text-xs sm:text-sm line-clamp-2 mt-0.5'
                                                    style={{ color: 'var(--text-secondary)' }}
                                                >
                                                    {user?.profile?.bio}
                                                </p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col my-3 gap-1'>
                                            {
                                                user && user.role === 'student' && (
                                                    <Link
                                                        to="/profile"
                                                        className='flex items-center gap-2 px-2 py-2 rounded-md transition-all hover:bg-opacity-10 hover:bg-purple-600'
                                                        style={{ color: 'var(--text-primary)' }}
                                                    >
                                                        <User2 className="h-4 w-4" />
                                                        <span className="text-sm">View Profile</span>
                                                    </Link>
                                                )
                                            }
                                            <button
                                                onClick={logoutHandler}
                                                className='flex items-center gap-2 px-2 py-2 rounded-md transition-all w-full text-left hover:bg-opacity-10 hover:bg-red-600'
                                                style={{ color: 'var(--text-primary)' }}
                                            >
                                                <LogOut className="h-4 w-4" />
                                                <span className="text-sm">Logout</span>
                                            </button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }
                </div>

                {/* Mobile Menu Controls */}
                <div className='md:hidden flex items-center gap-2 xs:gap-3'>
                    {user && (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer h-7 w-7 xs:h-8 xs:w-8 ring-2 ring-transparent active:ring-purple-600 transition-all">
                                    <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent
                                className="w-[calc(100vw-2rem)] max-w-sm"
                                align="end"
                                style={{
                                    backgroundColor: 'var(--bg-secondary)',
                                    borderColor: 'var(--border-color)'
                                }}
                            >
                                <div>
                                    <div className='flex gap-2 xs:gap-3 items-start'>
                                        <Avatar className="cursor-pointer h-10 w-10 xs:h-12 xs:w-12 flex-shrink-0">
                                            <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                                        </Avatar>
                                        <div className="flex-1 min-w-0">
                                            <h4
                                                className='font-medium text-sm xs:text-base truncate'
                                                style={{ color: 'var(--text-primary)' }}
                                            >
                                                {user?.fullname}
                                            </h4>
                                            <p
                                                className='text-xs line-clamp-2 mt-0.5'
                                                style={{ color: 'var(--text-secondary)' }}
                                            >
                                                {user?.profile?.bio}
                                            </p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col my-2 xs:my-3 gap-1'>
                                        {
                                            user && user.role === 'student' && (
                                                <Link
                                                    to="/profile"
                                                    onClick={() => setMobileMenuOpen(false)}
                                                    className='flex items-center gap-2 px-2 py-2.5 rounded-md transition-all active:bg-opacity-10 active:bg-purple-600'
                                                    style={{ color: 'var(--text-primary)' }}
                                                >
                                                    <User2 className="h-4 w-4" />
                                                    <span className="text-sm">View Profile</span>
                                                </Link>
                                            )
                                        }
                                        <button
                                            onClick={logoutHandler}
                                            className='flex items-center gap-2 px-2 py-2.5 rounded-md transition-all w-full text-left active:bg-opacity-10 active:bg-red-600'
                                            style={{ color: 'var(--text-primary)' }}
                                        >
                                            <LogOut className="h-4 w-4" />
                                            <span className="text-sm">Logout</span>
                                        </button>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="p-2 rounded-md transition-all active:scale-95 min-h-[44px] min-w-[44px] flex items-center justify-center"
                        style={{ color: 'var(--text-primary)' }}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X className="h-5 w-5 xs:h-6 xs:w-6" /> : <Menu className="h-5 w-5 xs:h-6 xs:w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div
                    className='md:hidden border-t animate-in slide-in-from-top-2 duration-200'
                    style={{
                        backgroundColor: 'var(--bg-secondary)',
                        borderColor: 'var(--border-color)'
                    }}
                >
                    <div className='px-3 xs:px-4 py-3 xs:py-4 space-y-1'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <Link
                                        to="/admin/companies"
                                        className="block py-3 px-3 rounded-md transition-all active:bg-opacity-10 active:bg-purple-600 text-sm xs:text-base min-h-[44px] flex items-center"
                                        onClick={() => setMobileMenuOpen(false)}
                                        style={{ color: 'var(--text-primary)' }}
                                    >
                                        Companies
                                    </Link>
                                    <Link
                                        to="/admin/jobs"
                                        className="block py-3 px-3 rounded-md transition-all active:bg-opacity-10 active:bg-purple-600 text-sm xs:text-base min-h-[44px] flex items-center"
                                        onClick={() => setMobileMenuOpen(false)}
                                        style={{ color: 'var(--text-primary)' }}
                                    >
                                        Jobs
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to={user ? "/home" : "/"}
                                        className={`block py-3 px-3 rounded-md transition-all active:bg-opacity-10 active:bg-purple-600 text-sm xs:text-base min-h-[44px] flex items-center ${isActive('/home') ? 'font-bold bg-purple-600 bg-opacity-10' : ''}`}
                                        onClick={() => setMobileMenuOpen(false)}
                                        style={{ color: isActive('/home') ? 'var(--accent-primary)' : 'var(--text-primary)' }}
                                    >
                                        Home
                                    </Link>
                                    <button
                                        onClick={() => handleNavigation('/jobs', true)}
                                        className={`block py-3 px-3 rounded-md transition-all active:bg-opacity-10 active:bg-purple-600 text-left w-full text-sm xs:text-base min-h-[44px] flex items-center ${isActive('/jobs') ? 'font-bold bg-purple-600 bg-opacity-10' : ''}`}
                                        style={{ color: isActive('/jobs') ? 'var(--accent-primary)' : 'var(--text-primary)' }}
                                    >
                                        Jobs
                                    </button>
                                    <button
                                        onClick={() => handleNavigation('/browse', true)}
                                        className={`block py-3 px-3 rounded-md transition-all active:bg-opacity-10 active:bg-purple-600 text-left w-full text-sm xs:text-base min-h-[44px] flex items-center ${isActive('/browse') ? 'font-bold bg-purple-600 bg-opacity-10' : ''}`}
                                        style={{ color: isActive('/browse') ? 'var(--accent-primary)' : 'var(--text-primary)' }}
                                    >
                                        Browse
                                    </button>
                                </>
                            )
                        }
                        {!user && (
                            <div className='flex flex-col gap-2 pt-2'>
                                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                                    <Button variant="outline" className="w-full min-h-[44px] text-sm xs:text-base">Login</Button>
                                </Link>
                                <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                                    <Button className="bg-purple-600 hover:bg-purple-700 w-full min-h-[44px] text-sm xs:text-base">Signup</Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar
