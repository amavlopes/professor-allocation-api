import { ICourse } from './course';
import { IProfessor } from './professor';

export interface IAllocation {
	id: number;
	day: string;
	startHour: string;
	endHour: string;
	course: Omit<ICourse, 'allocations'>;
	professor: Omit<IProfessor, 'allocations'>;
}
