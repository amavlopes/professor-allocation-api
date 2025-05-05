import { container } from 'tsyringe';
import '../../../prisma/container';
import { ICourse } from '../../app/interfaces/course';
import { IDepartment } from '../../app/interfaces/department';
import { IRepository } from '../../app/interfaces/repository';
import { CourseRepository } from '../../app/repositories/course-repository';
import { DepartmentRepository } from '../../app/repositories/department-repository';
import { IService } from '../../app/interfaces/service';
import { CourseService } from '../../app/services/course-service';
import { DepartmentService } from '../../app/services/department-service';

container.registerSingleton<IRepository<ICourse>>('CourseRepository', CourseRepository);
container.registerSingleton<IService<ICourse>>('CourseService', CourseService);
container.registerSingleton<IRepository<IDepartment>>('DepartmentRepository', DepartmentRepository);
container.registerSingleton<IService<IDepartment>>('DepartmentService', DepartmentService);
