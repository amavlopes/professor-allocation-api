import { Request, Response } from 'express';
import IController from '../interfaces/controller';
import ICourseService from '../interfaces/course-service';
import ErrorResponse from '../models/error-response';
import { HttpStatusEnum } from '../enums/http-status';

class CourseController implements IController {
	private courseService: ICourseService;

	constructor(private service: ICourseService) {
		this.courseService = service;
	}

	public async create(request: Request, response: Response) {
		const name = request.body.name as string;

		try {
			const course = await this.courseService.create({ name });

			return response.status(HttpStatusEnum.CREATED).json({ course });
		} catch (e: any) {
			throw new ErrorResponse(HttpStatusEnum.BAD_REQUEST, e.message, e);
		}
	}

	public async findAll(request: Request, response: Response) {
		const name = request.query.name as string;
		const courses = await this.courseService.findAll(name);

		return response.status(HttpStatusEnum.OK).json({ courses });
	}

	public async findById(request: Request, response: Response) {
		const { course_id } = request.params;
		const id = Number(course_id);
		const course = await this.courseService.findById(id);

		if (!course) response.status(HttpStatusEnum.NOT_FOUND).send();

		return response.status(HttpStatusEnum.OK).json({ course });
	}

	public async update(request: Request, response: Response) {
		const { course_id } = request.params;
		const id = Number(course_id);
		const name = request.body.name as string;

		try {
			const course = await this.courseService.update({ id, name });

			if (!course) response.status(HttpStatusEnum.NOT_FOUND).send();

			return response.status(HttpStatusEnum.OK).json({ course });
		} catch (e: any) {
			throw new ErrorResponse(HttpStatusEnum.BAD_REQUEST, e.message, e);
		}
	}

	public async deleteAll(request: Request, response: Response) {
		const { ids } = request.query;
		const arrayIds: number[] = (ids as string)?.split(',').map((id) => Number(id));

		await this.courseService.deleteAll(arrayIds);

		return response.status(HttpStatusEnum.NO_CONTENT).send();
	}

	public async deleteById(request: Request, response: Response) {
		const { course_id } = request.params;
		const id = Number(course_id);

		await this.courseService.deleteById(id);

		return response.status(HttpStatusEnum.NO_CONTENT).send();
	}
}

export default CourseController;
