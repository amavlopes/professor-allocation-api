import { injectable, inject } from 'tsyringe';
import ICourse from '../interfaces/course';
import ICourseRepository from '../interfaces/course-repository';
import ICourseService from '../interfaces/course-service';

@injectable()
class CourseService implements ICourseService {
	constructor(
		@inject('CourseRepository')
		private courseRepository: ICourseRepository
	) {}

	async create(course: ICourse): Promise<ICourse> {
		return await this.courseRepository.create(course);
	}

	async findAll(name: string): Promise<ICourse[]> {
		if (!name) return await this.courseRepository.findAll();

		return await this.courseRepository.findAllByName(name);
	}

	async findById(id: number): Promise<ICourse> {
		return await this.courseRepository.findById(id);
	}

	async update(course: ICourse): Promise<ICourse | null> {
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

export default CourseService;
