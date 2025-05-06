import { IDepartmentResponse } from './department-response';

export interface IProfessorResponse {
	id: number;
	name: string;
	cpf: string;
	department: {
		id: number;
		name: string;
		createdAt: string;
		updatedAt: string;
	};
	allocations?: Array<unknown>; // sem o professorId
	createdAt: string;
	updatedAt: string;
}
