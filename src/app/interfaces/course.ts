import { IAllocation } from './allocation';

export interface ICourse {
	id: number;
	name: string;
	description: string;
	allocations: Array<Omit<IAllocation, 'course'>>;
}
