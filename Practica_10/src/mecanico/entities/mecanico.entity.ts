import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrdenTrabajo } from '../../orden-trabajo/entities/orden-trabajo.entity.js';

@Entity({ name: 'mecanico', schema: 'public' })
export class Mecanico {

    @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
    id: number;

    @Column({ type: 'varchar', length: 100 })
    nombre: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    especialidad: string;

    @OneToMany(() => OrdenTrabajo, (ordenTrabajo) => ordenTrabajo.mecanico)
    ordenesTrabajo: OrdenTrabajo[];
}
