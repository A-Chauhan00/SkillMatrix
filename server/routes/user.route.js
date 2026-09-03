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
import { validate } from "../middleware/validate.middleware.js";
import {
  registerValidate,
  loginValidate,
  updateProfileValidate,
} from "../validators/auth.validator.js";


const router = express.Router();

// Auth routes
router.post("/register",validate(registerValidate), registerUser);
router.post("/login",validate(loginValidate), loginUser);
router.post("/logout", logoutUser);

// Profile routes
router.get("/profile", authMiddleware, getCurrentUser);
router.patch("/profile", 
    authMiddleware, 
    upload.single("avatar"), 
    validate(updateProfileValidate),
    updateUserProfile
);

router.delete("/profile", authMiddleware, deleteUserAccount);


export default router;