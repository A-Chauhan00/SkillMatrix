import { courseProgress } from "../models/courseProgress.model.js";
import {Course} from "../models/course.model.js";

export const getCourseProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user._id;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found.",
      });
    }

    let progress = await courseProgress.findOne({
      user: userId,
      course: courseId,
    });

    if (!progress) {
      const initialLectureProgress = course.lectures.map((lecture) => ({
        lecture: lecture._id,
        isCompleted: false,
        watchTime: 0,
        lastWatched: Date.now(),
      }));

      progress = await courseProgress.create({
        user: userId,
        course: courseId,
        lectureProgress: initialLectureProgress,
        completionPercentage: 0,
        isCompleted: false,
      });
    } else {
    
      progress.lastAccessed = Date.now();
      await progress.save();
    }

    return res.status(200).json({
      success: true,
      progress,
    });
  } catch (error) {
    console.error("Error fetching course progress:", error.message);
    return res.status(500).json({
      success: false,
      message: "An internal server error occurred while fetching course progress.",
      error: error.message,
    });
  }
};

export const updateLectureProgress = async (req, res) => {
  try {
    const { courseId, lectureId } = req.params;
    const { isCompleted, watchTime } = req.body;
    const userId = req.user._id;


    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found.",
      });
    }

   
    let progress = await courseProgress.findOne({
      user: userId,
      course: courseId,
    });

    if (!progress) {
      const initialLectureProgress = course.lectures.map((lec) => ({
        lecture: lec._id,
        isCompleted: false,
        watchTime: 0,
      }));

      progress = new courseProgress({
        user: userId,
        course: courseId,
        lectureProgress: initialLectureProgress,
      });
    }

   
    const lectureIndex = progress.lectureProgress.findIndex(
      (item) => item.lecture.toString() === lectureId.toString()
    );

    if (lectureIndex !== -1) {
     
      if (typeof isCompleted === "boolean") {
        progress.lectureProgress[lectureIndex].isCompleted = isCompleted;
      }
      if (typeof watchTime === "number") {
        progress.lectureProgress[lectureIndex].watchTime = watchTime;
      }
      progress.lectureProgress[lectureIndex].lastWatched = Date.now();
    } else {
     
      progress.lectureProgress.push({
        lecture: lectureId,
        isCompleted: Boolean(isCompleted),
        watchTime: watchTime || 0,
        lastWatched: Date.now(),
      });
    }

  
    const completedLecturesCount = progress.lectureProgress.filter(
      (item) => item.isCompleted
    ).length;

    const totalLecturesCount = course.lectures ? course.lectures.length : 1;

    progress.completionPercentage = Math.round(
      (completedLecturesCount / totalLecturesCount) * 100
    );

   
    if (progress.completionPercentage > 100) progress.completionPercentage = 100;

    
    progress.isCompleted = progress.completionPercentage === 100;
    progress.lastAccessed = Date.now();

  
    await progress.save();

    return res.status(200).json({
      success: true,
      message: "Lecture progress updated successfully.",
      progress,
    });
  } catch (error) {
    console.error("Error updating lecture progress:", error.message);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating lecture progress.",
      error: error.message,
    });
  }
};

export const markAsCompleted = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user._id;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found.",
      });
    }

    let progress = await courseProgress.findOne({
      user: userId,
      course: courseId,
    });

    if (!progress) {
    
      progress = new courseProgress({
        user: userId,
        course: courseId,
        lectureProgress: [],
      });
    }

    if (course.lectures && course.lectures.length > 0) {
      progress.lectureProgress = course.lectures.map((lecture) => ({
        lecture: lecture._id,
        isCompleted: true,
        watchTime: lecture.duration || 0,
        lastWatched: Date.now(),
      }));
    }

    progress.completionPercentage = 100;
    progress.isCompleted = true;
    progress.lastAccessed = Date.now();

    await progress.save();

    return res.status(200).json({
      success: true,
      message: "Course marked as completed successfully.",
      progress,
    });
  } catch (error) {
    console.error("Error marking course as completed:", error.message);
    return res.status(500).json({
      success: false,
      message: "An error occurred while completing the course.",
      error: error.message,
    });
  }
};

export const resetCourseProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user._id;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found.",
      });
    }

    const progress = await courseProgress.findOne({
      user: userId,
      course: courseId,
    });

    if (!progress) {
      return res.status(404).json({
        success: false,
        message: "No progress record found for this course.",
      });
    }

   
    if (progress.lectureProgress && progress.lectureProgress.length > 0) {
      progress.lectureProgress.forEach((item) => {
        item.isCompleted = false;
        item.watchTime = 0;
        item.lastWatched = Date.now();
      });
    }

    progress.completionPercentage = 0;
    progress.isCompleted = false;
    progress.lastAccessed = Date.now();

    await progress.save();

    return res.status(200).json({
      success: true,
      message: "Course progress has been reset successfully.",
      progress,
    });
  } catch (error) {
    console.error("Error resetting course progress:", error.message);
    return res.status(500).json({
      success: false,
      message: "An error occurred while resetting course progress.",
      error: error.message,
    });
  }
};