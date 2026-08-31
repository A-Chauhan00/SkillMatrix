import {Course} from "../models/course.model.js";
import { uploadToCloudinary,deleteMediaFromCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";
import {Lecture} from "../models/lecture.model.js";s


export const createNewCourse = async (req, res) => {
    try {
        const { title, subtitle, description, category, level, price, instructor } = req.body;

        let thumbnail;
        if (req.file) {
            const result = await uploadToCloudinary(req.file.path);
            thumbnail = result?.secure_url || req.file.path;
        } else {
            throw new Error("Course thumbnail is required");
        }

        const course = Course.create({
            title,
            subtitle,
            description,
            category,
            level,
            price,
            instructor: req.id,
        }
        );

        // Add course to instructor's created courses
        await User.findByIdAndUpdate(req.id, {
            $push: { createdCourses: course._id },
        });
        return res.status(200).json({ success: true, message: "course created successfully", course })

    } catch (error) {
        console.log("error creating course", error.message)
        return res.status(500).json({ success: false, message: "internal server error" })
    }
}

export const updateCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { title, subtitle, description, category, level, price } = req.body;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ success: false, message: "Course doesn't exist" });
    }

    // Verify ownership (or Admin role)
if (course.instructor.toString() !== req.user._id.toString() && req.user.role !== "admin") {
  return res.status(403).json({
    success: false,
    message: "Not authorized to update this course"
  });
}

    // Handle thumbnail upload
    let thumbnail;
    if (req.file) {
      if (course.thumbnail) {
        await deleteMediaFromCloudinary(course.thumbnail);
      }
     
      const result = await uploadMedia(req.file.buffer || req.file.path);
      thumbnail = result?.secure_url;
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        title,
        subtitle,
        description,
        category,
        level,
        price,
        ...(thumbnail && { thumbnail }),
      },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      message: "Course updated successfully",
      updatedCourse,
    });
  } catch (error) {
    console.error("Error updating course:", error.message);
    return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
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

  // Apply filters
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
        console.log("error creating course", error.message)
        return res.status(500).json({ success: false, message: "internal server error" })
  }
}

export const addLectureToCourses=async(req,res)=>{
  try {
    const {courseId}=req.params;
     const {title, description, isPreview}=req.body;

     const course= await Course.findById(courseId);

     if(!course){
        return res.status(400).json({ success: false, message: "Course doesn't exist" })
     }

    if (course.instructor.toString() !== req.user._id.toString() && req.user.role !== "admin") {
  return res.status(403).json({
    success: false,
    message: "Not authorized to update this course"
  });
}
  
   if (!req.file) {
     return res.status(400).json({success:false,message:"Video file is required"});
  }

  // Upload video to cloudinary
  const result = await uploadToCloudinary(req.file.path);
  if (!result) {
     return res.status(400).json({success:false,message:"error uploading video"});
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
      console.log("error adding lecture", error.message)
        return res.status(500).json({ success: false, message: "internal server error" })
  }
}

// export const getPublishedCourse=async(req,res)=>{
//   try {
     
//   } catch (error) {
    
//   }
// }

export const getMyCreatedCourses=async(req,res)=>{
  try {
     const courses = await Course.find({ instructor: req.id }).populate({
    path: "enrolledStudents",
    select: "name avatar",
  });

  return res.status(200).json({
    success: true,
    count: courses.length,
    data: courses,
  });
  } catch (error) {
     console.log("error fetching courses", error.message)
        return res.status(500).json({ success: false, message: "internal server error" })
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
      return res.status(400).json({ success: false, message: "course not found"  })
  }

    return res.status(200).json({
    success: true,
    data:{
      ...course.toJSON(),
    } 
  });
  } catch (error) {
     console.log("error fetching course details", error.message)
        return res.status(500).json({ success: false, message: "internal server error" })
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
     return res.status(400).json({ success: false, message: "couldn't fetch lectures" })
  }

    const isEnrolled = course.enrolledStudents.includes(req.id);
  const isInstructor = course.instructor.toString() === req.id;

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
    console.log("error fetching lectures", error.message)
        return res.status(500).json({ success: false, message: "internal server error" })
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

  
    const isInstructor = course.instructor.toString() === req.user._id.toString();
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
    console.error("Error deleting course:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};




