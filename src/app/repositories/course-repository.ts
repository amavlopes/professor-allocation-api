import { injectable, inject } from 'tsyringe';
import { PrismaClient } from '@prisma/client';
import ICourse from '../interfaces/course';
import ICourseRepository from '../interfaces/course-repository';

@injectable()
class CourseRepository implements ICourseRepository {
	constructor(
		@inject('PrismaClient')
		private prismaClient: PrismaClient
	) {}

	async create(course: ICourse): Promise<ICourse> {
		this.prismaClient.$connect();
		const resultado = await this.prismaClient.course.create({ data: { ...course } });
		this.prismaClient.$disconnect();
		return resultado;
	}

	async findAll(): Promise<ICourse[]> {
		this.prismaClient.$connect();
		const resultado = await this.prismaClient.course.findMany({
			include: {
				allocations: true,
			},
		});
		this.prismaClient.$disconnect();
		return resultado;
	}

	async findAllByName(query: string): Promise<ICourse[]> {
		this.prismaClient.$connect();
		const resultado = await this.prismaClient.course.findMany({
			where: {
				name: { contains: query },
			},
			include: { allocations: true },
		});
		this.prismaClient.$disconnect();
		return resultado;
	}

	async findById(id: number): Promise<ICourse> {
		this.prismaClient.$connect();
		const resultado = await this.prismaClient.course.findUnique({
			where: { id },
			include: { allocations: true },
		});
		this.prismaClient.$disconnect();
		return resultado;
	}

	async update(course: ICourse): Promise<ICourse | null> {
		const { id, name } = course;

		const courseFounded = await this.findById(id!);
		if (!courseFounded) return null;

		this.prismaClient.$connect();
		const resultado = await this.prismaClient.course.update({
			data: { name },
			where: { id },
		});
		this.prismaClient.$disconnect();
		return resultado;
	}

	async deleteAll(): Promise<void> {
		this.prismaClient.$connect();
		await this.prismaClient.course.deleteMany();
		this.prismaClient.$disconnect();
	}

	async deleteAllByIds(ids: number[]): Promise<void> {
		this.prismaClient.$connect();
		await this.prismaClient.course.deleteMany({
			where: {
				id: { in: ids },
			},
		});
		this.prismaClient.$disconnect();
	}

	async deleteById(id: number): Promise<void> {
		this.prismaClient.$connect();
		await this.prismaClient.course.delete({
			where: { id },
		});
		this.prismaClient.$disconnect();
	}
}

export default CourseRepository;
