export interface ICourseResponse {
	id: number;
	name: string;
	allocations?: Array<unknown>; // sem o courseId
	createdAt: string;
	updatedAt: string;
}
