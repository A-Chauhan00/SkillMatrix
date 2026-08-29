import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const authMiddleware = async (req, res, next) => {
  // // Check if token exists
  // const token = req.cookies.token;
  // if (!token) {
  //   throw new Error(
  //     "You are not logged in. Please log in to get access."
  //   );
  // }

  // try {
  //   // Verify token
  //   const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  //   // Add user ID to request
  //   req.id = decoded.userId;
  //   const user = await User.findById(req.id);
  //   if (!user) {
  //     throw new Error("User not found");
  //   }

  //   req.user = user;

  //   next();
  // } catch (error) {
  //   if (error.name === "JsonWebTokenError") {
  //     throw new Error("Invalid token. Please log in again.");
  //   }
  //   if (error.name === "TokenExpiredError") {
  //     throw new Error("Your token has expired. Please log in again.");
  //   }
  //   throw error;
  // }
  try {
     const token = req.cookies.token;
    if(!token){
        return res.status(401).json({success:false, message:"not authenticated"})
    }

    const decoded=jwt.verify(
        token,
        process.env.JWT_SECRET
    )
    
    req.user=decoded;
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
export const restrictTo = (...roles) => {
  return async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new Error(
        "You do not have permission to perform this action",
        403
      );
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
