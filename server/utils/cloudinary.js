import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from "dotenv";
 dotenv.config();

 cloudinary.config({
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET,
    cloud_name:process.env.CLOUD_NAME
 })


export const uploadToCloudinary = async (filePath) => {
  try {
    if (!filePath) return null;

    const uploadResponse = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
      folder: "skillmatrix/avatars",
    });


    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return uploadResponse;
  } catch (error) {
    console.error("Error uploading media to Cloudinary:", error);

    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return null;
  }
};



const getPublicIdFromUrl = (url) => {
  if (!url) return null;

  const regex = /\/upload\/(?:v\d+\/)?(.+)\.[a-zA-Z0-9]+$/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

export const deleteMediaFromCloudinary = async (publicIdOrUrl) => {
  try {
    if (!publicIdOrUrl) return null;
    const publicId = publicIdOrUrl.startsWith("http")
      ? getPublicIdFromUrl(publicIdOrUrl)
      : publicIdOrUrl;

    if (!publicId) return null;

    const response = await cloudinary.uploader.destroy(publicId);
    return response;
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
    return null;
  }
};

export const deleteVideoFromCloudinary = async (publicIdOrUrl) => {
  try {
    if (!publicIdOrUrl) return null;
    const publicId = publicIdOrUrl.startsWith("http")
      ? getPublicIdFromUrl(publicIdOrUrl)
      : publicIdOrUrl;

    if (!publicId) return null;

    const response = await cloudinary.uploader.destroy(publicId, {
      resource_type: "video",
    });
    return response;
  } catch (error) {
    console.error("Error deleting video from Cloudinary:", error);
    return null;
  }
};