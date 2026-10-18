import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity.js';
import { ClienteService } from './cliente.service.js';
import { ClienteController } from './cliente.controller.js';

@Module({
    imports: [TypeOrmModule.forFeature([Cliente])],
    controllers: [ClienteController],
    providers: [ClienteService],
})
export class ClienteModule {}
