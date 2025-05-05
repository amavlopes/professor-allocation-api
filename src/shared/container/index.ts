import { container } from 'tsyringe';
import '../../../prisma/container';
import ICourseRepository from '../../app/interfaces/course-repository';
import CourseRepository from '../../app/repositories/course-repository';
import ICourseService from '../../app/interfaces/course-service';
import CourseService from '../../app/services/course-service';

container.registerSingleton<ICourseRepository>('CourseRepository', CourseRepository);
container.registerSingleton<ICourseService>('CourseService', CourseService);
