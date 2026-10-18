import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VehiculoService } from './vehiculo.service.js';
import { Vehiculo } from './entities/vehiculo.entity.js';

@Controller('vehiculo')
export class VehiculoController {

    constructor(private readonly vehiculoService: VehiculoService) {}

    /**
     * Crear un nuevo vehiculo.
     * @param datos Datos del vehiculo a crear.
     * @returns El vehiculo creado.
     */
    @Post()
    create(@Body() datos: Partial<Vehiculo>) {
        return this.vehiculoService.create(datos);
    }

    /**
     * Obtener todos los vehiculos.
     * @returns Lista de todos los vehiculos.
     */
    @Get()
    findAll() {
        return this.vehiculoService.findAll();
    }

    /**
     * Buscar un vehiculo por su id.
     * @param id Identificador del vehiculo.
     * @returns El vehiculo encontrado.
     */
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.vehiculoService.findOne(+id);
    }

    /**
     * Actualizar un vehiculo existente.
     * @param id Identificador del vehiculo a actualizar.
     * @param datos Nuevos datos del vehiculo.
     * @returns El vehiculo actualizado.
     */
    @Patch(':id')
    update(@Param('id') id: string, @Body() datos: Partial<Vehiculo>) {
        return this.vehiculoService.update(+id, datos);
    }

    /**
     * Eliminar un vehiculo por su id.
     * @param id Identificador del vehiculo a eliminar.
     */
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.vehiculoService.remove(+id);
    }
}
