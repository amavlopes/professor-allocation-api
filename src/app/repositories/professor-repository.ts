import { inject, injectable } from 'tsyringe';
import { PrismaClient } from '@prisma/client';
import { IProfessorRequest } from '../interfaces/requests/professor-request';
import { IProfessorResponse } from '../interfaces/response/professor-response';
import { IProfessorRepository } from '../interfaces/professor-repository';

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
			...this.includeOmitAndToggleShowAllocations(false),
		});

		this.prismaClient.$disconnect();

		return resultado;
	}

	async findAll(): Promise<IProfessorResponse[]> {
		this.prismaClient.$connect();

		const resultado = await this.prismaClient.professor.findMany({
			...this.includeOmitAndToggleShowAllocations(true),
		});

		this.prismaClient.$disconnect();

		return resultado;
	}

	async findAllByName(query: string): Promise<IProfessorResponse[]> {
		this.prismaClient.$connect();

		const resultado = await this.prismaClient.professor.findMany({
			where: {
				name: { contains: query },
			},
			...this.includeOmitAndToggleShowAllocations(true),
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
			...this.includeOmitAndToggleShowAllocations(true),
		});

		this.prismaClient.$disconnect();

		return resultado;
	}

	async findById(id: number): Promise<IProfessorResponse> {
		this.prismaClient.$connect();

		const resultado = await this.prismaClient.professor.findUnique({
			where: { id },
			...this.includeOmitAndToggleShowAllocations(true),
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
			...this.includeOmitAndToggleShowAllocations(false),
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

	private includeOmitAndToggleShowAllocations(includeAllocations?: boolean) {
		const query = {
			include: { department: true },
			omit: { departmentId: true },
		};

		if (includeAllocations) {
			query.include = {
				...query.include,
				...this.includeAllocationsAndOmitAttributes(),
			};
		}

		return query;
	}

	private includeAllocationsAndOmitAttributes() {
		return {
			allocations: {
				omit: {
					professorId: true,
				},
			},
		};
	}
}
