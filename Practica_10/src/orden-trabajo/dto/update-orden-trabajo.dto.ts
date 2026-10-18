import { IsInt, IsISO8601, IsOptional } from 'class-validator';

export class UpdateOrdenTrabajoDto {

    @IsOptional()
    @IsISO8601()
    fecha?: string;

    @IsOptional()
    @IsInt()
    vehiculoId?: number;

    @IsOptional()
    @IsInt()
    mecanicoId?: number;

    @IsOptional()
    @IsInt()
    servicioId?: number;
}
