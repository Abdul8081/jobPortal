import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Check, Sparkles, Zap, Crown, ShieldCheck, Flame, ArrowRight, Loader2, Star, CheckCircle2 } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PAYMENT_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { setPlans, setMembershipStatus } from '@/redux/membershipSlice';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const FALLBACK_PLANS = [
    {
        id: "monthly",
        name: "Pro Monthly",
        price: 499,
        amount: 49900,
        currency: "INR",
        durationDays: 30,
        description: "Perfect for active job seekers looking for immediate opportunities.",
        badge: "Popular",
        features: [
            "Exclusive access to Actively Hiring Premium Jobs",
            "Priority application badge & top listing to recruiters",
            "Direct recruiter messaging & contact info",
            "Real-time application status tracking",
            "24/7 Priority support"
        ]
    },
    {
        id: "quarterly",
        name: "Elite Quarterly",
        price: 1199,
        amount: 119900,
        currency: "INR",
        durationDays: 90,
        description: "Best value for landing your dream job in the next quarter.",
        badge: "Most Popular",
        highlighted: true,
        features: [
            "All Pro Monthly features included",
            "AI Resume Analysis & ATS Score optimization",
            "3x Profile visibility boost to top recruiters",
            "Weekly curated job match digests",
            "Free access to interview preparation guides"
        ]
    },
    {
        id: "annual",
        name: "VIP Annual",
        price: 3499,
        amount: 349900,
        currency: "INR",
        durationDays: 365,
        description: "Full year career acceleration and lifetime network benefits.",
        badge: "Maximum Savings",
        features: [
            "All Elite Quarterly features included",
            "1-on-1 Portfolio & Resume Review session",
            "Direct referral opportunities with partner companies",
            "VIP Gold profile badge on all applications",
            "Lifetime member networking community access"
        ]
    }
];

const Membership = () => {
    const { user } = useSelector(store => store.auth);
    const { allJobs } = useSelector(store => store.job);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [plansList, setPlansList] = useState(FALLBACK_PLANS);
    const [loadingPlanId, setLoadingPlanId] = useState(null);
    const [razorpayKey, setRazorpayKey] = useState('');
    const [pageLoading, setPageLoading] = useState(true);

    // Active membership details from user object
    const isPremium = user?.membership?.isPremium || false;
    const currentPlan = user?.membership?.plan || 'none';
    const expiresAt = user?.membership?.expiresAt;

    // Redirect recruiter away from membership page
    useEffect(() => {
        if (user && user.role === 'recruiter') {
            toast.info('Premium membership features are available for job seekers only.');
            navigate('/admin/companies', { replace: true });
        }
    }, [user, navigate]);

    // Load Razorpay SDK Script
    useEffect(() => {
        if (user?.role === 'recruiter') return;
        const loadRazorpayScript = () => {
            if (document.getElementById('razorpay-checkout-script')) return;
            const script = document.createElement('script');
            script.id = 'razorpay-checkout-script';
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.async = true;
            document.body.appendChild(script);
        };
        loadRazorpayScript();
    }, [user]);

    // Fetch plans from backend
    useEffect(() => {
        if (user?.role === 'recruiter') return;
        const fetchPlansAndStatus = async () => {
            try {
                const res = await axios.get(`${PAYMENT_API_END_POINT}/plans`);
                if (res.data.success && res.data.plans?.length > 0) {
                    setPlansList(res.data.plans);
                    dispatch(setPlans(res.data.plans));
                    if (res.data.razorpayKeyId) {
                        setRazorpayKey(res.data.razorpayKeyId);
                    }
                }
            } catch (err) {
                console.log('Using default membership plans catalog', err);
            } finally {
                setPageLoading(false);
            }
        };
        fetchPlansAndStatus();
    }, [dispatch, user]);

    const handleSubscribe = async (plan) => {
        if (!user) {
            toast.error('Please login to subscribe to a membership plan.');
            navigate('/login');
            return;
        }

        if (user.role === 'recruiter') {
            toast.error('Recruiters are not eligible to purchase premium membership plans.');
            return;
        }

        setLoadingPlanId(plan.id);

        try {
            // 1. Create Razorpay order on backend
            const orderRes = await axios.post(
                `${PAYMENT_API_END_POINT}/create-order`,
                { planId: plan.id },
                { withCredentials: true }
            );

            if (!orderRes.data.success) {
                throw new Error(orderRes.data.message || 'Failed to create order');
            }

            const { order, key } = orderRes.data;
            const keyToUse = key || razorpayKey;

            // 2. Open Razorpay Checkout Modal
            const options = {
                key: keyToUse,
                amount: order.amount,
                currency: order.currency || "INR",
                name: "JobPortal Premium",
                description: `${plan.name} Subscription`,
                image: "https://img.icons8.com/color/96/briefcase.png",
                order_id: order.id,
                prefill: {
                    name: user?.fullname || "",
                    email: user?.email || "",
                    contact: user?.phoneNumber ? String(user.phoneNumber) : ""
                },
                theme: {
                    color: "#9333ea"
                },
                handler: async function (response) {
                    // 3. Verify payment signature on backend
                    try {
                        const verifyRes = await axios.post(
                            `${PAYMENT_API_END_POINT}/verify`,
                            {
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                planId: plan.id
                            },
                            { withCredentials: true }
                        );

                        if (verifyRes.data.success) {
                            dispatch(setUser(verifyRes.data.user));
                            toast.success(verifyRes.data.message || 'Payment verified! Welcome to Premium.');
                        } else {
                            toast.error(verifyRes.data.message || 'Payment verification failed.');
                        }
                    } catch (verifyErr) {
                        console.error('Payment verification failed:', verifyErr);
                        toast.error(verifyErr?.response?.data?.message || 'Error completing payment verification.');
                    }
                },
                modal: {
                    ondismiss: function () {
                        toast.info('Payment window closed.');
                        setLoadingPlanId(null);
                    }
                }
            };

            if (window.Razorpay) {
                const rzp = new window.Razorpay(options);
                rzp.open();
            } else {
                toast.error('Payment gateway is loading. Please try again in a few seconds.');
            }
        } catch (error) {
            console.error('Payment error:', error);
            toast.error(error?.response?.data?.message || 'Unable to initiate payment.');
        } finally {
            setLoadingPlanId(null);
        }
    };

    const activeHiringJobs = allJobs?.filter(j => j.isActivelyHiring || j.isPremium) || [];

    if (user?.role === 'recruiter') {
        return null;
    }

    return (
        <div 
            className="min-h-screen flex flex-col w-full overflow-x-hidden"
            style={{ backgroundColor: 'var(--bg-primary)' }}
        >
            <Navbar />

            <div className="flex-1 w-full py-8 md:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                {/* Header Banner */}
                <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-4 bg-purple-500/10 border-purple-500/30 text-purple-400">
                        <Crown className="w-4 h-4 text-amber-400" />
                        <span className="text-xs sm:text-sm font-semibold tracking-wide uppercase">
                            Exclusive Career Acceleration
                        </span>
                    </div>

                    <h1 
                        className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4"
                        style={{ color: 'var(--text-primary)' }}
                    >
                        Unlock <span className="bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 bg-clip-text text-transparent">Premium Access</span> & Get Hired 3x Faster
                    </h1>

                    <p 
                        className="text-base sm:text-lg max-w-2xl mx-auto"
                        style={{ color: 'var(--text-secondary)' }}
                    >
                        Connect directly with actively hiring recruiters, skip the queue with priority applications, and access high-paying exclusive jobs.
                    </p>

                    {/* Active Membership Status Banner */}
                    {isPremium && (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mt-6 p-4 rounded-xl border flex items-center justify-between gap-4 flex-wrap bg-gradient-to-r from-purple-900/30 to-indigo-900/30 border-purple-500/40"
                        >
                            <div className="flex items-center gap-3 text-left">
                                <div className="p-2.5 rounded-lg bg-amber-400/20 text-amber-400">
                                    <Crown className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-sm sm:text-base text-white">
                                            Active {currentPlan.toUpperCase()} Membership
                                        </span>
                                        <Badge className="bg-green-500/20 text-green-400 border-green-500/40 text-[10px]">
                                            ACTIVE
                                        </Badge>
                                    </div>
                                    <p className="text-xs text-purple-200 mt-0.5">
                                        {expiresAt ? `Valid until: ${new Date(expiresAt).toLocaleDateString(undefined, { dateStyle: 'long' })}` : 'Unlimited Premium Access'}
                                    </p>
                                </div>
                            </div>
                            <Button 
                                onClick={() => navigate('/jobs')}
                                size="sm" 
                                className="bg-purple-600 hover:bg-purple-700 text-xs sm:text-sm font-semibold"
                            >
                                Browse Premium Jobs <ArrowRight className="w-4 h-4 ml-1.5" />
                            </Button>
                        </motion.div>
                    )}
                </div>

                {/* Pricing Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch mb-16">
                    {plansList.map((plan, idx) => {
                        const isCurrentActive = isPremium && currentPlan === plan.id;
                        const isHighlighted = plan.highlighted || plan.id === 'quarterly';

                        return (
                            <motion.div
                                key={plan.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: idx * 0.1 }}
                                className={`relative rounded-2xl border flex flex-col p-6 sm:p-8 transition-all duration-300 ${
                                    isHighlighted 
                                        ? 'border-purple-500 shadow-xl shadow-purple-500/10 scale-[1.02] md:scale-105 z-10' 
                                        : 'border-[var(--border-color)] hover:border-purple-500/50'
                                }`}
                                style={{
                                    backgroundColor: 'var(--bg-secondary)',
                                }}
                            >
                                {isHighlighted && (
                                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md">
                                        ⭐ {plan.badge || 'Most Popular'}
                                    </div>
                                )}

                                <div className="mb-6">
                                    <h3 
                                        className="text-xl font-bold mb-1"
                                        style={{ color: 'var(--text-primary)' }}
                                    >
                                        {plan.name}
                                    </h3>
                                    <p 
                                        className="text-xs sm:text-sm min-h-[36px]"
                                        style={{ color: 'var(--text-secondary)' }}
                                    >
                                        {plan.description}
                                    </p>
                                </div>

                                {/* Price section */}
                                <div className="mb-6 pb-6 border-b" style={{ borderColor: 'var(--border-color)' }}>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-3xl sm:text-4xl font-extrabold" style={{ color: 'var(--text-primary)' }}>
                                            ₹{plan.price}
                                        </span>
                                        <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                                            / {plan.durationDays === 30 ? 'month' : plan.durationDays === 90 ? '3 months' : 'year'}
                                        </span>
                                    </div>
                                    <div className="mt-1 text-xs text-emerald-400 font-medium">
                                        {plan.durationDays === 365 ? '🎉 Save over 40% annually' : plan.durationDays === 90 ? '⚡ Most chosen by job hunters' : 'Simple monthly billing'}
                                    </div>
                                </div>

                                {/* Features List */}
                                <div className="flex-1 space-y-3.5 mb-8">
                                    {plan.features?.map((feat, fIdx) => (
                                        <div key={fIdx} className="flex items-start gap-3">
                                            <div className="mt-0.5 rounded-full p-0.5 bg-purple-500/20 text-purple-400 flex-shrink-0">
                                                <Check className="w-3.5 h-3.5" />
                                            </div>
                                            <span 
                                                className="text-xs sm:text-sm leading-tight"
                                                style={{ color: 'var(--text-primary)' }}
                                            >
                                                {feat}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* Subscribe Button */}
                                <Button
                                    onClick={() => handleSubscribe(plan)}
                                    disabled={isCurrentActive || loadingPlanId === plan.id}
                                    className={`w-full py-5 font-semibold text-sm sm:text-base rounded-xl transition-all ${
                                        isCurrentActive
                                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-default'
                                            : isHighlighted
                                            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg shadow-purple-600/20'
                                            : 'bg-purple-600 hover:bg-purple-700 text-white'
                                    }`}
                                >
                                    {loadingPlanId === plan.id ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Processing...
                                        </>
                                    ) : isCurrentActive ? (
                                        <>
                                            <CheckCircle2 className="w-4 h-4 mr-2" />
                                            Current Active Plan
                                        </>
                                    ) : (
                                        <>
                                            <Zap className="w-4 h-4 mr-2 fill-current" />
                                            Get Started Now
                                        </>
                                    )}
                                </Button>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Features Value Matrix */}
                <div 
                    className="rounded-2xl border p-6 sm:p-10 mb-16"
                    style={{ 
                        backgroundColor: 'var(--bg-secondary)', 
                        borderColor: 'var(--border-color)' 
                    }}
                >
                    <div className="text-center max-w-2xl mx-auto mb-8">
                        <h2 
                            className="text-2xl sm:text-3xl font-bold mb-2"
                            style={{ color: 'var(--text-primary)' }}
                        >
                            Why Members Get Hired Faster
                        </h2>
                        <p 
                            className="text-sm sm:text-base"
                            style={{ color: 'var(--text-secondary)' }}
                        >
                            JobPortal Premium is designed to eliminate the resume black hole and get your profile straight into recruiters' inboxes.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-5 rounded-xl border flex flex-col gap-3" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-tertiary)' }}>
                            <div className="w-10 h-10 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center">
                                <Flame className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold text-base" style={{ color: 'var(--text-primary)' }}>Actively Hiring Filter</h3>
                            <p className="text-xs sm:text-sm" style={{ color: 'var(--text-secondary)' }}>
                                Only apply to companies actively reviewing applications today. Save hours of applying to outdated job openings.
                            </p>
                        </div>

                        <div className="p-5 rounded-xl border flex flex-col gap-3" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-tertiary)' }}>
                            <div className="w-10 h-10 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
                                <Crown className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold text-base" style={{ color: 'var(--text-primary)' }}>Top Applicant Highlight</h3>
                            <p className="text-xs sm:text-sm" style={{ color: 'var(--text-secondary)' }}>
                                Your job applications appear at the very top of recruiter candidate dashboards with a verified applicant badge.
                            </p>
                        </div>

                        <div className="p-5 rounded-xl border flex flex-col gap-3" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-tertiary)' }}>
                            <div className="w-10 h-10 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                                <ShieldCheck className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold text-base" style={{ color: 'var(--text-primary)' }}>Direct Hiring Manager Connect</h3>
                            <p className="text-xs sm:text-sm" style={{ color: 'var(--text-secondary)' }}>
                                Access recruiter profiles and direct messaging options to follow up on your submissions professionally.
                            </p>
                        </div>
                    </div>
                </div>

                {/* FAQ section */}
                <div className="max-w-3xl mx-auto mb-12">
                    <h2 
                        className="text-2xl font-bold text-center mb-6"
                        style={{ color: 'var(--text-primary)' }}
                    >
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                        <div className="p-4 rounded-xl border" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}>
                            <h4 className="font-semibold text-sm sm:text-base mb-1" style={{ color: 'var(--text-primary)' }}>
                                How does payment processing work?
                            </h4>
                            <p className="text-xs sm:text-sm" style={{ color: 'var(--text-secondary)' }}>
                                We use Razorpay's secure payment infrastructure supporting UPI (Google Pay, PhonePe, Paytm), Credit/Debit Cards, NetBanking, and Wallets with 256-bit encryption.
                            </p>
                        </div>
                        <div className="p-4 rounded-xl border" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}>
                            <h4 className="font-semibold text-sm sm:text-base mb-1" style={{ color: 'var(--text-primary)' }}>
                                When does my premium membership activate?
                            </h4>
                            <p className="text-xs sm:text-sm" style={{ color: 'var(--text-secondary)' }}>
                                Instant activation! As soon as your payment is verified, your account is immediately upgraded and all premium features and badges are unlocked.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Membership;
