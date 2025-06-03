import { inject, injectable } from 'tsyringe';
import { IProfessorRequest } from '../interfaces/requests/professor-request';
import { IProfessorResponse } from '../interfaces/response/professor-response';
import { IProfessorService } from '../interfaces/professor-service';
import { IProfessorRepository } from '../interfaces/professor-repository';
import { IProfessorParams } from '../interfaces/professor-params';

@injectable()
export class ProfessorService implements IProfessorService {
	constructor(
		@inject('ProfessorRepository')
		private professorRepository: IProfessorRepository
	) {}

	async create(professor: IProfessorRequest): Promise<IProfessorResponse> {
		return await this.professorRepository.create(professor);
	}

	async findAll(params: IProfessorParams): Promise<IProfessorResponse[]> {
		return await this.professorRepository.findAll(params);
	}

	async findAllByDepartment(departmentId: number): Promise<IProfessorResponse[]> {
		return await this.professorRepository.findAllByDepartment(departmentId);
	}

	async findById(id: number): Promise<IProfessorResponse> {
		return await this.professorRepository.findById(id);
	}

	async update(professor: IProfessorRequest): Promise<IProfessorResponse | null> {
		const professorFounded = await this.findById(professor.id!);
		if (!professorFounded) return null;

		return await this.professorRepository.update(professor);
	}

	async deleteAll(ids?: number[]): Promise<void> {
		if (!ids || !ids.length) await this.professorRepository.deleteAll();
		else await this.professorRepository.deleteAllByIds(ids);
	}

	async deleteById(id: number): Promise<void> {
		await this.professorRepository.deleteById(id);
	}
}
