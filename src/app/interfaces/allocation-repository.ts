import { IAllocationRequest } from './requests/allocation-request';
import { IAllocationResponse } from './response/allocation-response';
import { IRepository } from './repository';

export interface IAllocationRepository extends Omit<IRepository<IAllocationRequest, IAllocationResponse>, 'findAllByName'> {
	findAllByCourse(courseId: number): Promise<IAllocationResponse[]>;
	findAllByProfessor(professorId: number): Promise<IAllocationResponse[]>;
	hasConflictingSchedules(allocation: IAllocationRequest): Promise<boolean>;
}
