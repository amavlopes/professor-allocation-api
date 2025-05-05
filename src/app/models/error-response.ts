import { HttpStatusEnum } from '../enums/http-status';

export class ErrorResponse {
	status: number;
	message: string;
	details?: any;

	constructor(status: HttpStatusEnum, message: string, details?: any) {
		this.status = status;
		this.message = message;
		this.details = details;

		Object.setPrototypeOf(this, ErrorResponse.prototype);
	}
}
