import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ReservasInterface } from "./interfaces/reservas.interface";
import { Reservas } from "./reservas.entity";
import { ReservasService } from "./reservas.service";
import { CancelarReservaDTO } from "./dto/cancelarReserva.dto";

@Controller('reservas')
export class ReservasController {
    constructor(private reservasService: ReservasService) { }

    @Get()
    getReservas(): Promise<Reservas[]> {
        return this.reservasService.getReservas();
    }

    @Get('full')
    getReservasFull(): Promise<Reservas[]> {
        return this.reservasService.getReservasFull();
    }

    @Get('usuario/:usuarioId')
    getReservasByUsuarioId(@Param('usuarioId', ParseIntPipe) usuarioId: number): Promise<Reservas[]> {
        return this.reservasService.getReservasByUsuarioId(usuarioId);
    }

    @Post()
    createReserva(@Body() data: ReservasInterface): Promise<Reservas> {
        return this.reservasService.createReserva(data);
    }

    @Put('/cancelar/:id')
    cancelarReserva(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: CancelarReservaDTO,
    ): Promise<Reservas> {
        return this.reservasService.cancelarReserva(id, body.motivo);
    }


    @Put(':id')
    updateReserva(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: Partial<ReservasInterface>
    ): Promise<Reservas> {
        return this.reservasService.updateReserva(id, data);
    }

    @Delete(':id')
    deleteReserva(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.reservasService.deleteReserva(id);
    }
}