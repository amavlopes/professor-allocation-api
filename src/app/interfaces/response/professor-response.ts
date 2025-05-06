import { IDepartmentResponse } from './department-response';

export interface IProfessorResponse {
	id: number;
	name: string;
	cpf: string;
	department: IDepartmentResponse;
	allocations: unknown[];
	createdAt: string;
	updatedAt: string;
}
