import Razorpay from "razorpay";
import crypto from "crypto";
import { User } from "../models/user.model.js";

const PLANS = {
    monthly: {
        id: "monthly",
        name: "Pro Monthly",
        price: 499,
        amount: 49900, // paise
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
    quarterly: {
        id: "quarterly",
        name: "Elite Quarterly",
        price: 1199,
        amount: 119900,
        currency: "INR",
        durationDays: 90,
        description: "Best value for landing your dream job in the next quarter.",
        badge: "Best Value",
        features: [
            "All Pro Monthly features included",
            "AI Resume Analysis & ATS Score optimization",
            "3x Profile visibility boost to top recruiters",
            "Weekly curated job match digests",
            "Free access to interview preparation guides"
        ]
    },
    annual: {
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
};

const getRazorpayInstance = () => {
    const key_id = process.env.RAZORPAY_KEY_ID || "rzp_test_placeholder";
    const key_secret = process.env.RAZORPAY_KEY_SECRET || "secret_placeholder";
    return new Razorpay({
        key_id,
        key_secret
    });
};

export const getPlans = async (req, res) => {
    try {
        const keyId = process.env.RAZORPAY_KEY_ID || "";
        return res.status(200).json({
            success: true,
            plans: Object.values(PLANS),
            razorpayKeyId: keyId
        });
    } catch (error) {
        console.error("Error fetching plans:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to retrieve membership plans."
        });
    }
};

export const createOrder = async (req, res) => {
    try {
        const { planId } = req.body;
        const userId = req.id;

        if (!planId || !PLANS[planId]) {
            return res.status(400).json({
                success: false,
                message: "Please select a valid membership plan (monthly, quarterly, or annual)."
            });
        }

        const selectedPlan = PLANS[planId];
        const razorpay = getRazorpayInstance();

        const options = {
            amount: selectedPlan.amount,
            currency: selectedPlan.currency,
            receipt: `rcpt_${userId.toString().slice(-6)}_${Date.now().toString().slice(-6)}`,
            notes: {
                userId: userId.toString(),
                planId: selectedPlan.id,
                planName: selectedPlan.name
            }
        };

        const order = await razorpay.orders.create(options);

        return res.status(200).json({
            success: true,
            order,
            plan: selectedPlan,
            key: process.env.RAZORPAY_KEY_ID || ""
        });
    } catch (error) {
        console.error("Razorpay order creation error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create Razorpay payment order. Check server keys.",
            error: error.message
        });
    }
};

export const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, planId } = req.body;
        const userId = req.id;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !planId) {
            return res.status(400).json({
                success: false,
                message: "Missing payment verification parameters."
            });
        }

        const plan = PLANS[planId];
        if (!plan) {
            return res.status(400).json({
                success: false,
                message: "Invalid membership plan selected."
            });
        }

        // Verify Razorpay HMAC signature
        const secret = process.env.RAZORPAY_KEY_SECRET || "";
        const generatedSignature = crypto
            .createHmac("sha256", secret)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        if (generatedSignature !== razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: "Payment signature verification failed. Untrusted transaction."
            });
        }

        // Calculate membership expiration
        const startDate = new Date();
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + plan.durationDays);

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                $set: {
                    membership: {
                        isPremium: true,
                        plan: plan.id,
                        startDate,
                        expiresAt,
                        razorpayOrderId: razorpay_order_id,
                        razorpayPaymentId: razorpay_payment_id
                    }
                }
            },
            { new: true }
        ).select("-password");

        return res.status(200).json({
            success: true,
            message: `🎉 Congratulations! You are now a ${plan.name} member!`,
            user: updatedUser
        });
    } catch (error) {
        console.error("Payment verification error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal error verifying payment.",
            error: error.message
        });
    }
};

export const getMembershipStatus = async (req, res) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId).select("membership fullname email");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        const membership = user.membership || { isPremium: false, plan: "none" };

        // Check if premium has expired
        if (membership.isPremium && membership.expiresAt && new Date() > new Date(membership.expiresAt)) {
            user.membership.isPremium = false;
            user.membership.plan = "none";
            await user.save();
            membership.isPremium = false;
            membership.plan = "none";
        }

        return res.status(200).json({
            success: true,
            membership,
            user: {
                fullname: user.fullname,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Get membership status error:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to retrieve membership status."
        });
    }
};
