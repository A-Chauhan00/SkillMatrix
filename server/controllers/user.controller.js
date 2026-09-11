import { User } from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";
import { deleteMediaFromCloudinary, uploadToCloudinary } from "../utils/cloudinary.js";
import bcrypt from "bcryptjs";



export const registerUser = async (req, res) => {
  try {
     const {name,email,password,role='student'}=req.body;
     const existingUser= await User.findOne({email});

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
      
     generateToken(res,user);
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
        return res.status(500).json({
            success: false,
            message: "an error occured during register user",
            error: error.message
        });
  }
 
};


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email or password is incorrect",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "Email or password is incorrect",
      });
    }

    generateToken(res, user);

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Couldn't login user",
      error: error.message
    });
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


export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch user context",
      error: error.message,
    });
  }
};

export const updateUserProfile = async (req, res) => {
  try {

    const { name, bio } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (name) user.name = name;
    if (bio !== undefined) user.bio = bio;

    if (req.file) {
      const oldAvatarUrl = user.avatar;

      const uploadResult = await uploadToCloudinary(req.file.path);

      if (!uploadResult || !uploadResult.secure_url) {
        // Clean up if upload fails
        if (fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
        }
        return res.status(500).json({
          success: false,
          message: "Failed to upload image to Cloudinary",
        });
      }

      // Assign new Cloudinary URL
      user.avatar = uploadResult.secure_url;

      // Clean up old avatar  
      if (oldAvatarUrl && !oldAvatarUrl.includes("default-avatar")) {
        try {
          await deleteMediaFromCloudinary(oldAvatarUrl);
        } catch (deleteError) {
          console.error("Failed to delete old avatar", deleteError.message);
        }
      }
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
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An internal server error occurred in updateUserProfile",
      error: error.message,
    });
  }
};

export const deleteUserAccount =async (req, res) => {
  try {

    const user = await User.findById(req.user.id);

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
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "Your account has been deleted.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting account",
      error: error.message,
    });
  }
};
