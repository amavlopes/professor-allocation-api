import { inject, injectable } from 'tsyringe';
import { IDepartment } from '../interfaces/department';
import { IRepository } from '../interfaces/repository';
import { IService } from '../interfaces/service';

@injectable()
export class DepartmentService implements IService<IDepartment> {
	constructor(
		@inject('DepartmentRepository')
		private departmentRepository: IRepository<IDepartment>
	) {}

	async create(department: IDepartment): Promise<IDepartment> {
		return await this.departmentRepository.create(department);
	}

	async findAll(name: string): Promise<IDepartment[]> {
		if (!name) return await this.departmentRepository.findAll();

		return await this.departmentRepository.findAllByName(name);
	}

	async findById(id: number): Promise<IDepartment> {
		return await this.departmentRepository.findById(id);
	}

	async update(department: IDepartment): Promise<IDepartment | null> {
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
