import express from "express";
import {
  getCoursePurchaseStatus,
  getPurchasedCourses,
  stripeWebhook,
 createCheckoutSession,
} from "../controllers/coursePurchase.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router
  .route("/checkout/create-checkout-session")
  .post(authMiddleware,  createCheckoutSession);
router
  .route("/webhook")
  .post(express.raw({ type: "application/json" }),stripeWebhook);
router
  .route("/course/:courseId/detail-with-status")
  .get(authMiddleware, getCoursePurchaseStatus);

router.route("/").get(authMiddleware, getPurchasedCourses);

export default router;