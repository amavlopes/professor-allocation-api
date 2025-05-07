export interface IAllocationRequest {
	id?: number;
	day: string;
	startHour: string;
	endHour: string;
	courseId: number;
	professorId: number;
}
