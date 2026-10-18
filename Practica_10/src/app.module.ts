import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteModule } from './cliente/cliente.module.js';
import { MecanicoModule } from './mecanico/mecanico.module.js';
import { ServicioModule } from './servicio/servicio.module.js';
import { VehiculoModule } from './vehiculo/vehiculo.module.js';
import { OrdenTrabajoModule } from './orden-trabajo/orden-trabajo.module.js';
import { Cliente } from './cliente/entities/cliente.entity.js';
import { Mecanico } from './mecanico/entities/mecanico.entity.js';
import { Servicio } from './servicio/entities/servicio.entity.js';
import { Vehiculo } from './vehiculo/entities/vehiculo.entity.js';
import { OrdenTrabajo } from './orden-trabajo/entities/orden-trabajo.entity.js';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: Number(process.env.DB_PORT ?? 5432),
      username: process.env.DB_USER ?? 'postgres',
      password: process.env.DB_PASS ?? 'password',
      database: process.env.DB_NAME ?? 'taller_mecanico',
      entities: [Cliente, Mecanico, Servicio, Vehiculo, OrdenTrabajo],
      synchronize: true,
      logging: true,
    }),
    ClienteModule,
    MecanicoModule,
    ServicioModule,
    VehiculoModule,
    OrdenTrabajoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
