import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehiculo } from './entities/vehiculo.entity.js';

@Injectable()
export class VehiculoService {

    constructor(
        @InjectRepository(Vehiculo)
        private readonly vehiculoRepository: Repository<Vehiculo>,
    ) {}

    /**
     * Crear un nuevo vehiculo en la base de datos.
     * @param datos Datos del vehiculo a crear.
     * @returns El vehiculo creado con su id generado.
     */
    async create(datos: Partial<Vehiculo>): Promise<Vehiculo> {
        const vehiculo = this.vehiculoRepository.create(datos);
        return await this.vehiculoRepository.save(vehiculo);
    }

    /**
     * Obtener todos los vehiculos registrados.
     * @returns Lista de todos los vehiculos.
     */
    async findAll(): Promise<Vehiculo[]> {
        return await this.vehiculoRepository.find();
    }

    /**
     * Buscar un vehiculo por su id.
     * @param id Identificador del vehiculo.
     * @returns El vehiculo encontrado.
     */
    async findOne(id: number): Promise<Vehiculo> {
        const vehiculo = await this.vehiculoRepository.findOne({ where: { id } });

        // verificar que el vehiculo exista antes de devolverlo
        if (!vehiculo) {
            throw new NotFoundException('No existe el vehiculo con id ' + id);
        }

        return vehiculo;
    }

    /**
     * Actualizar un vehiculo existente.
     * @param id Identificador del vehiculo a actualizar.
     * @param datos Nuevos datos del vehiculo.
     * @returns El vehiculo actualizado.
     */
    async update(id: number, datos: Partial<Vehiculo>): Promise<Vehiculo> {
        const vehiculo = await this.findOne(id);
        Object.assign(vehiculo, datos);
        return await this.vehiculoRepository.save(vehiculo);
    }

    /**
     * Eliminar un vehiculo por su id.
     * @param id Identificador del vehiculo a eliminar.
     */
    async remove(id: number): Promise<void> {
        const vehiculo = await this.findOne(id);
        await this.vehiculoRepository.remove(vehiculo);
    }
}
