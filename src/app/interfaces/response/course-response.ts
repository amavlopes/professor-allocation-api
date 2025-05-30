export interface ICourseResponse {
	id: number;
	name: string;
	description: string;
	allocations?: Array<{
		id: number;
		day: string;
		startHour: string;
		endHour: string;
		professorId: number;
		createdAt: string;
		updatedAt: string;
	}>;
	createdAt: string;
	updatedAt: string;
}
