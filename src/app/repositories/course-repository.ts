import { injectable, inject } from 'tsyringe';
import { PrismaClient } from '@prisma/client';
import { ICourseRequest } from '../interfaces/requests/course-request';
import { ICourseResponse } from '../interfaces/response/course-response';
import { IRepository } from '../interfaces/repository';

@injectable()
export class CourseRepository implements IRepository<ICourseRequest, ICourseResponse> {
	constructor(
		@inject('PrismaClient')
		private prismaClient: PrismaClient
	) {}

	async create(course: ICourseRequest): Promise<ICourseResponse> {
		this.prismaClient.$connect();

		const resultado = await this.prismaClient.course.create({
			data: { ...course },
			include: { allocations: true },
		});

		this.prismaClient.$disconnect();

		return resultado;
	}

	async findAll(): Promise<ICourseResponse[]> {
		this.prismaClient.$connect();

		const resultado = await this.prismaClient.course.findMany({
			include: {
				allocations: true,
			},
		});

		this.prismaClient.$disconnect();

		return resultado;
	}

	async findAllByName(query: string): Promise<ICourseResponse[]> {
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

	async findById(id: number): Promise<ICourseResponse> {
		this.prismaClient.$connect();

		const resultado = await this.prismaClient.course.findUnique({
			where: { id },
			include: { allocations: true },
		});

		this.prismaClient.$disconnect();

		return resultado;
	}

	async update(course: ICourseRequest): Promise<ICourseResponse> {
		const { id } = course;

		this.prismaClient.$connect();

		delete course.id;
		const resultado = await this.prismaClient.course.update({
			data: { ...course },
			where: { id },
			include: { allocations: true },
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
