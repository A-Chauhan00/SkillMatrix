import { User } from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";
import { deleteMediaFromCloudinary, uploadToCloudinary } from "../utils/cloudinary.js";
import bcrypt from "bcryptjs";



export const registerUser = async (req, res) => {
  try {
     const {name,email,password,role='student'}=req.body;
     const existingUser= await User.findOne(email);

      if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
     if(existingUser){
        return res.status(400).json({
                success: false,
                message: "User already exists"
            });
     }

      const hashedPassword = await bcrypt.hash(password, 10);
     const user = await User.create({
      name,
      email,
      password:hashedPassword,
      role
     })
      
     generateToken(user);
    return res.status(200).json(
      {
        success: true,
        message: "User account successfully created",
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        }
      });
     
  } catch (error) {
        console.log("error creating user account", error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
  }
 
};


export const loginUser = async (req, res) => {
 
  try {
    const {email,password}=req.body;
      if(!email || !password){
        return res.status(400).json({success:false, message:"All fields are required"})
    }
  const user=await User.findOne(email);

   if(!user){
         return res.status(400).json({success:false, message:"Email or password is incorrect"})
    }

    const isPasswordCorrect = await bcrypt.compare(password,user.password);

    if(!isPasswordCorrect){
        return res.status(409).json({success:false, message:"Email or password is incorrect"})
    }
   
   generateToken(user);
    return res.status(200).json(
      {
        success: true,
        message: "User logged in successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        }
      }
    );

  } catch (error) {
      console.log("Login error:",error);
     res.status(500).json({success:false, message:"Couldn't login user"})
  }
  

};


export const logoutUser = async (_, res) => {
 
   res.clearCookie("token", {
        httpOnly: true,
        sameSite: "strict",
       maxAge:0
    });

    res.status(200).json({
        success: true,
        message: "Logged out successfully"
    });
};


export const getCurrentUser= async (req, res) => {
  
  try {
    const user = await User.findById(req.user.userId).select("-password");

     if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

         res.status(200).json({
            success: true,
            message:"user profile fetched successfully",
            user
        });

  } catch (error) {
     console.error("Get current user error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to get user"
        });
  }
};


export const updateUserProfile = async (req, res) => {
  
  try {
    const userId = req.userId; 
    const { name, bio, password } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    //  Update basic fields if provided
    if (name) user.name = name;
    if (bio !== undefined) user.bio = bio; 

    //  Handle Avatar File Upload 
    if (req.file) {
      const uploadResult = await uploadToCloudinary(
        req.file.buffer,
        "skillmatrix/avatars",
        "image"
      );
      user.avatar = uploadResult.secure_url;
    }

    //  deleting old avatar
       user = await User.findById(req.id)
      if(user.avatar && user.avatar!='default-avatar.png'){
        await deleteMediaFromCloudinary(user.avatar);
       }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        bio: user.bio,
        enrolledCourses: user.enrolledCourses,
        createdCourses: user.createdCourses,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    // Handle Mongoose validation errors 
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }

    return res.status(500).json({
      success: false,
      message: "An internal server error occurred while updating the profile.",
      error: error.message,
    });
  }
};


export const deleteUserAccount =async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User account not found.",
      });
    }

    if (user.avatar && user.avatar !== "default-avatar.png") {
      try {
        const urlParts = user.avatar.split("/");
        const fileNameWithExtension = urlParts.pop();
        const folderName = urlParts.pop();
        const publicId = `${folderName}/${fileNameWithExtension.split(".")[0]}`;

        await cloudinary.v2.uploader.destroy(publicId);
      } catch (cloudinaryError) {
        console.error("Failed to delete avatar from Cloudinary:", cloudinaryError.message);
      }
    }

    if (user.role === "instructor") {
      await Course.deleteMany({ instructor: userId });
    }

    await user.deleteOne();

    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "Your account and associated data have been permanently deleted.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while attempting to delete your account.",
      error: error.message,
    });
  }
};
