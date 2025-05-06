import { IProfessorRequest } from './requests/professor-request';
import { IProfessorResponse } from './response/professor-response';
import { IService } from './service';

export interface IProfessorService extends IService<IProfessorRequest, IProfessorResponse> {
	findAllByDepartment(departmentId: number): Promise<IProfessorResponse[]>;
}
