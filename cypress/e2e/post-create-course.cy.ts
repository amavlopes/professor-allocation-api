describe('POST /courses', () => {
	xit('deve criar curso com dados válidos', () => {
		const courseName = 'Sistemas da Informação';
		const courseDescription =
			'O curso de Sistemas de Informação é uma graduação que prepara profissionais para atuar na análise, desenvolvimento e gestão de sistemas de informação, integrando conhecimentos de tecnologia da informação (TI) e gestão de negócios.';

		cy.request({
			method: 'POST',
			url: '/courses',
			body: {
				name: courseName,
				description: courseDescription,
			},
			failOnStatusCode: false,
		}).then((response) => {
			expect(response.status).to.eq(201);
			expect(response.body.course).to.have.property('id');
			expect(response.body.course.name).to.eq(courseName);
			expect(response.body.course.description).to.eq(courseDescription);
		});
	});

	xit('não deve criar curso com name ausente', () => {
		const courseDescription =
			'O curso de Engenharia da Computação forma profissionais para elaborar sistemas que envolvam o uso do computador em conjunto com sistemas de controle, comunicações ou hardware';

		cy.request({
			method: 'POST',
			url: '/courses',
			body: {
				description: courseDescription,
			},
			failOnStatusCode: false,
		}).then((response) => {
			expect(response.status).to.eq(400);
			expect(response.body.message).to.contain('Argument `name` is missing');
			expect(response.body).to.have.property('details');
		});
	});

	it('deve criar curso com description ausente', () => {
		const courseName = 'Bacharelado em Biologia';
		const courseDescription = '';

		cy.request({
			method: 'POST',
			url: '/courses',
			body: {
				name: courseName,
				description: courseDescription,
			},
			failOnStatusCode: false,
		}).then((response) => {
			expect(response.status).to.eq(201);
			expect(response.body.course).to.have.property('id');
			expect(response.body.course.name).to.eq(courseName);
			expect(response.body.course.description).to.empty;
		});
	});
});
