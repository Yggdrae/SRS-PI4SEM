export interface ReservasInterface {
    usuario: number;
    sala: number;
    horario: { id: number };
    status: string;
    motivoCancelamento: string;
}