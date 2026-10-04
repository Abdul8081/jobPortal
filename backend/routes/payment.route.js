import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
    getPlans,
    createOrder,
    verifyPayment,
    getMembershipStatus
} from "../controllers/payment.controller.js";

const router = express.Router();

// Public route to view plans
router.route("/plans").get(getPlans);

// Authenticated user routes for orders, verification, and status
router.route("/create-order").post(isAuthenticated, createOrder);
router.route("/verify").post(isAuthenticated, verifyPayment);
router.route("/status").get(isAuthenticated, getMembershipStatus);

export default router;
