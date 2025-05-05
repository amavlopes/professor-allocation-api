import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import courseRoutes from './app/routes/course-routes';

const app = express();

app.use(
	cors({
		origin: process.env.ENABLED_CORS?.split(';') || [],
	})
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/courses', courseRoutes);

app.listen(process.env.APP_PORT, () => {
	console.log(`Servidor rodando em http://localhost:${process.env.APP_PORT}`);
});
