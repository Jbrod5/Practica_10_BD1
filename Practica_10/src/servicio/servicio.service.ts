import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Servicio } from './entities/servicio.entity.js';

@Injectable()
export class ServicioService {

    constructor(
        @InjectRepository(Servicio)
        private readonly servicioRepository: Repository<Servicio>,
    ) {}

    /**
     * Crear un nuevo servicio en la base de datos.
     * @param datos Datos del servicio a crear.
     * @returns El servicio creado con su id generado.
     */
    async create(datos: Partial<Servicio>): Promise<Servicio> {
        const servicio = this.servicioRepository.create(datos);
        return await this.servicioRepository.save(servicio);
    }

    /**
     * Obtener todos los servicios registrados.
     * @returns Lista de todos los servicios.
     */
    async findAll(): Promise<Servicio[]> {
        return await this.servicioRepository.find();
    }

    /**
     * Buscar un servicio por su id.
     * @param id Identificador del servicio.
     * @returns El servicio encontrado.
     */
    async findOne(id: number): Promise<Servicio> {
        const servicio = await this.servicioRepository.findOne({ where: { id } });

        // verificar que el servicio exista antes de devolverlo
        if (!servicio) {
            throw new NotFoundException('No existe el servicio con id ' + id);
        }

        return servicio;
    }

    /**
     * Actualizar un servicio existente.
     * @param id Identificador del servicio a actualizar.
     * @param datos Nuevos datos del servicio.
     * @returns El servicio actualizado.
     */
    async update(id: number, datos: Partial<Servicio>): Promise<Servicio> {
        const servicio = await this.findOne(id);
        Object.assign(servicio, datos);
        return await this.servicioRepository.save(servicio);
    }

    /**
     * Eliminar un servicio por su id.
     * @param id Identificador del servicio a eliminar.
     */
    async remove(id: number): Promise<void> {
        const servicio = await this.findOne(id);
        await this.servicioRepository.remove(servicio);
    }
}
