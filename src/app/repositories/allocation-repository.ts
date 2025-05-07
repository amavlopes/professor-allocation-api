import { inject, injectable } from 'tsyringe';
import { PrismaClient } from '@prisma/client';
import { IAllocationRequest } from '../interfaces/requests/allocation-request';
import { IAllocationResponse } from '../interfaces/response/allocation-response';
import { IAllocationRepository } from '../interfaces/allocation-repository';

@injectable()
export class AllocationRepository implements IAllocationRepository {
	constructor(
		@inject('PrismaClient')
		private prismaClient: PrismaClient
	) {}

	async create(allocation: IAllocationRequest): Promise<IAllocationResponse> {
		this.prismaClient.$connect();

		const resultado = await this.prismaClient.allocation.create({
			data: { ...allocation },
			...this.includeAndOmitAttributes(),
		});

		this.prismaClient.$disconnect();

		return resultado;
	}

	async findAll(): Promise<IAllocationResponse[]> {
		this.prismaClient.$connect();

		const resultado = await this.prismaClient.allocation.findMany({
			...this.includeAndOmitAttributes(),
		});

		this.prismaClient.$disconnect();

		return resultado;
	}

	async findAllByCourse(courseId: number): Promise<IAllocationResponse[]> {
		this.prismaClient.$connect();

		const resultado = await this.prismaClient.allocation.findMany({
			where: {
				courseId,
			},
			...this.includeAndOmitAttributes(),
		});

		this.prismaClient.$disconnect();

		return resultado;
	}

	async findAllByProfessor(professorId: number): Promise<IAllocationResponse[]> {
		this.prismaClient.$connect();

		const resultado = await this.prismaClient.allocation.findMany({
			where: {
				professorId,
			},
			...this.includeAndOmitAttributes(),
		});

		this.prismaClient.$disconnect();

		return resultado;
	}

	async findById(id: number): Promise<IAllocationResponse> {
		this.prismaClient.$connect();

		const resultado = await this.prismaClient.allocation.findUnique({
			where: { id },
			...this.includeAndOmitAttributes(),
		});

		this.prismaClient.$disconnect();

		return resultado;
	}

	async update(allocation: IAllocationRequest): Promise<IAllocationResponse> {
		const { id } = allocation;

		this.prismaClient.$connect();

		delete allocation.id;
		const resultado = await this.prismaClient.allocation.update({
			data: { ...allocation },
			where: { id },
			...this.includeAndOmitAttributes(),
		});

		this.prismaClient.$disconnect();

		return resultado;
	}

	async deleteAll(): Promise<void> {
		this.prismaClient.$connect();

		await this.prismaClient.allocation.deleteMany();

		this.prismaClient.$disconnect();
	}

	async deleteAllByIds(ids: number[]): Promise<void> {
		this.prismaClient.$connect();

		await this.prismaClient.allocation.deleteMany({
			where: {
				id: { in: ids },
			},
		});

		this.prismaClient.$disconnect();
	}

	async deleteById(id: number): Promise<void> {
		this.prismaClient.$connect();

		await this.prismaClient.allocation.delete({
			where: { id },
		});

		this.prismaClient.$disconnect();
	}

	private includeAndOmitAttributes() {
		return {
			include: {
				course: true,
				professor: true,
			},
			omit: {
				courseId: true,
				professorId: true,
			},
		};
	}
}
