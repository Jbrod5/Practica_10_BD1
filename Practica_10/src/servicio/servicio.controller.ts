import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServicioService } from './servicio.service.js';
import { Servicio } from './entities/servicio.entity.js';

@Controller('servicio')
export class ServicioController {

    constructor(private readonly servicioService: ServicioService) {}

    /**
     * Crear un nuevo servicio.
     * @param datos Datos del servicio a crear.
     * @returns El servicio creado.
     */
    @Post()
    create(@Body() datos: Partial<Servicio>) {
        return this.servicioService.create(datos);
    }

    /**
     * Obtener todos los servicios.
     * @returns Lista de todos los servicios.
     */
    @Get()
    findAll() {
        return this.servicioService.findAll();
    }

    /**
     * Buscar un servicio por su id.
     * @param id Identificador del servicio.
     * @returns El servicio encontrado.
     */
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.servicioService.findOne(+id);
    }

    /**
     * Actualizar un servicio existente.
     * @param id Identificador del servicio a actualizar.
     * @param datos Nuevos datos del servicio.
     * @returns El servicio actualizado.
     */
    @Patch(':id')
    update(@Param('id') id: string, @Body() datos: Partial<Servicio>) {
        return this.servicioService.update(+id, datos);
    }

    /**
     * Eliminar un servicio por su id.
     * @param id Identificador del servicio a eliminar.
     */
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.servicioService.remove(+id);
    }
}
