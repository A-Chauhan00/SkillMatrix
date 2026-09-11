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
import { validate } from "../middleware/validation.middleware.js";
import {
  registerValidation,
  loginValidation,
  updateProfileValidation,
} from "../validators/auth.validator.js";


const router = express.Router();

// Auth routes
router.post("/register",validate(registerValidation), registerUser);

router.post("/login",validate(loginValidation), loginUser);

router.post("/logout", logoutUser);

// Profile routes
router.get("/profile", authMiddleware, getCurrentUser);

router.patch("/profile",  authMiddleware,  upload.single("avatar"),  validate(updateProfileValidation), updateUserProfile);

router.delete("/profile", authMiddleware, deleteUserAccount);


export default router;