import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrdenTrabajo } from '../../orden-trabajo/entities/orden-trabajo.entity.js';

@Entity({ name: 'servicio', schema: 'public' })
export class Servicio {

    @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
    id: number;

    @Column({ type: 'varchar', length: 100 })
    nombre: string;

    @Column({ type: 'numeric', precision: 10, scale: 2 })
    precio: number;

    @OneToMany(() => OrdenTrabajo, (ordenTrabajo) => ordenTrabajo.servicio)
    ordenesTrabajo: OrdenTrabajo[];
}
