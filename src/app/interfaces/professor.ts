import { IDepartment } from './department';

export interface IProfessor {
	id?: number;
	name: string;
	cpf: string;
	department?: IDepartment;
	allocations?: unknown[];
}
