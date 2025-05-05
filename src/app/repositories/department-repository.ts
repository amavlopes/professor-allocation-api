import { inject, injectable } from 'tsyringe';
import { PrismaClient } from '@prisma/client';
import { IRepository } from '../interfaces/repository';
import { IDepartment } from '../interfaces/department';

@injectable()
export class DepartmentRepository implements IRepository<IDepartment> {
	constructor(
		@inject('PrismaClient')
		private prismaClient: PrismaClient
	) {}

	async create(department: IDepartment): Promise<IDepartment> {
		this.prismaClient.$connect();
		const resultado = await this.prismaClient.department.create({ data: { ...department }, include: { professors: true } });
		this.prismaClient.$disconnect();
		return resultado;
	}

	async findAll(): Promise<IDepartment[]> {
		this.prismaClient.$connect();
		const resultado = await this.prismaClient.department.findMany({
			include: {
				professors: true,
			},
		});
		this.prismaClient.$disconnect();
		return resultado;
	}

	async findAllByName(query: string): Promise<IDepartment[]> {
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

	async findById(id: number): Promise<IDepartment> {
		this.prismaClient.$connect();
		const resultado = await this.prismaClient.department.findUnique({
			where: { id },
			include: { professors: true },
		});
		this.prismaClient.$disconnect();
		return resultado;
	}

	async update(department: IDepartment): Promise<IDepartment | null> {
		const { id, name } = department;

		const departmentFounded = await this.findById(id!);
		if (!departmentFounded) return null;

		this.prismaClient.$connect();
		const resultado = await this.prismaClient.department.update({
			data: { name },
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
