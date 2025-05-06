import 'dotenv/config';
import 'reflect-metadata';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import { serve, setup } from 'swagger-ui-express';
import swaggerFile from '../swagger-output.json';
import courseRoutes from './app/routes/course-routes';
import departmentRoutes from './app/routes/department-routes';
import professorRoutes from './app/routes/professor-routes';
import './shared/container';

const app = express();

app.use(
	cors({
		origin: process.env.ENABLED_CORS?.split(';') || [],
	})
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

app.use(courseRoutes);
app.use(departmentRoutes);
app.use(professorRoutes);

app.use('/docs', serve, setup(swaggerFile));

app.listen(process.env.APP_PORT, () => {
	console.log(`Servidor rodando em http://localhost:${process.env.APP_PORT}`);
});
