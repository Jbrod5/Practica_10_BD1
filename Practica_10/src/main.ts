import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module.js';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // validar que los datos de entrada cumplan las reglas de los dto
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
        }),
    );

    // puerto asignado: 3000 + 82 del carne
    await app.listen(process.env.PORT ?? 3082);
}
void bootstrap();
