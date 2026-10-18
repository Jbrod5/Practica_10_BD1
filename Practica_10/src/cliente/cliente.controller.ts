import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClienteService } from './cliente.service.js';
import { Cliente } from './entities/cliente.entity.js';

@Controller('cliente')
export class ClienteController {

    constructor(private readonly clienteService: ClienteService) {}

    /**
     * Crear un nuevo cliente.
     * @param datos Datos del cliente a crear.
     * @returns El cliente creado.
     */
    @Post()
    create(@Body() datos: Partial<Cliente>) {
        return this.clienteService.create(datos);
    }

    /**
     * Obtener todos los clientes.
     * @returns Lista de todos los clientes.
     */
    @Get()
    findAll() {
        return this.clienteService.findAll();
    }

    /**
     * Buscar un cliente por su id.
     * @param id Identificador del cliente.
     * @returns El cliente encontrado.
     */
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.clienteService.findOne(+id);
    }

    /**
     * Actualizar un cliente existente.
     * @param id Identificador del cliente a actualizar.
     * @param datos Nuevos datos del cliente.
     * @returns El cliente actualizado.
     */
    @Patch(':id')
    update(@Param('id') id: string, @Body() datos: Partial<Cliente>) {
        return this.clienteService.update(+id, datos);
    }

    /**
     * Eliminar un cliente por su id.
     * @param id Identificador del cliente a eliminar.
     */
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.clienteService.remove(+id);
    }
}
