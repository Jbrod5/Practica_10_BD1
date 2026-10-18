import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Vehiculo } from '../../vehiculo/entities/vehiculo.entity.js';

@Entity({ name: 'cliente', schema: 'public' })
export class Cliente {

    @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
    id: number;

    @Column({ type: 'varchar', length: 100 })
    nombre: string;

    @Column({ type: 'varchar', length: 15, nullable: true })
    telefono: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    correo: string;

    @OneToMany(() => Vehiculo, (vehiculo) => vehiculo.cliente)
    vehiculos: Vehiculo[];
}
