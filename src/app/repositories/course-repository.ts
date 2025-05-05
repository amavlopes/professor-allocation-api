import { PrismaClient } from '@prisma/client';
import ICourse from '../interfaces/course';
import ICourseRepository from '../interfaces/course-repository';

export default class CourseRepository implements ICourseRepository {
	private prismaClient: PrismaClient;

	constructor(private client: PrismaClient) {
		this.prismaClient = client;
	}

	async create(course: ICourse): Promise<ICourse> {
		return await this.prismaClient.course.create({ data: { ...course } });
	}

	async findAll(): Promise<ICourse[]> {
		return await this.prismaClient.course.findMany({
			include: {
				allocations: true,
			},
		});
	}

	async findAllByName(query: string): Promise<ICourse[]> {
		return await this.prismaClient.course.findMany({
			where: {
				name: { contains: query },
			},
			include: { allocations: true },
		});
	}

	async findById(id: number): Promise<ICourse> {
		return await this.prismaClient.course.findUnique({
			where: { id },
			include: { allocations: true },
		});
	}

	async update(course: ICourse): Promise<ICourse | null> {
		const { id, name } = course;

		const courseFounded = await this.findById(id!);
		if (!courseFounded) return null;

		return await this.prismaClient.course.update({
			data: { name },
			where: { id },
		});
	}

	async deleteAll(): Promise<void> {
		await this.prismaClient.course.deleteMany();
	}

	async deleteAllByIds(ids: number[]): Promise<void> {
		await this.prismaClient.course.deleteMany({
			where: {
				id: { in: ids },
			},
		});
	}

	async deleteById(id: number): Promise<void> {
		await this.prismaClient.course.delete({
			where: { id },
		});
	}
}
