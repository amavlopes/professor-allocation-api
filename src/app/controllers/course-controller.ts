import { Request, Response } from 'express';
import { container } from 'tsyringe';
import IController from '../interfaces/controller';
import ErrorResponse from '../models/error-response';
import { HttpStatusEnum } from '../enums/http-status';
import CourseService from '../services/course-service';

class CourseController implements IController {
	async create(request: Request, response: Response) {
		const name = request.body.name as string;

		try {
			const courseService = container.resolve(CourseService);
			const course = await courseService.create({ name });

			return response.status(HttpStatusEnum.CREATED).json(course);
		} catch (e: any) {
			throw new ErrorResponse(HttpStatusEnum.BAD_REQUEST, e.message, e);
		}
	}

	async findAll(request: Request, response: Response): Promise<Response> {
		const name = request.query.name as string;

		const courseService = container.resolve(CourseService);
		const courses = await courseService.findAll(name);

		return response.status(HttpStatusEnum.OK).json({ courses });
	}

	async findById(request: Request, response: Response): Promise<Response> {
		const { course_id } = request.params;
		const id = Number(course_id);

		const courseService = container.resolve(CourseService);
		const course = await courseService.findById(id);

		if (!course) return response.status(HttpStatusEnum.NOT_FOUND).send();

		return response.status(HttpStatusEnum.OK).json({ course });
	}

	async update(request: Request, response: Response): Promise<Response> {
		const { course_id } = request.params;
		const id = Number(course_id);
		const name = request.body.name as string;

		try {
			const courseService = container.resolve(CourseService);
			const course = await courseService.update({ id, name });

			if (!course) return response.status(HttpStatusEnum.NOT_FOUND).send();

			return response.status(HttpStatusEnum.OK).json({ course });
		} catch (e: any) {
			throw new ErrorResponse(HttpStatusEnum.BAD_REQUEST, e.message, e);
		}
	}

	async deleteAll(request: Request, response: Response): Promise<Response> {
		const { ids } = request.query;
		const arrayIds: number[] = (ids as string)?.split(',').map((id) => Number(id));

		const courseService = container.resolve(CourseService);
		await courseService.deleteAll(arrayIds);

		return response.status(HttpStatusEnum.NO_CONTENT).send();
	}

	async deleteById(request: Request, response: Response): Promise<Response> {
		const { course_id } = request.params;
		const id = Number(course_id);

		const courseService = container.resolve(CourseService);
		await courseService.deleteById(id);

		return response.status(HttpStatusEnum.NO_CONTENT).send();
	}
}

export { CourseController };
