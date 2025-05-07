export interface IAllocationResponse {
	id: number;
	day: string;
	startHour: string;
	endHour: string;
	course: {
		id: number;
		name: string;
		createdAt: string;
		updatedAt: string;
	};
	professor: {
		id: number;
		name: string;
		cpf: string;
		departmentId: number;
		createdAt: string;
		updatedAt: string;
	};
	createdAt: string;
	updatedAt: string;
}
