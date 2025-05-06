import { IAllocation } from './allocation';
import { IDepartment } from './department';

export interface IProfessor {
	id: number;
	name: string;
	cpf: string;
	department: Omit<IDepartment, 'professors'>;
	allocations: Array<Omit<IAllocation, 'professor'>>;
}
