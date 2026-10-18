import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Vehiculo } from '../../vehiculo/entities/vehiculo.entity.js';
import { Mecanico } from '../../mecanico/entities/mecanico.entity.js';
import { Servicio } from '../../servicio/entities/servicio.entity.js';

@Entity({ name: 'orden_trabajo', schema: 'public' })
export class OrdenTrabajo {

    @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
    id: number;

    @Column({ type: 'date' })
    fecha: string;

    @Column({ type: 'integer', name: 'vehiculo_id' })
    vehiculoId: number;

    @Column({ type: 'integer', name: 'mecanico_id' })
    mecanicoId: number;

    @Column({ type: 'integer', name: 'servicio_id' })
    servicioId: number;

    @ManyToOne(() => Vehiculo, (vehiculo) => vehiculo.ordenesTrabajo)
    @JoinColumn({ name: 'vehiculo_id' })
    vehiculo: Vehiculo;

    @ManyToOne(() => Mecanico, (mecanico) => mecanico.ordenesTrabajo)
    @JoinColumn({ name: 'mecanico_id' })
    mecanico: Mecanico;

    @ManyToOne(() => Servicio, (servicio) => servicio.ordenesTrabajo)
    @JoinColumn({ name: 'servicio_id' })
    servicio: Servicio;
}
