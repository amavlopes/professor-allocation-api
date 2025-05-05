import express from 'express';
import { Request, Response } from 'express';
import { PrismaClient } from '../../../generated/prisma';
import CourseController from '../controllers/course-controller';
import CourseService from '../services/course-service';
import CourseRepository from '../repositories/course-repository';

const routes = express.Router();
const prisma = new PrismaClient();
const repositorio = new CourseRepository(prisma);
const service = new CourseService(repositorio);
const controller = new CourseController(service);

routes.post('/', (req, res) => {
	controller.create(req, res);
});

routes.get('/', (req, res) => {
	controller.findAll(req, res);
});

routes.get('/:course_id', (req, res) => {
	controller.findById(req, res);
});

routes.put('/:course_id', (req, res) => {
	controller.update(req, res);
});

routes.delete('/', (req: Request, res: Response) => {
	controller.deleteAll(req, res);
});

routes.delete('/:course_id', (req, res) => {
	controller.deleteById(req, res);
});

export default routes;
