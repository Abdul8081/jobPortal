import { createSlice } from "@reduxjs/toolkit";

const membershipSlice = createSlice({
    name: "membership",
    initialState: {
        plans: [],
        razorpayKeyId: "",
        membershipStatus: null,
        loading: false,
        paymentLoading: false,
    },
    reducers: {
        setPlans: (state, action) => {
            state.plans = action.payload;
        },
        setRazorpayKeyId: (state, action) => {
            state.razorpayKeyId = action.payload;
        },
        setMembershipStatus: (state, action) => {
            state.membershipStatus = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setPaymentLoading: (state, action) => {
            state.paymentLoading = action.payload;
        },
    }
});

export const {
    setPlans,
    setRazorpayKeyId,
    setMembershipStatus,
    setLoading,
    setPaymentLoading,
} = membershipSlice.actions;

export default membershipSlice.reducer;
