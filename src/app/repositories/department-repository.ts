import { inject, injectable } from 'tsyringe';
import { PrismaClient } from '@prisma/client';
import { IDepartmentRequest } from '../interfaces/requests/department-request';
import { IDepartmentResponse } from '../interfaces/response/department-response';
import { IRepository } from '../interfaces/repository';

@injectable()
export class DepartmentRepository implements IRepository<IDepartmentRequest, IDepartmentResponse> {
	constructor(
		@inject('PrismaClient')
		private prismaClient: PrismaClient
	) {}

	async create(department: IDepartmentRequest): Promise<IDepartmentResponse> {
		this.prismaClient.$connect();

		const resultado = await this.prismaClient.department.create({
			data: { ...department },
			include: { professors: true },
		});

		this.prismaClient.$disconnect();

		return resultado;
	}

	async findAll(): Promise<IDepartmentResponse[]> {
		this.prismaClient.$connect();

		const resultado = await this.prismaClient.department.findMany({
			include: {
				professors: true,
			},
		});

		this.prismaClient.$disconnect();

		return resultado;
	}

	async findAllByName(query: string): Promise<IDepartmentResponse[]> {
		this.prismaClient.$connect();

		const resultado = await this.prismaClient.department.findMany({
			where: {
				name: { contains: query },
			},
			include: { professors: true },
		});

		this.prismaClient.$disconnect();

		return resultado;
	}

	async findById(id: number): Promise<IDepartmentResponse> {
		this.prismaClient.$connect();

		const resultado = await this.prismaClient.department.findUnique({
			where: { id },
			include: { professors: true },
		});

		this.prismaClient.$disconnect();

		return resultado;
	}

	async update(department: IDepartmentRequest): Promise<IDepartmentResponse> {
		const { id } = department;

		this.prismaClient.$connect();

		delete department.id;
		const resultado = await this.prismaClient.department.update({
			data: { ...department },
			where: { id },
			include: { professors: true },
		});

		this.prismaClient.$disconnect();

		return resultado;
	}

	async deleteAll(): Promise<void> {
		this.prismaClient.$connect();

		await this.prismaClient.department.deleteMany();

		this.prismaClient.$disconnect();
	}

	async deleteAllByIds(ids: number[]): Promise<void> {
		this.prismaClient.$connect();

		await this.prismaClient.department.deleteMany({
			where: {
				id: { in: ids },
			},
		});

		this.prismaClient.$disconnect();
	}

	async deleteById(id: number): Promise<void> {
		this.prismaClient.$connect();

		await this.prismaClient.department.delete({
			where: { id },
		});

		this.prismaClient.$disconnect();
	}
}
