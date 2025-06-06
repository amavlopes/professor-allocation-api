import { inject, injectable } from 'tsyringe';
import { PrismaClient } from '@prisma/client';
import { IAllocationRequest } from '../interfaces/requests/allocation-request';
import { IAllocationResponse } from '../interfaces/response/allocation-response';
import { IAllocationRepository } from '../interfaces/allocation-repository';
import { IAllocationParams } from '../interfaces/allocation-params';
import { equal } from 'assert';

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
			include: {
				course: true,
				professor: true,
			},
			omit: {
				courseId: true,
				professorId: true,
			},
		});

		this.prismaClient.$disconnect();

		return resultado;
	}

	async hasConflictingSchedules(allocation: IAllocationRequest): Promise<boolean> {
		this.prismaClient.$connect();

		const resultados = await this.prismaClient.allocation.findMany({
			where: {
				day: allocation.day,
				AND: [
					{
						OR: [{ professorId: allocation.professorId }, { courseId: allocation.courseId }],
					},
					{
						startHour: { lt: allocation.endHour },
					},
					{
						endHour: { gt: allocation.startHour },
					},
				],
			},
		});

		this.prismaClient.$disconnect();

		return resultados.length > 0;
	}

	async findAll(params: IAllocationParams): Promise<IAllocationResponse[]> {
		this.prismaClient.$connect();

		const resultado = await this.prismaClient.allocation.findMany({
			where: {
				...(params.day && { day: params.day }),
				...(params.courseId && { courseId: params.courseId }),
				...(params.professorId && { professorId: params.professorId }),
			},
			include: {
				course: true,
				professor: true,
			},
			omit: {
				courseId: true,
				professorId: true,
			},
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
			include: {
				course: true,
				professor: true,
			},
			omit: {
				courseId: true,
				professorId: true,
			},
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
			include: {
				course: true,
				professor: true,
			},
			omit: {
				courseId: true,
				professorId: true,
			},
		});

		this.prismaClient.$disconnect();

		return resultado;
	}

	async findById(id: number): Promise<IAllocationResponse> {
		this.prismaClient.$connect();

		const resultado = await this.prismaClient.allocation.findUnique({
			where: { id },
			include: {
				course: true,
				professor: true,
			},
			omit: {
				courseId: true,
				professorId: true,
			},
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
			include: {
				course: true,
				professor: true,
			},
			omit: {
				courseId: true,
				professorId: true,
			},
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
}
