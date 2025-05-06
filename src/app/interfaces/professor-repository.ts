import { IProfessorRequest } from './requests/professor-request';
import { IProfessorResponse } from './response/professor-response';
import { IRepository } from './repository';

export interface IProfessorRepository extends IRepository<IProfessorRequest, IProfessorResponse> {
	findAllByDepartment(departmentId: number): Promise<IProfessorResponse[]>;
}
