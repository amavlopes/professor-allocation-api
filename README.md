# 🎓 API REST Alocação de Professores

Projeto para validar conceitos referente ao desenvolvimento back-end, proposto pelo professor Tiago Santos da disciplina de **Arquitetura de Software Back-End** da Pós-Graduação de **Engenharia de Software 2024.1** do Centro Universitário Frassinetti do Recife (**UniFAFIRE**).

A API Alocação de professores tem como objetivo otimizar o processo de alocação, permitindo a gestão de docentes de um departamento para lecionar em diferentes dias e horários para um curso específico. Desenvolvimento em Typescript para Node.js(Express.js), integração ao MySQL com o ORM Prisma, uso da arquitetura em camadas e injeção de dependências.

---

## 📌 Funcionalidades

- ✅ Gestão de **Cursos**
- ✅ Gestão de **Departamentos**
- ✅ Gestão de **Professores**
- ✅ Gestão de **Alocações**

---

## 🧱 Tecnologias Utilizadas

- **Node.js**
- **Express.js**
- **Typescript**
- **ORM Prisma**
- **Swagger / OpenAPI 3 (swagger-autogen)**

---

## 🏃 Como executar o projeto

#### 1. Clone o projeto:

```bash
  git clone https://github.com/amavlopes/professor-allocation-api.git
```

#### 2. Entre no diretório do projeto:

```bash
  cd professor-allocation-api
```

#### 3. Instale todas as dependências:

```bash
  npm install
```

#### 4. Configure as variáveis de ambiente

##### Crie um arquivo .env com base no .env-example:

```bash
APP_PORT = 7000

ENABLED_CORS = http://localhost:7000,http://localhost:4200

DATABASE_URL = mysql://usuario:senha@localhost:3306/nome_do_banco

```

#### 5. Crie o banco de dados executando o comando:

```bash
  npm run prisma-create-db
```

#### 6. (Opcional) Para popular o banco de dados execute o comando:

```bash
  npm run prisma-seed
```

#### 7. Execute a aplicação:

```bash
  npm run start
```

---

## 🔍 Documentação do Swagger

#### Após executar a API, acesse a documentação interativa:

```bash
  http://localhost:7000/docs
```

---

## 🔄 Mantendo o banco atualizado

#### Sempre que fizer alterações no arquivo prisma/schema.prisma:

##### Crie e execute uma migration:

```bash
  npm run prisma-migrate -- [nome_da_migration]
```

---

⌨️ com ❤️ por [Amanda Avelino](https://github.com/amavlopes) 😊
