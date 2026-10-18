import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mecanico } from './entities/mecanico.entity.js';
import { MecanicoService } from './mecanico.service.js';
import { MecanicoController } from './mecanico.controller.js';

@Module({
    imports: [TypeOrmModule.forFeature([Mecanico])],
    controllers: [MecanicoController],
    providers: [MecanicoService],
})
export class MecanicoModule {}
