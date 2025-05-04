import { PrismaClient } from '@prisma/client';
import Course from '../interfaces/course';

class CourseRepository {
	constructor(private prisma: PrismaClient) {}

	async create(course: Course): Promise<Course> {
		return await this.prisma.course.create({ data: { ...course } });
	}

	async findAll(): Promise<Course[]> {
		return await this.prisma.course.findMany({
			include: {
				allocations: true,
			},
		});
	}

	async findAllByName(query: string): Promise<Course[]> {
		return await this.prisma.course.findMany({
			where: {
				name: { contains: query },
			},
			include: { allocations: true },
		});
	}

	async findById(id: number): Promise<Course> {
		return await this.prisma.course.findUnique({
			where: { id },
			include: { allocations: true },
		});
	}

	async update(course: Course): Promise<Course | null> {
		const { id, name } = course;

		const courseFounded = await this.findById(id!);
		if (!courseFounded) return null;

		return await this.prisma.course.update({
			data: { name },
			where: { id },
		});
	}

	async deleteAll(): Promise<void> {
		await this.prisma.course.deleteMany();
	}

	async deleteAllById(ids: number[]): Promise<void> {
		await this.prisma.course.deleteMany({
			where: {
				id: { in: ids },
			},
		});
	}

	async deleteById(id: number): Promise<void> {
		await this.prisma.course.delete({
			where: { id },
		});
	}
}

export default CourseRepository;
