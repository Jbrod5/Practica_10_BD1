import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehiculo } from './entities/vehiculo.entity.js';
import { VehiculoService } from './vehiculo.service.js';
import { VehiculoController } from './vehiculo.controller.js';

@Module({
    imports: [TypeOrmModule.forFeature([Vehiculo])],
    controllers: [VehiculoController],
    providers: [VehiculoService],
})
export class VehiculoModule {}
