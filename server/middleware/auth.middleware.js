import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const authMiddleware = async (req, res, next) => {
  try {
     const token = req.cookies.token;
    if(!token){
        return res.status(401).json({success:false, message:"not authenticated"})
    }

    const decoded=jwt.verify(
        token,
        process.env.JWT_SECRET
    )
    
    req.user = await User.findById(decoded.id || decoded.userId).select("-password");
    next();

  } catch (error) {
        console.error("Authentication error:", error);

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
  }
};


// Middleware for role-based access control
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    // Check if the logged-in user's role is included in allowed roles
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Role (${req.user.role}) is not authorized to access this resource.`,
      });
    }
    next();
  };
};

// Optional authentication middleware
export const optionalAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (token) {
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      req.id = decoded.userId;
    }
    next();
  } catch (error) {
    next();
  }
};
