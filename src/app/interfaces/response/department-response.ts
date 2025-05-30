export interface IDepartmentResponse {
	id: number;
	name: string;
	description: string;
	professors?: Array<{
		id: number;
		name: string;
		cpf: string;
		createdAt: string;
		updatedAt: string;
	}>;
	createdAt: string;
	updatedAt: string;
}
