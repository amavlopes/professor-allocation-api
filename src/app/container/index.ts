import { container } from 'tsyringe';
import { PrismaClient } from '../../../generated/prisma';
import ICourseRepository from '../interfaces/course-repository';
import ICourseService from '../interfaces/course-service';
import CourseRepository from '../repositories/course-repository';
import CourseService from '../services/course-service';

container.registerSingleton<ICourseRepository>('CourseRepository', CourseRepository);
container.registerSingleton<ICourseService>('CourseService', CourseService);
container.registerSingleton<PrismaClient>('PrismaClient', PrismaClient);
