export interface AppErrorI extends Error {
	statusCode?: number;
}

export class AppError extends Error implements AppErrorI {
	statusCode?: number;

	constructor(message: string, statusCode: number) {
		super(message);
		this.statusCode = statusCode;
	}
}
