import express from 'express';
import { getCourseProgress, updateLectureProgress, markAsCompleted, resetCourseProgress } from "../controllers/courseProgress.controller.js";
import {authMiddleware} from '../middleware/auth.middleware.js';

const router =express.Router();

router.use(authMiddleware);

router.get("/:courseId", getCourseProgress);

router.post("/:courseId/lecture/:lectureId", updateLectureProgress);

router.post("/:courseId/complete", markAsCompleted);

router.post("/:courseId/reset", resetCourseProgress);

export default router;



