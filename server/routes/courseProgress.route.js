import express from 'express';
import { getCourseProgress, updateLectureProgress, markAsCompleted, resetCourseProgress } from "../controllers/courseProgress.controller.js";
import {authMiddleware} from '../middleware/auth.middleware.js';
import {validate } from '../middleware/validation.middleware.js';
import {
    getProgressParamValidation,
    updateLectureProgressValidation
} from '../validators/progress.validator.js';

const router =express.Router();

router.use(authMiddleware);

router.get("/:courseId",validate(getProgressParamValidation), getCourseProgress);

router.post("/:courseId/lecture/:lectureId",validate(updateLectureProgressValidation), updateLectureProgress);

router.post("/:courseId/complete", markAsCompleted);

router.post("/:courseId/reset", resetCourseProgress);

export default router;



