import { inject, injectable } from 'tsyringe';
import { IDepartmentRequest } from '../interfaces/requests/department-request';
import { IDepartmentResponse } from '../interfaces/response/department-response';
import { IService } from '../interfaces/service';
import { IRepository } from '../interfaces/repository';

@injectable()
export class DepartmentService implements IService<IDepartmentRequest, IDepartmentResponse> {
	constructor(
		@inject('DepartmentRepository')
		private departmentRepository: IRepository<IDepartmentRequest, IDepartmentResponse>
	) {}

	async create(department: IDepartmentRequest): Promise<IDepartmentResponse> {
		return await this.departmentRepository.create(department);
	}

	async findAll(name: string): Promise<IDepartmentResponse[]> {
		if (!name) return await this.departmentRepository.findAll();

		return await this.departmentRepository.findAllByName(name);
	}

	async findById(id: number): Promise<IDepartmentResponse> {
		return await this.departmentRepository.findById(id);
	}

	async update(department: IDepartmentRequest): Promise<IDepartmentResponse | null> {
		const departmentFounded = await this.findById(department.id!);
		if (!departmentFounded) return null;

		return await this.departmentRepository.update(department);
	}

	async deleteAll(ids?: number[]): Promise<void> {
		if (!ids || !ids.length) await this.departmentRepository.deleteAll();
		else await this.departmentRepository.deleteAllByIds(ids);
	}

	async deleteById(id: number): Promise<void> {
		await this.departmentRepository.deleteById(id);
	}
}
