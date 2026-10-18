import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import type { Relation } from 'typeorm';
import { Cliente } from '../../cliente/entities/cliente.entity.js';
import { OrdenTrabajo } from '../../orden-trabajo/entities/orden-trabajo.entity.js';

@Entity({ name: 'vehiculo', schema: 'public' })
export class Vehiculo {

    @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
    id: number;

    @Column({ type: 'varchar', length: 10 })
    placa: string;

    @Column({ type: 'varchar', length: 50 })
    marca: string;

    @Column({ type: 'varchar', length: 50 })
    modelo: string;

    @Column({ type: 'integer', name: 'cliente_id' })
    clienteId: number;

    // usar Relation para evitar imports circulares entre entidades
    @ManyToOne(() => Cliente, (cliente) => cliente.vehiculos)
    @JoinColumn({ name: 'cliente_id' })
    cliente: Relation<Cliente>;

    @OneToMany(() => OrdenTrabajo, (ordenTrabajo) => ordenTrabajo.vehiculo)
    ordenesTrabajo: Relation<OrdenTrabajo[]>;
}
