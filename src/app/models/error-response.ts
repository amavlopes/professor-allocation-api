import { HttpStatusEnum } from '../enums/http-status';

export default class ErrorResponse extends Error {
	status: number;
	details?: any;

	constructor(status: HttpStatusEnum, message: string, details: any) {
		const error = `Error ${status}: ${message}.\n details: ${details}`;
		super(error);
		this.name = 'ErrorReponse';
		this.status = status;
		this.details = details;
		this.message = error;

		Object.setPrototypeOf(this, ErrorResponse.prototype);
	}
}
