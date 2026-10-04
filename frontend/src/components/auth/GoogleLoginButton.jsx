import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const GoogleLoginButton = ({ role }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const googleBtnRef = useRef(null);
    const [googleLoaded, setGoogleLoaded] = useState(false);

    useEffect(() => {
        // Load the Google GSI script
        if (document.getElementById('google-gsi-script')) {
            if (window.google?.accounts?.id) setGoogleLoaded(true);
            return;
        }
        const script = document.createElement('script');
        script.id = 'google-gsi-script';
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        script.onload = () => setGoogleLoaded(true);
        document.head.appendChild(script);
    }, []);

    useEffect(() => {
        if (!googleLoaded || !window.google?.accounts?.id) return;

        window.google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: handleGoogleResponse,
        });

        if (googleBtnRef.current) {
            // Clear any previously rendered button
            googleBtnRef.current.innerHTML = '';
            window.google.accounts.id.renderButton(googleBtnRef.current, {
                theme: 'outline',
                size: 'large',
                width: '100%',
                text: 'continue_with',
                shape: 'rectangular',
            });
        }
    }, [googleLoaded, role]); // re-render when role changes so callback captures latest role

    const handleGoogleResponse = async (response) => {
        if (!role) {
            toast.error('Please select a role (Student or Recruiter) before using Google Sign-In.');
            return;
        }
        try {
            const res = await axios.post(
                `${USER_API_END_POINT}/google`,
                { credential: response.credential, role },
                { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
            );
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate('/home');
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error('Google login error:', error);
            toast.error(error?.response?.data?.message || 'Google sign-in failed.');
        }
    };

    return (
        <div style={{ width: '100%', marginTop: '8px', marginBottom: '8px' }}>
            {/* Divider */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                margin: '16px 0'
            }}>
                <div style={{
                    flex: 1,
                    height: '1px',
                    background: 'var(--border-color)'
                }} />
                <span style={{
                    color: 'var(--text-secondary)',
                    fontSize: '13px',
                    fontWeight: 500,
                    whiteSpace: 'nowrap'
                }}>
                    or continue with
                </span>
                <div style={{
                    flex: 1,
                    height: '1px',
                    background: 'var(--border-color)'
                }} />
            </div>

            {/* Google button container */}
            <div
                ref={googleBtnRef}
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    minHeight: '44px'
                }}
            />

            {!role && (
                <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: '12px',
                    textAlign: 'center',
                    marginTop: '6px',
                    opacity: 0.8
                }}>
                    Select a role above to use Google Sign-In
                </p>
            )}
        </div>
    );
};

export default GoogleLoginButton;
