import { prisma } from '.';

async function main() {
	await populateCourses();
	await populateDepartments();
	await populateProfessors();
	await populateAllocations();
}

async function populateCourses() {
	try {
		const courses = [{ name: 'Bacharelado em Administração' }, { name: 'Licenciatura em Artes Visuais' }, { name: 'Bacharelado em Sistemas da Informação' }, { name: 'Bacharelado em Física' }];
		const resultado = await prisma.course.createMany({
			data: courses,
		});

		console.log('Cursos: ', resultado);
	} catch (error) {
		console.error('Erro ao cadastrar cursos: ', error);
	} finally {
		await prisma.$disconnect();
	}
}

async function populateDepartments() {
	try {
		const departments = [{ name: 'Ciências Sociais e Aplicadas' }, { name: 'Artes e Comunicação' }, { name: 'Ciências Exatas e da Natureza' }];
		const resultado = await prisma.department.createMany({
			data: departments,
		});

		console.log('Departamentos: ', resultado);
	} catch (error) {
		console.error('Erro ao cadastrar departamentos: ', error);
	} finally {
		await prisma.$disconnect();
	}
}

async function populateProfessors() {
	try {
		const professors = [
			{ name: 'Guilherme Santana', cpf: '63883465020', departmentId: 1 },
			{ name: 'Alice Souza', cpf: '91878124013', departmentId: 2 },
			{ name: 'Gabriel Menezes', cpf: '18461419073', departmentId: 3 },
			{ name: 'Paulo Fernandes', cpf: '25060495094', departmentId: 3 },
		];
		const resultado = await prisma.professor.createMany({
			data: professors,
		});

		console.log('Professores: ', resultado);
	} catch (error) {
		console.error('Erro ao cadastrar professores: ', error);
	} finally {
		await prisma.$disconnect();
	}
}

async function populateAllocations() {
	try {
		const allocations = [
			{
				day: 1,
				startHour: '08:00',
				endHour: '10:00',
				courseId: 1,
				professorId: 1,
			},
			{
				day: 1,
				startHour: '10:00',
				endHour: '12:00',
				courseId: 2,
				professorId: 2,
			},
			{
				day: 2,
				startHour: '08:00',
				endHour: '12:00',
				courseId: 3,
				professorId: 3,
			},
			{
				day: 2,
				startHour: '13:00',
				endHour: '17:00',
				courseId: 4,
				professorId: 4,
			},
			{
				day: 3,
				startHour: '13:00',
				endHour: '15:00',
				courseId: 2,
				professorId: 2,
			},
		];
		const resultado = await prisma.allocation.createMany({
			data: allocations,
		});

		console.log('Allocations: ', resultado);
	} catch (error) {
		console.error('Erro ao cadastrar allocationss: ', error);
	} finally {
		await prisma.$disconnect();
	}
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
