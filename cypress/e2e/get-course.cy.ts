import { Course } from 'generated/prisma';

describe('GET /courses', () => {
	const URL = '/courses';
	const payload = {
		name: 'Engenharia da Computação',
		description: 'O curso de Engenharia da Computação forma profissionais para elaborar sistemas que envolvam o uso do computador em conjunto com sistemas de controle, comunicações ou hardware.',
	};
	let idCursoCriado: number;

	before(() => {
		cy.request('POST', URL, payload).then((response) => {
			expect(response.status).to.eq(201);
			idCursoCriado = response.body.course.id;
		});
	});

	after(() => {
		if (idCursoCriado) {
			cy.request({
				method: 'DELETE',
				url: `${URL}/${idCursoCriado}`,
				failOnStatusCode: false,
			}).then((response) => {
				expect(response.status).to.eq(204);
			});
		}
	});

	it('deve retornar pelo menos um curso cadastrado', () => {
		cy.request(URL).then((response) => {
			idCursoCriado = response.body.courses[0].id;

			expect(response.status).to.eq(200);
			expect(response.body.courses).to.be.an('array');
			expect(response.body.courses.length).to.be.greaterThan(0);

			const cursoCadastrado = response.body.courses.find((c: Course) => c.id === idCursoCriado);
			expect(cursoCadastrado).to.exist;
			expect(cursoCadastrado.name).to.eq(payload.name);
			expect(cursoCadastrado.description).to.eq(payload.description);
		});
	});

	it('deve retornar um curso específico por ID', () => {
		cy.request(`${URL}/${idCursoCriado}`).then((response) => {
			expect(response.status).to.eq(200);
			expect(response.body.course).to.have.property('id', idCursoCriado);
			expect(response.body.course).to.have.property('name', payload.name);
			expect(response.body.course).to.have.property('description', payload.description);
		});
	});

	it('deve retornar 404 para curso inexistente', () => {
		const id = 10000;

		cy.request({
			method: 'GET',
			url: `${URL}/${id}`,
			failOnStatusCode: false,
		}).then((response) => {
			expect(response.status).to.eq(404);
			expect(response.statusText).to.eq('Not Found');
		});
	});
});
