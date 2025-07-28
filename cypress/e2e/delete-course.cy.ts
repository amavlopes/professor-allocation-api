describe('DELETE /courses', () => {
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

	it('deve excluir um curso específico por ID', () => {
		cy.request({
			method: 'DELETE',
			url: `${URL}/${idCursoCriado}`,
			failOnStatusCode: false,
		}).then((response) => {
			expect(response.status).to.eq(204);
		});

		cy.request({
			method: 'GET',
			url: `${URL}/${idCursoCriado}`,
			failOnStatusCode: false,
		}).then((response) => {
			expect(response.status).to.eq(404);
			expect(response.statusText).to.eq('Not Found');
		});
	});

	it('deve retornar 404 quando tentar excluir um curso inexistente', () => {
		const id = 1000;

		cy.request({
			method: 'GET',
			url: `${URL}/${id}`,
			failOnStatusCode: false,
		}).then((response) => {
			console.log(response);
			expect(response.status).to.eq(404);
			expect(response.statusText).to.eq('Not Found');
		});
	});
});
