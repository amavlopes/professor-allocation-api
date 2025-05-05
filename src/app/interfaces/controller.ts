import { Request, Response } from 'express';

export default interface IController {
	create(request: Request, response: Response): unknown;
	findAll(request: Request, response: Response): unknown;
	findById(request: Request, response: Response): unknown;
	update(request: Request, response: Response): unknown;
	deleteAll(request: Request, response: Response): unknown;
	deleteById(request: Request, response: Response): unknown;
}
