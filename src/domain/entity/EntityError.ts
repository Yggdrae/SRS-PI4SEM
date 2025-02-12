export class EntityError extends Error {
    status: number;
    error: string;
    message: string;
    details: any;
    timestamp: string;
    path: string;

    constructor(error: { message: string; campo: string }) {
        super(error.message);
        this.status = 422;
        this.error = "Unprocessable Entity";
        this.message = error.message;
        this.details = {
            field: error.campo,
            issue: "Formato inválido.",
        };
        this.timestamp = new Date().toISOString();
        this.path = "";
    }
}
