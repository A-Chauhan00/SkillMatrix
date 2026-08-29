import express from "express";
import {
    loginUser,
    registerUser,
    deleteUserAccount,
    getCurrentUser,
    logoutUser,
    updateUserProfile
} from "../controllers/user.controller.js";
import { authMiddleware} from "../middleware/auth.middleware.js";
import upload from "../utils/multer.js";


const router = express.Router();

// Auth routes
router.post("/signin", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// Profile routes
router.get("/profile", authMiddleware, getCurrentUser);
router.patch("/profile", 
    authMiddleware, 
    upload.single("avatar"), 
    updateUserProfile
);


export default router;