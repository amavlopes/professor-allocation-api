// const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });
import swaggerAutogen from 'swagger-autogen';

const swaggerConfig = {
	openapi: '3.0.0',
	info: {
		title: 'Professor Allocation',
		version: '1.0.0',
		description: '',
	},
	servers: [
		{
			url: 'http://localhost:3300',
		},
	],
	components: {
		schemas: {
			CourseRequest: {
				$name: 'Engenharia da Computação',
			},
			CourseResponse: {
				course: {
					id: 1,
					name: 'Engenharia da Computação',
					allocations: [],
					createdAt: '2025-04-07 04:31:14',
					updatedAt: '2025-04-07 04:33:50',
				},
			},
			CourseListResponse: {
				courses: [
					{
						id: 1,
						name: 'Engenharia da Computação',
						allocations: [],
						createdAt: '2025-04-07 04:31:14',
						updatedAt: '2025-04-07 04:33:50',
					},
				],
			},
			DepartmentRequest: {
				$name: 'Engenharias',
			},
			DepartmentResponse: {
				id: 1,
				name: 'Engenharias',
				professors: [],
				createdAt: '2025-04-07 04:31:14',
				updatedAt: '2025-04-07 04:33:50',
			},
			DepartmentListResponse: {
				departments: [
					{
						id: 1,
						name: 'Engenharias',
						professors: [],
						createdAt: '2025-04-07 04:31:14',
						updatedAt: '2025-04-07 04:33:50',
					},
				],
			},
			ProfessorRequest: {
				$departmentId: 1,
				$name: 'Paulo Fernandes',
				$cpf: '73902748087',
			},
			ProfessorUpdateRequest: {
				departmentId: 1,
				name: 'Paulo Fernandes',
				cpf: '73902748087',
			},
			ProfessorResponse: {
				id: 1,
				department: {
					id: 1,
					name: 'Engenharias',
					createdAt: '2025-04-07 04:31:14',
					updatedAt: '2025-04-07 04:33:50',
				},
				name: 'Paulo Fernandes',
				cpf: '73902748087',
				createdAt: '2025-04-07 04:31:14',
				updatedAt: '2025-04-07 04:33:50',
			},
			ProfessorListResponse: {
				professors: [
					{
						id: 1,
						department: {
							id: 1,
							name: 'Engenharias',
							createdAt: '2025-04-07 04:31:14',
							updatedAt: '2025-04-07 04:33:50',
						},
						name: 'Paulo Fernandes',
						cpf: '73902748087',
						createdAt: '2025-04-07 04:31:14',
						updatedAt: '2025-04-07 04:33:50',
					},
				],
			},
			AllocationRequest: {
				$courseId: 1,
				$professorId: 1,
				$day: 1,
				$startHour: '08:00',
				$endHour: '10:00',
			},
			AllocationUpdateRequest: {
				courseId: 1,
				professorId: 1,
				day: 1,
				startHour: '08:00',
				endHour: '10:00',
			},
			AllocationResponse: {
				id: 1,
				course: {
					id: 1,
					name: 'Engenharia de Software',
					createdAt: '2025-04-07 04:31:14',
					updatedAt: '2025-04-07 04:33:50',
				},
				professor: {
					id: 1,
					departmentId: 1,
					name: 'Paulo Fernandes',
					createdAt: '2025-04-07 04:31:14',
					updatedAt: '2025-04-07 04:33:50',
				},
				day: 1,
				startHour: '08:00',
				endHour: '10:00',
				createdAt: '2025-04-07 04:31:14',
				updatedAt: '2025-04-07 04:33:50',
			},
			AllocationListResponse: {
				allocations: [
					{
						id: 1,
						course: {
							id: 1,
							name: 'Engenharia de Software',
							createdAt: '2025-04-07 04:31:14',
							updatedAt: '2025-04-07 04:33:50',
						},
						professor: {
							id: 1,
							name: 'Paulo Fernandes',
							cpf: '73902748087',
							departmentId: 1,
							createdAt: '2025-04-07 04:31:14',
							updatedAt: '2025-04-07 04:33:50',
						},
						day: 1,
						startHour: '08:00',
						endHour: '10:00',
						createdAt: '2025-04-07 04:31:14',
						updatedAt: '2025-04-07 04:33:50',
					},
				],
			},
			Error: {
				status: 400,
				message: '\nInvalid `prisma.course.create()` invocation:\n\n\nUnique constraint failed on the constraint: `courses_name_key`',
				details: {
					code: 'P2002',
					meta: {
						modelName: 'Course',
						target: 'courses_name_key',
					},
					clientVersion: '6.7.0',
					name: 'PrismaClientKnownRequestError',
				},
			},
		},
	},
};

const outputFile = './swagger-output.json';
const routes = ['./src/index.ts'];

swaggerAutogen({ openapi: '3.0.0' })(outputFile, routes, swaggerConfig).then(async () => {
	await import('./src/index');
});
