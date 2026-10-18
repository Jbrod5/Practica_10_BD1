import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import type { Relation } from 'typeorm';
import { OrdenTrabajo } from '../../orden-trabajo/entities/orden-trabajo.entity.js';

@Entity({ name: 'servicio', schema: 'public' })
export class Servicio {

    @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
    id: number;

    @Column({ type: 'varchar', length: 100 })
    nombre: string;

    @Column({ type: 'numeric', precision: 10, scale: 2 })
    precio: number;

    // usar Relation para evitar imports circulares entre entidades
    @OneToMany(() => OrdenTrabajo, (ordenTrabajo) => ordenTrabajo.servicio)
    ordenesTrabajo: Relation<OrdenTrabajo[]>;
}
