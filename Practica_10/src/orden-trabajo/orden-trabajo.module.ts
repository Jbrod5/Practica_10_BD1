import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdenTrabajo } from './entities/orden-trabajo.entity.js';
import { OrdenTrabajoService } from './orden-trabajo.service.js';
import { OrdenTrabajoController } from './orden-trabajo.controller.js';

@Module({
    imports: [TypeOrmModule.forFeature([OrdenTrabajo])],
    controllers: [OrdenTrabajoController],
    providers: [OrdenTrabajoService],
})
export class OrdenTrabajoModule {}
