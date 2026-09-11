import {Course} from "../models/course.model.js";
import { uploadToCloudinary,deleteMediaFromCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";
import {Lecture} from "../models/lecture.model.js";
import fs from 'fs';

export const createNewCourse = async (req, res) => {
  try {
    const { title, subtitle, description, category, level, price } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Course thumbnail is required.",
      });
    }

    // 2. Upload thumbnail to Cloudinary
    const uploadResult = await uploadToCloudinary(req.file.path);

    if (!uploadResult || !uploadResult.secure_url) {
      // Clean up  file if upload fails
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(500).json({
        success: false,
        message: "Failed to upload course thumbnail to Cloudinary.",
      });
    }

    const thumbnailUrl = uploadResult.secure_url;

    const course = await Course.create({
      title,
      subtitle,
      description,
      category,
      level,
      price: price ? Number(price) : 0,
      thumbnail: thumbnailUrl, 
      instructor: req.user.id,  
    });

  
    await User.findByIdAndUpdate(req.user.id, {
      $push: { createdCourses: course._id },
    });

    return res.status(201).json({
      success: true,
      message: "Course created successfully.",
      course,
    });
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    return res.status(500).json({
      success: false,
      message: " error occurred while creating the course.",
      error: error.message,
    });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { title, subtitle, description, category, level, price } = req.body;

    const course = await Course.findById(courseId);

    if (!course) {
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(404).json({
        success: false,
        message: "Course doesn't exist",
      });
    }

    if (
      course.instructor.toString() !== req.user.id.toString() &&
      req.user.role !== "admin"
    ) {
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this course",
      });
    }

    if (req.file) {
      const oldThumbnailUrl = course.thumbnail;

      // Upload new thumbnail 
      const uploadResult = await uploadToCloudinary(req.file.path);

      if (!uploadResult || !uploadResult.secure_url) {
        if (fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
        }
        return res.status(500).json({
          success: false,
          message: "Failed to upload new thumbnail to Cloudinary",
        });
      }

      course.thumbnail = uploadResult.secure_url;

      // Clean up old thumbnail 
      if (oldThumbnailUrl) {
        try {
          await deleteMediaFromCloudinary(oldThumbnailUrl);
        } catch (deleteError) {
          console.error("Failed to delete old thumbnail:", deleteError.message);
        }
      }
    }

    if (title) course.title = title;
    if (subtitle !== undefined) course.subtitle = subtitle;
    if (description) course.description = description;
    if (category) course.category = category;
    if (level) course.level = level;
    if (price !== undefined) course.price = Number(price);

    const updatedCourse = await course.save();

    return res.status(200).json({
      success: true,
      message: "Course updated successfully",
      updatedCourse,
    });
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the course",
      error: error.message,
    });
  }
};

export const searchCourses=async(req,res)=>{
  try {
      const {
    query = "",
    categories = [],
    level,
    priceRange,
    sortBy = "newest",
  } = req.query;

  // Create search query
  const searchCriteria = {
    isPublished: true,
    $or: [
      { title: { $regex: query, $options: "i" } },
      { subtitle: { $regex: query, $options: "i" } },
      { description: { $regex: query, $options: "i" } },
    ],
  };

  
  if (categories.length > 0) {
    searchCriteria.category = { $in: categories };
  }
  if (level) {
    searchCriteria.level = level;
  }
  if (priceRange) {
    const [min, max] = priceRange.split("-");
    searchCriteria.price = { $gte: min || 0, $lte: max || Infinity };
  }

  // Define sorting
  const sortOptions = {};
  switch (sortBy) {
    case "price-low":
      sortOptions.price = 1;
      break;
    case "price-high":
      sortOptions.price = -1;
      break;
    case "oldest":
      sortOptions.createdAt = 1;
      break;
    default:
      sortOptions.createdAt = -1;
  }

  const courses = await Course.find(searchCriteria)
    .populate({
      path: "instructor",
      select: "name avatar",
    })
    .sort(sortOptions);

 return res.status(200).json({
    success: true,
    count: courses.length,
    data: courses,
  });
  } catch (error) {
        return res.status(500).json({
           success: false,
            message: "error occured while searching courses", 
            error:error.message
          })
  }
}

export const addLectureToCourses=async(req,res)=>{
  try {
    const {courseId}=req.params;
     const {title, description, isPreview}=req.body;

     const course= await Course.findById(courseId);

     if(!course){
        return res.status(400).json({ 
          success: false,
           message: "Course doesn't exist" 
          })
     }

     if (course.instructor.toString() !== req.user.id.toString() && req.user.role !== "admin"){
  return res.status(403).json({
    success: false,
    message: "Not authorized to update this course"
  });
}
  
   if (!req.file) {
     return res.status(400).json({
      success:false,
      message:"Video file is required"
    });
  }

  // Upload video to cloudinary
  const result = await uploadToCloudinary(req.file.path);
  if (!result) {
     return res.status(400).json({
      success:false,
      message:"error uploading video"
    });
  }
   
    const lecture = await Lecture.create({
    title,
    description,
    isPreview,
    order: course.lectures.length + 1,
    videoUrl: result?.secure_url || req.file.path,
    publicId: result?.public_id || req.file.path,
    duration: result?.duration || 0, 
  });

  course.lectures.push(lecture._id);
  await course.save();

    return res.status(200).json({
    success: true,
    message:"lecture added successfully",
    lecture
  });
  } catch (error) {
        return res.status(500).json({ 
          success: false, message: "error occured while adding lecture",
        error:error.message
      })
  }
}

export const getMyCreatedCourses=async(req,res)=>{
  try {
     const courses = await Course.find({ instructor:req.user.id }).populate({
    path: "enrolledStudents",
    select: "name avatar",
  });

  return res.status(200).json({
    success: true,
    count: courses.length,
    data: courses,
  });
  } catch (error) {
        return res.status(500).json({ 
          success: false,
           message: "error occurred whie fetching courses",
           message:error.message 
          })
  }
}

export const getCourseDetails=async(req,res)=>{
  try {
    const course = await Course.findById(req.params.courseId) .populate({
      path: "instructor",
      select: "name avatar bio",
    })
    .populate({
      path: "lectures",
      select: "title videoUrl duration isPreview order",
    });

     if (!course) {
      return res.status(400).json({
         success: false,
         message: "course not found"  
        })
  }

    return res.status(200).json({
    success: true,
    data:{
      ...course.toJSON(),
    } 
  });
  } catch (error) {
        return res.status(500).json({
           success: false,
           message: "error while fetching course details",
          error:error.message
         })
  }
}

export const getCourseLectures=async(req,res)=>{
  try {
    const course = await Course.findById(req.params.courseId).populate(
      {
     path: "lectures",
    select: "title description videoUrl duration isPreview order",
    options: { sort: { order: 1 } },
      }
    )
     
     if (!course) {
     return res.status(400).json({
       success: false, 
       message: "couldn't fetch lectures" 
      })
  }

    const isEnrolled = course.enrolledStudents.includes(req.id);
  const isInstructor = course.instructor.toString() ===req.user.id;

   let lectures = course.lectures;
  if (!isEnrolled && !isInstructor) {
    // Only return preview lectures for non-enrolled users
    lectures = lectures.filter((lecture) => lecture.isPreview);
  }


    return res.status(200).json({
    success: true,
   message:"fetched lectures successfully",
   data: {
      lectures,
      isEnrolled,
      isInstructor,
    }
   
  })
  } catch (error) {
    
        return res.status(500).json({ 
          success: false,
           message: " error occured while fetching courses",
           error:error.message
           })
  }
}

export const deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found.",
      });
    }
    
    const isInstructor = course.instructor.toString() === req.user.id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isInstructor && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to perform this action.",
      });
    }

    if (course.thumbnail) {
      const thumbnailPublicId = getPublicIdFromUrl(course.thumbnail);
      if (thumbnailPublicId) {
        await cloudinary.v2.uploader
          .destroy(thumbnailPublicId)
          .catch((err) =>
            console.error("Failed to delete course thumbnail:", err.message)
          );
      }
    }

    if (course.lectures && course.lectures.length > 0) {
      for (const lecture of course.lectures) {
        if (lecture.videoUrl) {
          const videoPublicId = getPublicIdFromUrl(lecture.videoUrl);
          if (videoPublicId) {
            await cloudinary.v2.uploader
              .destroy(videoPublicId, { resource_type: "video" })
              .catch((err) =>
                console.error("Failed to delete video lecture:", err.message)
              );
          }
        }
      }
    }

    await User.findByIdAndUpdate(course.instructor, {
      $pull: { createdCourses: courseId },
    });

    await User.updateMany(
      { "enrolledCourses.course": courseId },
      { $pull: { enrolledCourses: { course: courseId } } }
    );

    await course.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "error occured while deleting course",
      error: error.message,
    });
  }
};




