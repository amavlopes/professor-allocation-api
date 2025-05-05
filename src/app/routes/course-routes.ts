import express from 'express';
import { Request, Response } from 'express';
import { CourseController } from '../controllers/course-controller';

const router = express.Router();

router.post('/', (req, res) => {
	new CourseController().create(req, res);
});

router.get('/', (req, res) => {
	new CourseController().findAll(req, res);
});

router.get('/:course_id', (req, res) => {
	new CourseController().findById(req, res);
});

router.put('/:course_id', (req, res) => {
	new CourseController().update(req, res);
});

router.delete('/', (req: Request, res: Response) => {
	new CourseController().deleteAll(req, res);
});

router.delete('/:course_id', (req, res) => {
	new CourseController().deleteById(req, res);
});

export default router;
