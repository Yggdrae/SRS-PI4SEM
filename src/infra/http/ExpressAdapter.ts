import express, {
    type NextFunction,
    type Request,
    type Response,
} from "express";
import cors from "cors";
import multer from 'multer'

import type { HttpMethod, IHttpServer } from "../http/IHttpServer";
import { HttpError } from "./HttpError";
import { EntityError } from "../../domain/entity/EntityError";

export class ExpressAdapter implements IHttpServer {
    app: express.Express;

    constructor() {
        this.app = express();
        this.app.use(express.json());
        this.app.use(cors());

        this.app.use((req: Request, res: Response, next: NextFunction) => {
            const formatarDataHora = (): string => {
                const data = new Date();

                const dia = String(data.getDate()).padStart(2, "0");
                const mes = String(data.getMonth() + 1).padStart(2, "0");
                const ano = data.getFullYear();

                const horas = String(data.getHours()).padStart(2, "0");
                const minutos = String(data.getMinutes()).padStart(2, "0");

                return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
            };

            const dataHoraFormatada = formatarDataHora();
            res.on("finish", () => {
                console.log({
                    dataHora: dataHoraFormatada,
                    ip: req.ip,
                    path: req.path,
                    method: req.method,
                    status: res.statusCode,
                    url: req.url,
                    body: req.body,
                    query: req.query,
                    params: req.params,
                });
            });
            next();
        });
    }

    register(
        method: HttpMethod,
        url: string,
        callback: (
            params: any,
            body: any,
            file?: Express.Multer.File
        ) => Promise<any>
    ): void {
        const upload = multer({ storage: multer.memoryStorage() });

        if (method === "post") {
            const urlFormated = `/api${url.replace(REGEX, "")}`;
            this.app.post(
                `/api${url.replace(/\{|\}/g, "")}`,
                upload.single("CartoesDias"),
                async (req, res) => {
                    try {
                        const query = req.query;
                        const body = req.body;
                        const file = req.file;

                        const output = await callback(query, body, file);
                        res.status(200).json({ data: output });
                    } catch (error: any) {
                        console.error(error);
                        if (error instanceof HttpError) {
                            res.status(error.status).json(error);
                        } else if (error instanceof EntityError) {
                            res.status(error.status).json({
                                status: error.status,
                                error: error.error,
                                message: error.message,
                                details: error.details,
                                timestamp: error.timestamp,
                                path: urlFormated,
                            });
                        } else {
                            res.status(500).json({
                                status: 500,
                                error: "Internal Server Error",
                                message: error.message,
                                details: [],
                                timestamp: new Date().toISOString(),
                                path: urlFormated,
                            });
                        }
                    }
                }
            );
        } else {
            const urlFormated = `/api${url.replace(REGEX, "")}`;
            this.app[method](urlFormated, async (req, res) => {
                try {
                    const params = req.params;
                    const query = req.query;
                    const body = req.body;
                    const file = req.file;

                    const output = await callback(
                        { ...req.params, ...req.query },
                        req.body,
                        file
                    );
                    res.status(200).json({ data: output });
                } catch (error: any) {
                    if (error instanceof HttpError) {
                        res.status(error.status).json(error);
                    } else if (error instanceof EntityError) {
                        res.status(error.status).json({
                            status: error.status,
                            error: error.error,
                            message: error.message,
                            details: error.details,
                            timestamp: error.timestamp,
                            path: urlFormated,
                        });
                    } else {
                        res.status(500).json({
                            status: 500,
                            error: "Internal Server Error",
                            message: error.message,
                            details: [],
                            timestamp: new Date().toISOString(),
                            path: urlFormated,
                        });
                    }
                }
            });
        }
    }

    listen(port: number): void {
        this.app.use((req: Request, res: Response) => {
            res.status(404).json({ error: "Rota não encontrada" });
        });
        this.app.listen(port, () =>
            console.log(`Servidor está rodando em: http://localhost:${port}`)
        );
    }
}
const REGEX = /\{|\}/g;
