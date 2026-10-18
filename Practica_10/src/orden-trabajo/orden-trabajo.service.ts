import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { OrdenTrabajo } from './entities/orden-trabajo.entity.js';
import { CreateOrdenTrabajoDto } from './dto/create-orden-trabajo.dto.js';
import { UpdateOrdenTrabajoDto } from './dto/update-orden-trabajo.dto.js';
import { Servicio } from '../servicio/entities/servicio.entity.js';

@Injectable()
export class OrdenTrabajoService {

    constructor(
        @InjectRepository(OrdenTrabajo)
        private readonly ordenTrabajoRepository: Repository<OrdenTrabajo>,
        private readonly dataSource: DataSource,
    ) {}

    /**
     * Crear una nueva orden de trabajo en la base de datos.
     * @param createOrdenTrabajoDto Datos de la orden a crear.
     * @returns La orden creada con su id generado.
     */
    async create(createOrdenTrabajoDto: CreateOrdenTrabajoDto): Promise<OrdenTrabajo> {
        // verificar si se proporcionó fecha, si no usar la fecha actual
        const fechaCreacion: string = createOrdenTrabajoDto.fecha ?? new Date().toISOString().split('T')[0];

        const orden = this.ordenTrabajoRepository.create({
            ...createOrdenTrabajoDto,
            fecha: fechaCreacion,
        });
        return await this.ordenTrabajoRepository.save(orden);
    }

    /**
     * Obtener todas las ordenes de trabajo registradas.
     * @returns Lista de todas las ordenes.
     */
    async findAll(): Promise<OrdenTrabajo[]> {
        return await this.ordenTrabajoRepository.find();
    }

    /**
     * Buscar una orden de trabajo por su id.
     * @param id Identificador de la orden.
     * @returns La orden encontrada o error 404.
     */
    async findOne(id: number): Promise<OrdenTrabajo> {
        const orden = await this.ordenTrabajoRepository.findOne({ where: { id } });

        // verificar si la orden existe antes de devolverla
        if (!orden) {
            throw new NotFoundException('No existe la orden de trabajo con id ' + id);
        }

        return orden;
    }

    /**
     * Actualizar una orden de trabajo existente.
     * @param id Identificador de la orden a actualizar.
     * @param updateOrdenTrabajoDto Nuevos datos de la orden.
     * @returns La orden actualizada.
     */
    async update(id: number, updateOrdenTrabajoDto: UpdateOrdenTrabajoDto): Promise<OrdenTrabajo> {
        const orden = await this.findOne(id);
        Object.assign(orden, updateOrdenTrabajoDto);
        return await this.ordenTrabajoRepository.save(orden);
    }

    /**
     * Eliminar una orden de trabajo por su id.
     * @param id Identificador de la orden a eliminar.
     */
    async remove(id: number): Promise<void> {
        const orden = await this.findOne(id);
        await this.ordenTrabajoRepository.remove(orden);
    }

    /**
     * Obtener todas las ordenes con sus relaciones completas.
     * @returns Ordenes con vehiculo, mecanico y servicio asociados.
     */
    async findConRelaciones(): Promise<OrdenTrabajo[]> {
        return await this.ordenTrabajoRepository.find({
            relations: {
                vehiculo: true,
                mecanico: true,
                servicio: true,
            },
        });
    }

    /**
     * Buscar ordenes por mecanico usando QueryBuilder.
     * @param mecanicoId Identificador del mecanico a filtrar.
     * @returns Ordenes del mecanico ordenadas por fecha descendente.
     */
    async buscarPorMecanico(mecanicoId: number): Promise<OrdenTrabajo[]> {
        return await this.ordenTrabajoRepository
            .createQueryBuilder('orden')
            .innerJoinAndSelect('orden.vehiculo', 'vehiculo')
            .innerJoinAndSelect('orden.mecanico', 'mecanico')
            .innerJoinAndSelect('orden.servicio', 'servicio')
            .where('mecanico.id = :mecanicoId', { mecanicoId })
            .orderBy('orden.fecha', 'DESC')
            .getMany();
    }

    /**
     * Crear una orden y actualizar el precio del servicio en una transaccion.
     * @param createOrdenTrabajoDto Datos de la orden a crear.
     * @param NuevoPrecio Nuevo precio para el servicio asociado.
     * @returns La orden creada.
     */
    async crearOrdenConTransaccion(
        createOrdenTrabajoDto: CreateOrdenTrabajoDto,
        nuevoPrecio: number,
    ): Promise<OrdenTrabajo> {
        // verificar si se proporcionó fecha, si no usar la fecha actual
        const fechaCreacion: string = createOrdenTrabajoDto.fecha ?? new Date().toISOString().split('T')[0];
        const datosConFecha = {
            ...createOrdenTrabajoDto,
            fecha: fechaCreacion,
        };

        return await this.dataSource.transaction(async (manager) => {
            const ordenRepository = manager.getRepository(OrdenTrabajo);
            const servicioRepository = manager.getRepository(Servicio);

            // primer cambio: crear la orden de trabajo dentro de la transaccion
            const orden = ordenRepository.create(datosConFecha);
            const ordenGuardada = await ordenRepository.save(orden);

            // segundo cambio: actualizar el precio del servicio asociado
            const servicio = await servicioRepository.findOne({
                where: { id: createOrdenTrabajoDto.servicioId },
            });

            // verificar que el servicio exista para poder actualizarlo
            if (!servicio) {
                throw new NotFoundException('No existe el servicio con id ' + createOrdenTrabajoDto.servicioId);
            }

            servicio.precio = nuevoPrecio;
            await servicioRepository.save(servicio);

            return ordenGuardada;
        });
    }

    /**
     * Crear una orden con un servicio inexistente para provocar rollback.
     * @param createOrdenTrabajoDto Datos de la orden a crear.
     * @returns La orden creada o error si el servicio no existe.
     */
    async crearOrdenConTransaccionFallida(
        createOrdenTrabajoDto: CreateOrdenTrabajoDto,
        nuevoPrecio: number,
    ): Promise<OrdenTrabajo> {
        // verificar si se proporcionó fecha, si no usar la fecha actual
        const fechaCreacion: string = createOrdenTrabajoDto.fecha ?? new Date().toISOString().split('T')[0];
        const datosConFecha = {
            ...createOrdenTrabajoDto,
            fecha: fechaCreacion,
        };

        return await this.dataSource.transaction(async (manager) => {
            const ordenRepository = manager.getRepository(OrdenTrabajo);
            const servicioRepository = manager.getRepository(Servicio);

            // primer cambio: crear la orden de trabajo dentro de la transaccion
            const orden = ordenRepository.create(datosConFecha);
            const ordenGuardada = await ordenRepository.save(orden);

            // buscar el servicio con el id proporcionado (si no existe, falla)
            const servicio = await servicioRepository.findOne({
                where: { id: createOrdenTrabajoDto.servicioId },
            });

            // verificar que el servicio exista, si no lanzar error para rollback
            if (!servicio) {
                throw new NotFoundException('No existe el servicio con id ' + createOrdenTrabajoDto.servicioId);
            }

            servicio.precio = nuevoPrecio;
            await servicioRepository.save(servicio);

            return ordenGuardada;
        });
    }
}
