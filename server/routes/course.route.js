import express from 'express';
import {
    createNewCourse,
    updateCourse,
    searchCourses,
    addLectureToCourse,
    getMyCreatedCourse,
    getCourseDetails,
    getCourseLectures,
    deleteCourse} from "../controllers/course.controller.js";

const router =express.Router();

router.post("/courses",createNewCourse);

router.get("/search",searchCourses);
router.post("/courses/:id/lectures", addLectureToCourse);

router.get("/courses/",getMyCreatedCourse);

router.delete("/courses/:id",deleteCourse);

router.get("/courses/:id/lectures",getCourseLectures);

router.get("/:id",getCourseDetails);