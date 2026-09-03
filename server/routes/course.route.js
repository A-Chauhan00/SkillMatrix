import express from 'express';
import {
    createNewCourse,
    updateCourse,
    searchCourses,
    addLectureToCourses,
    getMyCreatedCourses,
    getCourseDetails,
    getCourseLectures,
    deleteCourse} from "../controllers/course.controller.js";
    import upload from "../utils/multer.js";
    import {authMiddleware,authorizeRoles} from "../middleware/auth.middleware.js";

    import { validate } from '../middleware/validation.middleware.js';
    import {
      courseIdParamValidation,
      lectureIdParamValidation,
      createCourseValidation,
      updateCourseValidation,
      addLectureValidation,
      updateLectureValidation
    } from '../validators/course.validator.js';

const router =express.Router();

router.get("/:courseId",getCourseDetails);

router.get("/search",searchCourses);

router.get("/:courseId/lectures", authMiddleware, getCourseLectures);


//instructor admin only routes
router.use(authMiddleware, authorizeRoles("instructor", "admin"));

router.post( "/create",validate(createCourseValidation),upload.single("thumbnail"),createNewCourse);

router.put("/:courseId",
  authMiddleware,validate(updateCourseValidation), upload.single("thumbnail"),updateCourse);

router.post( "/:courseId/lectures",validate(addLectureValidation), upload.single("video"),addLectureToCourses);

router.get("/instructor/my-courses", getMyCreatedCourses);

router.delete("/:courseId",deleteCourse);


export default router;