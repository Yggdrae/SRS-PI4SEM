import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ReservasInterface } from "./interfaces/reservas.interface";
import { Reservas } from "./reservas.entity";
import { ReservasService } from "./reservas.service";

@Controller('reservas')
export class ReservasController {
    constructor(private reservasService: ReservasService) {}

    @Get()
    getReservas(): Promise<Reservas[]> {
        return this.reservasService.getReservas();
    }

    @Get('full')
    getReservasFull(): Promise<Reservas[]> {
        return this.reservasService.getReservasFull();
    }

    @Post()
    createReserva(@Body() data: ReservasInterface): Promise<Reservas> {
        return this.reservasService.createReserva(data);
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