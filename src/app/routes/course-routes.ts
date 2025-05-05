import express from 'express';
import { CourseController } from '../controllers/course-controller';

const router = express.Router();

router.post('/courses', CourseController.create);
router.get('/courses', CourseController.findAll);
router.get('/courses/:course_id', CourseController.findById);
router.put('/courses/:course_id', CourseController.update);
router.delete('/courses', CourseController.deleteAll);
router.delete('/courses/:course_id', CourseController.deleteById);

export default router;
