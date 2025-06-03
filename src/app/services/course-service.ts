import { injectable, inject } from 'tsyringe';
import { ICourseRequest } from '../interfaces/requests/course-request';
import { ICourseResponse } from '../interfaces/response/course-response';
import { IService } from '../interfaces/service';
import { IRepository } from '../interfaces/repository';
import { ICourseParams } from '../interfaces/course-params';

@injectable()
export class CourseService implements IService<ICourseRequest, ICourseResponse> {
	constructor(
		@inject('CourseRepository')
		private courseRepository: IRepository<ICourseRequest, ICourseResponse>
	) {}

	async create(course: ICourseRequest): Promise<ICourseResponse> {
		return await this.courseRepository.create(course);
	}

	async findAll(params: ICourseParams): Promise<ICourseResponse[]> {
		return await this.courseRepository.findAll(params);
	}

	async findById(id: number): Promise<ICourseResponse> {
		return await this.courseRepository.findById(id);
	}

	async update(course: ICourseRequest): Promise<ICourseResponse | null> {
		const courseFounded = await this.findById(course.id!);
		if (!courseFounded) return null;

		return await this.courseRepository.update(course);
	}

	async deleteAll(ids?: number[]): Promise<void> {
		if (!ids || !ids.length) await this.courseRepository.deleteAll();
		else await this.courseRepository.deleteAllByIds(ids);
	}

	async deleteById(id: number): Promise<void> {
		await this.courseRepository.deleteById(id);
	}
}
