import { inject, injectable } from 'tsyringe';
import { PrismaClient } from '@prisma/client';
import { IProfessorRequest } from '../interfaces/requests/professor-request';
import { IProfessorResponse } from '../interfaces/response/professor-response';
import { IProfessorRepository } from '../interfaces/professor-repository';
import { IProfessorParams } from '../interfaces/professor-params';

@injectable()
export class ProfessorRepository implements IProfessorRepository {
	constructor(
		@inject('PrismaClient')
		private prismaClient: PrismaClient
	) {}

	async create(professor: IProfessorRequest): Promise<IProfessorResponse> {
		this.prismaClient.$connect();

		const resultado = await this.prismaClient.professor.create({
			data: { ...professor },
			include: { department: true },
			omit: { departmentId: true },
		});

		this.prismaClient.$disconnect();

		return resultado;
	}

	async findAll(params: IProfessorParams): Promise<IProfessorResponse[]> {
		this.prismaClient.$connect();

		const resultado = await this.prismaClient.professor.findMany({
			where: {
				...(params.name && { name: { contains: params.name } }),
				...(params.departmentId && { departmentId: params.departmentId }),
			},
			include: { department: true },
			omit: { departmentId: true },
		});

		this.prismaClient.$disconnect();

		return resultado;
	}

	async findAllByDepartment(departmentId: number): Promise<IProfessorResponse[]> {
		this.prismaClient.$connect();

		const resultado = await this.prismaClient.professor.findMany({
			where: {
				departmentId,
			},
			include: { department: true },
			omit: { departmentId: true },
		});

		this.prismaClient.$disconnect();

		return resultado;
	}

	async findById(id: number): Promise<IProfessorResponse> {
		this.prismaClient.$connect();

		const resultado = await this.prismaClient.professor.findUnique({
			where: { id },
			include: { department: true },
			omit: { departmentId: true },
		});

		this.prismaClient.$disconnect();

		return resultado;
	}

	async update(professor: IProfessorRequest): Promise<IProfessorResponse> {
		const { id } = professor;

		this.prismaClient.$connect();

		delete professor.id;
		const resultado = await this.prismaClient.professor.update({
			data: { ...professor },
			where: { id },
			include: { department: true },
			omit: { departmentId: true },
		});

		this.prismaClient.$disconnect();

		return resultado;
	}

	async deleteAll(): Promise<void> {
		this.prismaClient.$connect();

		await this.prismaClient.professor.deleteMany();

		this.prismaClient.$disconnect();
	}

	async deleteAllByIds(ids: number[]): Promise<void> {
		this.prismaClient.$connect();

		await this.prismaClient.professor.deleteMany({
			where: {
				id: { in: ids },
			},
		});

		this.prismaClient.$disconnect();
	}

	async deleteById(id: number): Promise<void> {
		this.prismaClient.$connect();

		await this.prismaClient.professor.delete({
			where: { id },
		});

		this.prismaClient.$disconnect();
	}
}
