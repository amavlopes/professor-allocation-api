import { IAllocationRequest } from './requests/allocation-request';
import { IAllocationResponse } from './response/allocation-response';
import { IService } from './service';

export interface IAllocationService extends IService<IAllocationRequest, IAllocationResponse> {
	findAllByCourse(courseId: number): Promise<IAllocationResponse[]>;
	findAllByProfessor(professorId: number): Promise<IAllocationResponse[]>;
}
