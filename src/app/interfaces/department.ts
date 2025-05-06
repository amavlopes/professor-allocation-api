import { IProfessor } from './professor';

export interface IDepartment {
	id?: number;
	name: string;
	professors?: IProfessor[];
}
