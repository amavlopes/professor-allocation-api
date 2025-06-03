import express from 'express';
import { CourseController } from '../controllers/course-controller';

const router = express.Router();

router.post('/courses', CourseController.create);
router.get('/courses', CourseController.findAll);
router.get('/courses/:courseId', CourseController.findById);
router.put('/courses/:courseId', CourseController.update);
router.delete('/courses', CourseController.deleteAll);
router.delete('/courses/:courseId', CourseController.deleteById);

export default router;
