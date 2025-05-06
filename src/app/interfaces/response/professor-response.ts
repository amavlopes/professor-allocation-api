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
	allocations?: Array<{
		id: number;
		day: string;
		startHour: string;
		endHour: string;
		courseId: number;
		createdAt: string;
		updatedAt: string;
	}>;
	createdAt: string;
	updatedAt: string;
}
