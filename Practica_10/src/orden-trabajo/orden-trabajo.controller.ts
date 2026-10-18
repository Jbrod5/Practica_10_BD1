import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
} from '@nestjs/common';
import { OrdenTrabajoService } from './orden-trabajo.service.js';
import { CreateOrdenTrabajoDto } from './dto/create-orden-trabajo.dto.js';
import { UpdateOrdenTrabajoDto } from './dto/update-orden-trabajo.dto.js';

@Controller('orden-trabajo')
export class OrdenTrabajoController {

    constructor(private readonly ordenTrabajoService: OrdenTrabajoService) {}

    /**
     * Crear una nueva orden de trabajo.
     * @param createOrdenTrabajoDto Datos de la orden a crear.
     * @returns La orden creada.
     */
    @Post()
    create(@Body() createOrdenTrabajoDto: CreateOrdenTrabajoDto) {
        return this.ordenTrabajoService.create(createOrdenTrabajoDto);
    }

    /**
     * Obtener todas las ordenes de trabajo.
     * @returns Lista de todas las ordenes.
     */
    @Get()
    findAll() {
        return this.ordenTrabajoService.findAll();
    }

    /**
     * Obtener todas las ordenes con sus relaciones (vehiculo, mecanico, servicio).
     * @returns Ordenes con datos completos de sus relaciones.
     */
    @Get('detalle')
    findConRelaciones() {
        return this.ordenTrabajoService.findConRelaciones();
    }

    /**
     * Buscar ordenes por mecanico con QueryBuilder.
     * @param mecanicoId Identificador del mecanico a filtrar.
     * @returns Ordenes del mecanico ordenadas por fecha descendente.
     */
    @Get('buscar')
    buscarPorMecanico(@Query('mecanicoId') mecanicoId: string) {
        return this.ordenTrabajoService.buscarPorMecanico(+mecanicoId);
    }

    /**
     * Crear una orden y actualizar el precio del servicio en una transaccion.
     * @param createOrdenTrabajoDto Datos de la orden a crear.
     * @param nuevoPrecio Nuevo precio para el servicio asociado.
     * @returns La orden creada.
     */
    @Post('transaccion')
    crearOrdenConTransaccion(
        @Body() createOrdenTrabajoDto: CreateOrdenTrabajoDto,
        @Query('nuevoPrecio') nuevoPrecio: string,
    ) {
        return this.ordenTrabajoService.crearOrdenConTransaccion(
            createOrdenTrabajoDto,
            +nuevoPrecio,
        );
    }

    /**
     * Buscar una orden de trabajo por su id.
     * @param id Identificador de la orden.
     * @returns La orden encontrada.
     */
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.ordenTrabajoService.findOne(+id);
    }

    /**
     * Actualizar una orden de trabajo existente.
     * @param id Identificador de la orden a actualizar.
     * @param updateOrdenTrabajoDto Nuevos datos de la orden.
     * @returns La orden actualizada.
     */
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateOrdenTrabajoDto: UpdateOrdenTrabajoDto) {
        return this.ordenTrabajoService.update(+id, updateOrdenTrabajoDto);
    }

    /**
     * Eliminar una orden de trabajo por su id.
     * @param id Identificador de la orden a eliminar.
     */
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.ordenTrabajoService.remove(+id);
    }
}
