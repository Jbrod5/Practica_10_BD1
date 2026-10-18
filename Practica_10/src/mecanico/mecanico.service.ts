import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mecanico } from './entities/mecanico.entity.js';

@Injectable()
export class MecanicoService {

    constructor(
        @InjectRepository(Mecanico)
        private readonly mecanicoRepository: Repository<Mecanico>,
    ) {}

    /**
     * Crear un nuevo mecanico en la base de datos.
     * @param datos Datos del mecanico a crear.
     * @returns El mecanico creado con su id generado.
     */
    async create(datos: Partial<Mecanico>): Promise<Mecanico> {
        const mecanico = this.mecanicoRepository.create(datos);
        return await this.mecanicoRepository.save(mecanico);
    }

    /**
     * Obtener todos los mecanicos registrados.
     * @returns Lista de todos los mecanicos.
     */
    async findAll(): Promise<Mecanico[]> {
        return await this.mecanicoRepository.find();
    }

    /**
     * Buscar un mecanico por su id.
     * @param id Identificador del mecanico.
     * @returns El mecanico encontrado.
     */
    async findOne(id: number): Promise<Mecanico> {
        const mecanico = await this.mecanicoRepository.findOne({ where: { id } });

        // verificar que el mecanico exista antes de devolverlo
        if (!mecanico) {
            throw new NotFoundException('No existe el mecanico con id ' + id);
        }

        return mecanico;
    }

    /**
     * Actualizar un mecanico existente.
     * @param id Identificador del mecanico a actualizar.
     * @param datos Nuevos datos del mecanico.
     * @returns El mecanico actualizado.
     */
    async update(id: number, datos: Partial<Mecanico>): Promise<Mecanico> {
        const mecanico = await this.findOne(id);
        Object.assign(mecanico, datos);
        return await this.mecanicoRepository.save(mecanico);
    }

    /**
     * Eliminar un mecanico por su id.
     * @param id Identificador del mecanico a eliminar.
     */
    async remove(id: number): Promise<void> {
        const mecanico = await this.findOne(id);
        await this.mecanicoRepository.remove(mecanico);
    }
}
