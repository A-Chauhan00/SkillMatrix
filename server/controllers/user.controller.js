import { User } from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";



export const createUserAccount = async (req, res) => {
  try {
     const {name,email,password,role='student'}=req.body;
     const existingUser= await User.findOne(email);
     if(existingUser){
       throw new Error("User already exists");
     }
     const user = await User.create({
      name,
      email,
      password,
      role
     })
      generateToken(res,user,'Account created successfully');
     return res.status(200).json({success:true,message:"User account successfully created"});
     
  } catch (error) {
     console.log("error creating user account",error);
      return res.status(400).json({success:false,message:"Couldn't create user account"});
  }
 
};


export const authenticateUser = async (req, res) => {
 
  try {
    const {email,password}=req.body;
  const user=await User.findOne(email).select('+password');

  if(!user || !(await user.comparepassword(password))){
    throw new Error("Invalid email or password");
  }
   
   generateToken(res,user,'Welcome back');
   return res.status(200).json({success:true,message:"User authenticated successfully"});
     
  } catch (error) {
     console.log("error authenticating user account",error);
      return res.status(400).json({success:false,message:"Couldn't authenticate user account"});
  }
  

};


export const logoutUser = async (_, res) => {
 
   try {
      res.cookie("token","",{maxAge:0});
       return res.status(200).json({success:true,message:"User logged out successfully"});
   } catch (error) {
    console.log("error loggin user out",error);
      return res.status(400).json({success:false,message:"Couldn't signout user account"});
   }
};


export const getCurrentUserProfile = async (req, res) => {
  
  try {
   const user= User.findById(req.id).populate({
    path:"enrolledCourses.course",
    select:'title thumbnail description'
   });

   if(!user){
    throw new Error("User not found");
   }

   res.status(200).json({
    success:true,
    data:{
      ...user.toJson(),
    }
   })

  } catch (error) {
    console.log("error fetching user profile",error);
    return res.status(400).json({success:false,message:"Couldn't fetch user profile"});
  }
};


export const updateUserProfile = async (req, res) => {
  
  try {
    const {name,email,bio}=req.body;
    const updateData= {name,email,bio};
     
    if(req.file){
      const avatarResult=await uploadMedia(req.file.path);
      updateData.avatar=avatarResult.secure_url;

      //deleting old avatar
      const user = await User.findById(req.id)
      if(user.avatar && user.avatar!='default-avatar.png'){
        await deleteMediaFromCloudinary(user.avatar);
      }
    }
  } catch (error) {
    console.log("error updating user profile",error);
    return res.status(400).json({success:false,message:"Couldn't update user profile"});
  }
  
};


export const changeUserPassword = async (req, res) => {

};


export const forgotPassword = async (req, res) => {

};


export const resetPassword = async (req, res) => {
  
};


export const deleteUserAccount =async (req, res) => {
  
};
