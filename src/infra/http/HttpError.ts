export class HttpError extends Error {
	status: Status;
	error: StatusText;
	message: string;
	details: any;
	timestamp: string;
	path: string;

	constructor(error: {
		status: Status;
		error: StatusText;
		message: string;
		details: any;
		timestamp: string;
		path: string;
	}) {
		super(error.message);
		this.status = error.status;
		this.error = error.error;
		this.message = error.message;
		this.details = error.details;
		this.timestamp = error.timestamp;
		this.path = error.path;
	}
}

type Status = 400 | 401 | 403 | 404 | 409 | 422 | 500 | 502 | 503 | 504;
type StatusText =
	| "Bad Request"
	| "Unauthorized"
	| "Forbidden"
	| "Not Found"
	| "Conflict"
	| "Unprocessable Entity"
	| "Internal Server Error"
	| "Internal Server Error"
	| "Bad Gateway"
	| "Service Unavailable"
	| "Gateway Timeout";
