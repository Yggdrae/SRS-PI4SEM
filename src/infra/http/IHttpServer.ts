export type HttpMethod = "get" | "post" | "patch" | "delete";

export interface IHttpServer {
	app: any;
	register(method: HttpMethod, url: string, callback: (params: any, body: any, file?: any) => Promise<any>): void;
	listen(port: number): void;
}
