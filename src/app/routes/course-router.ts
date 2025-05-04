import express from 'express';
import { PrismaClient } from '../../../generated/prisma';
import CourseRepository from '../repositories/course-repository';
import { HttpStatusEnum } from '../enums/http-status';
import { ErrorResponse } from '../models/error-response';

const routes = express.Router();
const prisma = new PrismaClient();
const courseRepository = new CourseRepository(prisma);

routes.post('/', async (req, res) => {
	const { name } = req.body;

	try {
		let course = await courseRepository.create({ name });
		res.status(HttpStatusEnum.CREATED).json(course);
	} catch (e: any) {
		throw new ErrorResponse(HttpStatusEnum.BAD_REQUEST, e.message, e);
	}
});

routes.get('/', async (req, res) => {
	let courses;
	let { name } = req.query;
	name = (name as string)?.trim();

	if (!name) courses = await courseRepository.findAll();
	else courses = await courseRepository.findAllByName(name);

	res.status(HttpStatusEnum.OK).json(courses);
});

routes.get('/:course_id', async (req, res) => {
	const { course_id } = req.params;
	const course = await courseRepository.findById(+course_id);

	if (!course) res.status(HttpStatusEnum.NOT_FOUND).send();

	res.status(HttpStatusEnum.OK).json(course);
});

routes.put('/:course_id', async (req, res) => {
	const { course_id } = req.params;
	const { name } = req.body;

	try {
		let course = await courseRepository.update({
			id: +course_id,
			name,
		});

		if (!course) res.status(HttpStatusEnum.NOT_FOUND).send();

		res.status(HttpStatusEnum.OK).json(course);
	} catch (e: any) {
		throw new ErrorResponse(HttpStatusEnum.BAD_REQUEST, e.message, e);
	}
});

routes.delete('/', async (req, res) => {
	const paramIds = req.query.ids as string;

	if (!paramIds) {
		await courseRepository.deleteAll();

		res.status(HttpStatusEnum.NO_CONTENT).send();
	} else {
		try {
			const ids = paramIds.split(',').map((id) => {
				let number = Number(id);
				if (isNaN(number)) throw new Error(`Não se pode converter ${id} para um número`);
				return number;
			});

			await courseRepository.deleteAllById(ids);

			res.status(HttpStatusEnum.NO_CONTENT).send();
		} catch (e: any) {
			throw new ErrorResponse(HttpStatusEnum.BAD_REQUEST, e.message, e);
		}
	}
});

routes.delete('/:course_id', async (req, res) => {
	const { course_id } = req.params;
	await courseRepository.deleteById(+course_id);

	res.status(HttpStatusEnum.NO_CONTENT).send();
});

export default routes;
