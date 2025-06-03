import { inject, injectable } from 'tsyringe';
import { IAllocationRequest } from '../interfaces/requests/allocation-request';
import { IAllocationResponse } from '../interfaces/response/allocation-response';
import { IAllocationService } from '../interfaces/allocation-service';
import { IAllocationRepository } from '../interfaces/allocation-repository';
import { IAllocationParams } from '../interfaces/allocation-params';

@injectable()
export class AllocationService implements IAllocationService {
	constructor(
		@inject('AllocationRepository')
		private allocationRepository: IAllocationRepository
	) {}

	async create(allocation: IAllocationRequest): Promise<IAllocationResponse> {
		if (await this.allocationRepository.hasConflictingSchedules(allocation)) throw new Error(`Existe um conflito de horário com outra alocação no mesmo dia para este professor ou curso.`);

		return await this.allocationRepository.create(allocation);
	}

	async findAll(params: IAllocationParams): Promise<IAllocationResponse[]> {
		return await this.allocationRepository.findAll(params);
	}

	async findAllByCourse(courseId: number): Promise<IAllocationResponse[]> {
		return await this.allocationRepository.findAllByCourse(courseId);
	}

	async findAllByProfessor(professorId: number): Promise<IAllocationResponse[]> {
		return await this.allocationRepository.findAllByProfessor(professorId);
	}

	async findById(id: number): Promise<IAllocationResponse> {
		return await this.allocationRepository.findById(id);
	}

	async update(allocation: IAllocationRequest): Promise<IAllocationResponse | null> {
		const allocationFounded = await this.findById(allocation.id!);
		if (!allocationFounded) return null;

		return await this.allocationRepository.update(allocation);
	}

	async deleteAll(ids?: number[]): Promise<void> {
		if (!ids || !ids.length) await this.allocationRepository.deleteAll();
		else await this.allocationRepository.deleteAllByIds(ids);
	}

	async deleteById(id: number): Promise<void> {
		await this.allocationRepository.deleteById(id);
	}
}
