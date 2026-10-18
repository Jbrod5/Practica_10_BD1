import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity.js';

@Injectable()
export class ClienteService {

    constructor(
        @InjectRepository(Cliente)
        private readonly clienteRepository: Repository<Cliente>,
    ) {}

    /**
     * Crear un nuevo cliente en la base de datos.
     * @param datos Datos del cliente a crear.
     * @returns El cliente creado con su id generado.
     */
    async create(datos: Partial<Cliente>): Promise<Cliente> {
        const cliente = this.clienteRepository.create(datos);
        return await this.clienteRepository.save(cliente);
    }

    /**
     * Obtener todos los clientes registrados.
     * @returns Lista de todos los clientes.
     */
    async findAll(): Promise<Cliente[]> {
        return await this.clienteRepository.find();
    }

    /**
     * Buscar un cliente por su id.
     * @param id Identificador del cliente.
     * @returns El cliente encontrado.
     */
    async findOne(id: number): Promise<Cliente> {
        const cliente = await this.clienteRepository.findOne({ where: { id } });

        // verificar que el cliente exista antes de devolverlo
        if (!cliente) {
            throw new NotFoundException('No existe el cliente con id ' + id);
        }

        return cliente;
    }

    /**
     * Actualizar un cliente existente.
     * @param id Identificador del cliente a actualizar.
     * @param datos Nuevos datos del cliente.
     * @returns El cliente actualizado.
     */
    async update(id: number, datos: Partial<Cliente>): Promise<Cliente> {
        const cliente = await this.findOne(id);
        Object.assign(cliente, datos);
        return await this.clienteRepository.save(cliente);
    }

    /**
     * Eliminar un cliente por su id.
     * @param id Identificador del cliente a eliminar.
     */
    async remove(id: number): Promise<void> {
        const cliente = await this.findOne(id);
        await this.clienteRepository.remove(cliente);
    }
}
