import { IProfessorResponse } from './professor-response';

export interface IDepartmentResponse {
	id: number;
	name: string;
	professors: IProfessorResponse;
	createdAt: string;
	updatedAt: string;
}
