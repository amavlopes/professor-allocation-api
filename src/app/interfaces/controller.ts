import { Request, Response } from 'express';

export interface IController {
	create(request: Request, response: Response): Promise<void>;
	findAll(request: Request, response: Response): Promise<void>;
	findById(request: Request, response: Response): Promise<void>;
	update(request: Request, response: Response): Promise<void>;
	deleteAll(request: Request, response: Response): Promise<void>;
	deleteById(request: Request, response: Response): Promise<void>;
}
