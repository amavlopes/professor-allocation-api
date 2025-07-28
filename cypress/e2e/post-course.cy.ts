describe('POST /courses', () => {
	const URL = '/courses';
	let idCursoCriado: number | undefined;

	afterEach(() => {
		if (idCursoCriado) {
			cy.request({
				method: 'DELETE',
				url: `${URL}/${idCursoCriado}`,
				failOnStatusCode: false,
			}).then((response) => {
				idCursoCriado = undefined;
				expect(response.status).to.eq(204);
			});
		}
	});

	it('deve validar o schema da resposta quando criar um curso com sucesso', () => {
		const payload = {
			name: 'Ciência de Dados',
			description: 'Curso focado em análise e processamento de dados.',
		};

		cy.request({
			method: 'POST',
			url: URL,
			body: payload,
			failOnStatusCode: false,
		}).then((response) => {
			idCursoCriado = response.body.course.id;

			expect(response.status).to.eq(201);
			expect(response.body).to.have.all.keys('course');
			expect(response.body.course.id).to.be.a('number');
			expect(response.body.course.name).to.be.a('string');
			expect(response.body.course.description).to.be.a('string');
			expect(response.body.course).to.have.all.keys('id', 'name', 'description', 'createdAt', 'updatedAt');

			expect(response.body.course.name).to.eq(payload.name);
			expect(response.body.course.description).to.eq(payload.description);
		});
	});

	it('deve criar curso com dados válidos', () => {
		const payload = {
			name: 'Sistemas da Informação',
			description:
				'O curso de Sistemas de Informação é uma graduação que prepara profissionais para atuar na análise, desenvolvimento e gestão de sistemas de informação, integrando conhecimentos de tecnologia da informação (TI) e gestão de negócios.',
		};
		cy.request({
			method: 'POST',
			url: URL,
			body: payload,
			failOnStatusCode: false,
		}).then((response) => {
			idCursoCriado = response.body.course.id;

			expect(response.status).to.eq(201);
			expect(response.body.course).to.have.property('id');
			expect(response.body.course.name).to.eq(payload.name);
			expect(response.body.course.description).to.eq(payload.description);
		});
	});

	it('não deve criar curso com name ausente', () => {
		const payload = {
			description: 'O curso de Engenharia da Computação forma profissionais para elaborar sistemas que envolvam o uso do computador em conjunto com sistemas de controle, comunicações ou hardware',
		};
		cy.request({
			method: 'POST',
			url: URL,
			body: payload,
			failOnStatusCode: false,
		}).then((response) => {
			expect(response.status).to.eq(400);
			expect(response.body.message).to.contain('Argument `name` is missing');
			expect(response.body).to.have.property('details');
		});
	});

	it('deve criar curso com description ausente', () => {
		const payload = {
			name: 'Bacharelado em Biologia',
			description: '',
		};

		cy.request({
			method: 'POST',
			url: URL,
			body: payload,
			failOnStatusCode: false,
		}).then((response) => {
			idCursoCriado = response.body.course.id;

			expect(response.status).to.eq(201);
			expect(response.body.course).to.have.property('id');
			expect(response.body.course.name).to.eq(payload.name);
			expect(response.body.course.description).to.empty;
		});
	});

	it('não deve criar curso com nome já existente', () => {
		const payload = {
			name: 'Sistemas da Informação',
		};

		cy.request({
			method: 'POST',
			url: URL,
			body: payload,
			failOnStatusCode: false,
		}).then((response) => {
			idCursoCriado = response.body.course.id;
			expect(response.status).to.eq(201);
		});

		cy.request({
			method: 'POST',
			url: URL,
			body: payload,
			failOnStatusCode: false,
		}).then((response) => {
			expect(response.status).to.eq(400);
			expect(response.body.message).to.equal(`O curso ${payload.name} já existe`);
			expect(response.body).to.have.property('details');
		});
	});
});
