import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Servicio } from './entities/servicio.entity.js';
import { ServicioService } from './servicio.service.js';
import { ServicioController } from './servicio.controller.js';

@Module({
    imports: [TypeOrmModule.forFeature([Servicio])],
    controllers: [ServicioController],
    providers: [ServicioService],
})
export class ServicioModule {}
