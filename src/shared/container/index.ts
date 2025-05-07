import { container } from 'tsyringe';
import '../../../prisma/container';

import { ICourseRequest } from '../../app/interfaces/requests/course-request';
import { IDepartmentRequest } from '../../app/interfaces/requests/department-request';
import { IProfessorRequest } from '../../app/interfaces/requests/professor-request';
import { IAllocationRequest } from '../../app/interfaces/requests/allocation-request';

import { ICourseResponse } from '../../app/interfaces/response/course-response';
import { IDepartmentResponse } from '../../app/interfaces/response/department-response';
import { IProfessorResponse } from '../../app/interfaces/response/professor-response';
import { IAllocationResponse } from '../../app/interfaces/response/allocation-response';

import { IRepository } from '../../app/interfaces/repository';
import { CourseRepository } from '../../app/repositories/course-repository';
import { DepartmentRepository } from '../../app/repositories/department-repository';
import { ProfessorRepository } from '../../app/repositories/professor-repository';
import { AllocationRepository } from '../../app/repositories/allocation-repository';

import { IService } from '../../app/interfaces/service';
import { CourseService } from '../../app/services/course-service';
import { DepartmentService } from '../../app/services/department-service';
import { ProfessorService } from '../../app/services/professor-service';
import { AllocationService } from '../../app/services/allocation-service';

container.registerSingleton<IRepository<ICourseRequest, ICourseResponse>>('CourseRepository', CourseRepository);
container.registerSingleton<IRepository<IDepartmentRequest, IDepartmentResponse>>('DepartmentRepository', DepartmentRepository);
container.registerSingleton<IRepository<IProfessorRequest, IProfessorResponse>>('ProfessorRepository', ProfessorRepository);
container.registerSingleton<IRepository<IAllocationRequest, IAllocationResponse>>('AllocationRepository', AllocationRepository);
container.registerSingleton<IService<ICourseRequest, ICourseResponse>>('CourseService', CourseService);
container.registerSingleton<IService<IDepartmentRequest, IDepartmentResponse>>('DepartmentService', DepartmentService);
container.registerSingleton<IService<IProfessorRequest, IProfessorResponse>>('ProfessorService', ProfessorService);
container.registerSingleton<IService<IAllocationRequest, IAllocationResponse>>('AllocationService', AllocationService);
