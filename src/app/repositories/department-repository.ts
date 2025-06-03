import { inject, injectable } from 'tsyringe';
import { PrismaClient } from '@prisma/client';
import { IDepartmentRequest } from '../interfaces/requests/department-request';
import { IDepartmentResponse } from '../interfaces/response/department-response';
import { IRepository } from '../interfaces/repository';
import { IDepartmentParams } from '../interfaces/department-params';

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
		});

		this.prismaClient.$disconnect();

		return resultado;
	}

	async findAll(params: IDepartmentParams): Promise<IDepartmentResponse[]> {
		this.prismaClient.$connect();

		const resultado: IDepartmentResponse[] = await this.prismaClient.department.findMany({
			where: {
				...(params.name && { name: { contains: params.name } }),
			},
		});

		this.prismaClient.$disconnect();

		return resultado;
	}

	async findById(id: number): Promise<IDepartmentResponse> {
		this.prismaClient.$connect();

		const resultado = await this.prismaClient.department.findUnique({
			where: { id },
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
