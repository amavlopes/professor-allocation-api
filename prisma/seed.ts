import { PrismaClient } from '../generated/prisma';
import CourseRepository from '../src/app/repositories/course-repository';

const prisma = new PrismaClient();

async function main() {
	const courseRepository = new CourseRepository();

	const courses = [{ name: 'Bacharelado em Administração' }, { name: 'Bacharelado em Ciências da Computação' }, { name: 'Bacharelado em Sistemas da Informação' }, { name: 'Licenciatura em Física' }];

	courses.forEach(async (course) => {
		const resultado = await courseRepository.create(course);
		console.log(resultado);
	});
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
