import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MecanicoService } from './mecanico.service.js';
import { Mecanico } from './entities/mecanico.entity.js';

@Controller('mecanico')
export class MecanicoController {

    constructor(private readonly mecanicoService: MecanicoService) {}

    /**
     * Crear un nuevo mecanico.
     * @param datos Datos del mecanico a crear.
     * @returns El mecanico creado.
     */
    @Post()
    create(@Body() datos: Partial<Mecanico>) {
        return this.mecanicoService.create(datos);
    }

    /**
     * Obtener todos los mecanicos.
     * @returns Lista de todos los mecanicos.
     */
    @Get()
    findAll() {
        return this.mecanicoService.findAll();
    }

    /**
     * Buscar un mecanico por su id.
     * @param id Identificador del mecanico.
     * @returns El mecanico encontrado.
     */
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.mecanicoService.findOne(+id);
    }

    /**
     * Actualizar un mecanico existente.
     * @param id Identificador del mecanico a actualizar.
     * @param datos Nuevos datos del mecanico.
     * @returns El mecanico actualizado.
     */
    @Patch(':id')
    update(@Param('id') id: string, @Body() datos: Partial<Mecanico>) {
        return this.mecanicoService.update(+id, datos);
    }

    /**
     * Eliminar un mecanico por su id.
     * @param id Identificador del mecanico a eliminar.
     */
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.mecanicoService.remove(+id);
    }
}
