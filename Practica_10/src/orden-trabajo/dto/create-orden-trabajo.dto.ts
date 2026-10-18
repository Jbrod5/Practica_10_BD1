import { IsInt, IsISO8601, IsOptional } from 'class-validator';

export class CreateOrdenTrabajoDto {

    @IsOptional()
    @IsISO8601()
    fecha?: string;

    @IsInt()
    vehiculoId: number;

    @IsInt()
    mecanicoId: number;

    @IsInt()
    servicioId: number;
}
