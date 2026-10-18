# Practica 10 - Bases de Datos 1

Proyecto del laboratorio de Sistemas de Bases de Datos 1, Ing. Bryan Rene Gomez Gomez.

## Integrante

Jorge Anibal Bravo Rodriguez - Carnet 202131782

## Carpetas del repositorio

### Practica_7
Base de datos taller_mecanico con sus scripts SQL (DDL, DML) y el archivo docker.sh para levantar PostgreSQL en un contenedor.

### Practica_10
API REST desarrollada con NestJS y TypeORM que se conecta a la base de datos taller_mecanico. Incluye CRUD completo de entidades, consultas con relations, QueryBuilder y transacciones.

## Requisitos previos

- Node.js 24 LTS
- npm 11.x
- PostgreSQL corriendo en Docker (contenedor postgres-lab-practica-7)

## Como levantar la base de datos

Ejecutar el script docker.sh para crear y levantar el contenedor de PostgreSQL:

```bash
sudo docker run --name postgres-lab-practica-7 \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=tu_password \
  -e POSTGRES_DB=taller_mecanico \
  -p 5432:5432 \
  -d postgres:15
```

Luego ejecutar los scripts SQL en orden:

```bash
sudo docker exec -i postgres-lab-practica-7 psql -U postgres -d taller_mecanico < Practica_7/ddl.sql
sudo docker exec -i postgres-lab-practica-7 psql -U postgres -d taller_mecanico < Practica_7/dml.sql
```

## Credenciales de la base de datos

- Host: localhost
- Puerto: 5432
- Usuario: postgres
- Contrasena: tu_password
- Base de datos: taller_mecanico

## Como correr el proyecto en otra computadora

1. Clonar el repositorio
2. Instalar las dependencias:

```bash
cd Practica_10
npm install
```

3. Asegurar que PostgreSQL este corriendo en localhost:5432 con la base taller_mecanico
4. Iniciar el servidor en modo desarrollo:

```bash
npm run start:dev
```

5. La API estara disponible en: http://localhost:3082

## Comandos disponibles

| Comando | Descripcion |
|---------|-------------|
| npm run start | Iniciar en modo produccion |
| npm run start:dev | Iniciar en modo desarrollo con recarga automatica |
| npm run build | Compilar el proyecto a JavaScript |
| npm run start:prod | Iniciar la version compilada |

## Endpoints de la API

| Metodo | URL | Descripcion |
|--------|-----|-------------|
| GET | /orden-trabajo | Listar todas las ordenes |
| GET | /orden-trabajo/:id | Buscar una orden por id |
| POST | /orden-trabajo | Crear una orden |
| PATCH | /orden-trabajo/:id | Actualizar una orden |
| DELETE | /orden-trabajo/:id | Eliminar una orden |
| GET | /orden-trabajo/detalle | Ordenes con relaciones |
| GET | /orden-trabajo/buscar?mecanicoId=X | QueryBuilder con filtro y orden |
| POST | /orden-trabajo/transaccion?nuevoPrecio=X | Transaccion exitosa |
| POST | /orden-trabajo/transaccion-fallida?servicioInexistenteId=X&nuevoPrecio=X | Transaccion fallida con rollback |

## Comparacion de SQL generado vs SQL a mano

### 1. Listar tordenes

| SQL generado por TypeORM | SQL a mano |
|-------------------------|------------|
| SELECT "OrdenTrabajo"."id" AS "OrdenTrabajo_id", "OrdenTrabajo"."fecha" AS "OrdenTrabajo_fecha", "OrdenTrabajo"."vehiculo_id" AS "OrdenTrabajo_vehiculo_id", "OrdenTrabajo"."mecanico_id" AS "OrdenTrabajo_mecanico_id", "OrdenTrabajo"."servicio_id" AS "OrdenTrabajo_servicio_id" FROM "public"."orden_trabajo" "OrdenTrabajo" | SELECT id, fecha, vehiculo_id, mecanico_id, servicio_id FROM orden_trabajo; |

### 2. Buscar una orden por ID

| SQL generado por TypeORM | SQL a mano |
|-------------------------|------------|
| SELECT "OrdenTrabajo"."id" AS "OrdenTrabajo_id", "OrdenTrabajo"."fecha" AS "OrdenTrabajo_fecha", "OrdenTrabajo"."vehiculo_id" AS "OrdenTrabajo_vehiculo_id", "OrdenTrabajo"."mecanico_id" AS "OrdenTrabajo_mecanico_id", "OrdenTrabajo"."servicio_id" AS "OrdenTrabajo_servicio_id" FROM "public"."orden_trabajo" "OrdenTrabajo" WHERE (("OrdenTrabajo"."id" = $1)) LIMIT 1 PARAMETERS: [1] | SELECT id, fecha, vehiculo_id, mecanico_id, servicio_id FROM orden_trabajo WHERE id = 1; |

### 3. Crear una orden

| SQL generado por TypeORM | SQL a mano |
|-------------------------|------------|
| START TRANSACTION; INSERT INTO "public"."orden_trabajo" ("fecha", "vehiculo_id", "mecanico_id", "servicio_id") VALUES ($1, $2, $3, $4) RETURNING "id" PARAMETERS: ["2026-10-18", 1, 1, 1]; COMMIT; | INSERT INTO orden_trabajo (fecha, vehiculo_id, mecanico_id, servicio_id) VALUES ('2026-10-18', 1, 1, 1) RETURNING id; |

### 4. Actualizar una orden

| SQL generado por TypeORM | SQL a mano |
|-------------------------|------------|
| SELECT "OrdenTrabajo"."id" AS "OrdenTrabajo_id" FROM "public"."orden_trabajo" "OrdenTrabajo" WHERE (("OrdenTrabajo"."id" = $1)) LIMIT 1 PARAMETERS: [1]; UPDATE "public"."orden_trabajo" SET "fecha" = $1 WHERE "id" = $2 PARAMETERS: ["2026-11-01", 1] | UPDATE orden_trabajo SET fecha = '2026-11-01' WHERE id = 1; |

### 5. Eliminar una orden

| SQL generado por TypeORM | SQL a mano |
|-------------------------|------------|
| SELECT "OrdenTrabajo"."id" AS "OrdenTrabajo_id" FROM "public"."orden_trabajo" "OrdenTrabajo" WHERE (("OrdenTrabajo"."id" = $1)) LIMIT 1 PARAMETERS: [3]; DELETE FROM "public"."orden_trabajo" WHERE "id" = $1 PARAMETERS: [3] | DELETE FROM orden_trabajo WHERE id = 3; |

### 6. Buscar una orden inexistente (Prueba de error 404)

| SQL generado por TypeORM | SQL a mano |
|-------------------------|------------|
| SELECT "OrdenTrabajo"."id" AS "OrdenTrabajo_id" FROM "public"."orden_trabajo" "OrdenTrabajo" WHERE (("OrdenTrabajo"."id" = $1)) LIMIT 1 PARAMETERS: [999] | SELECT id, fecha, vehiculo_id, mecanico_id, servicio_id FROM orden_trabajo WHERE id = 999; |

### 7. Endpoint con relaciones (relations)

| SQL generado por TypeORM | SQL a mano |
|-------------------------|------------|
| SELECT "OrdenTrabajo"."id" AS "OrdenTrabajo_id", "OrdenTrabajo"."fecha" AS "OrdenTrabajo_fecha", "OrdenTrabajo_OrdenTrabajo_vehiculo"."placa" AS "OrdenTrabajo_OrdenTrabajo_vehiculo_placa", "OrdenTrabajo_OrdenTrabajo_mecanico"."nombre" AS "OrdenTrabajo_OrdenTrabajo_mecanico_nombre", "OrdenTrabajo_OrdenTrabajo_servicio"."precio" AS "OrdenTrabajo_OrdenTrabajo_servicio_precio" FROM "public"."orden_trabajo" "OrdenTrabajo" LEFT JOIN "public"."vehiculo" "OrdenTrabajo_OrdenTrabajo_vehiculo" ON "OrdenTrabajo_OrdenTrabajo_vehiculo"."id"="OrdenTrabajo"."vehiculo_id" LEFT JOIN "public"."mecanico" "OrdenTrabajo_OrdenTrabajo_mecanico" ON "OrdenTrabajo_OrdenTrabajo_mecanico"."id"="OrdenTrabajo"."mecanico_id" LEFT JOIN "public"."servicio" "OrdenTrabajo_OrdenTrabajo_servicio" ON "OrdenTrabajo_OrdenTrabajo_servicio"."id"="OrdenTrabajo"."servicio_id" | SELECT ot.id, ot.fecha, ot.vehiculo_id, ot.mecanico_id, ot.servicio_id, v.placa, v.marca, v.modelo, m.nombre AS mecanico_nombre, m.especialidad, s.nombre AS servicio_nombre, s.precio FROM orden_trabajo ot LEFT JOIN vehiculo v ON v.id = ot.vehiculo_id LEFT JOIN mecanico m ON m.id = ot.mecanico_id LEFT JOIN servicio s ON s.id = ot.servicio_id; |

### 8. Prueba de Query Builder

| SQL generado por TypeORM | SQL a mano |
|-------------------------|------------|
| SELECT "orden"."id" AS "orden_id", "vehiculo"."placa" AS "vehiculo_placa", "mecanico"."nombre" AS "mecanico_nombre", "servicio"."precio" AS "servicio_precio" FROM "public"."orden_trabajo" "orden" INNER JOIN "public"."vehiculo" "vehiculo" ON "vehiculo"."id"="orden"."vehiculo_id" INNER JOIN "public"."mecanico" "mecanico" ON "mecanico"."id"="orden"."mecanico_id" INNER JOIN "public"."servicio" "servicio" ON "servicio"."id"="orden"."servicio_id" WHERE "mecanico"."id" = $1 ORDER BY "orden"."fecha" DESC PARAMETERS: [1] | SELECT ot.id, ot.fecha, ot.vehiculo_id, ot.mecanico_id, ot.servicio_id, v.placa, v.marca, v.modelo, m.nombre AS mecanico_nombre, m.especialidad, s.nombre AS servicio_nombre, s.precio FROM orden_trabajo ot INNER JOIN vehiculo v ON v.id = ot.vehiculo_id INNER JOIN mecanico m ON m.id = ot.mecanico_id INNER JOIN servicio s ON s.id = ot.servicio_id WHERE m.id = 1 ORDER BY ot.fecha DESC; |

### 9. Transaccion exitosa

| SQL generado por TypeORM | SQL a mano |
|-------------------------|------------|
| START TRANSACTION; INSERT INTO "public"."orden_trabajo" ("fecha", "vehiculo_id", "mecanico_id", "servicio_id") VALUES ($1, $2, $3, $4) RETURNING "id" PARAMETERS: ["2026-10-18", 1, 1, 1]; SELECT "Servicio"."id" FROM "public"."servicio" "Servicio" WHERE (("Servicio"."id" = $1)) LIMIT 1 PARAMETERS: [1]; UPDATE "public"."servicio" SET "precio" = $1 WHERE "id" = $2 PARAMETERS: [300, 1]; COMMIT; | START TRANSACTION; INSERT INTO orden_trabajo (fecha, vehiculo_id, mecanico_id, servicio_id) VALUES ('2026-10-18', 1, 1, 1) RETURNING id; UPDATE servicio SET precio = 300 WHERE id = 1; COMMIT; |

### 10. Transaccion fallida (Rollback)

| SQL generado por TypeORM | SQL a mano |
|-------------------------|------------|
| START TRANSACTION; INSERT INTO "public"."orden_trabajo" ("fecha", "vehiculo_id", "mecanico_id", "servicio_id") VALUES ($1, $2, $3, $4) RETURNING "id" PARAMETERS: ["2026-10-18", 1, 1, 1]; UPDATE "public"."servicio" SET "precio" = $1 WHERE "id" = $2 PARAMETERS: [300, 999]; ROLLBACK; | START TRANSACTION; INSERT INTO orden_trabajo (fecha, vehiculo_id, mecanico_id, servicio_id) VALUES ('2026-10-18', 1, 1, 1) RETURNING id; UPDATE servicio SET precio = 300 WHERE id = 999; ROLLBACK; |

**Explicacion:** En la transaccion fallida, el INSERT usa un servicio_id valido (1) para que el primer cambio sea exitoso. El UPDATE intenta modificar un servicio inexistente (999). Como no afecta ninguna fila, se lanza un error que provoca el ROLLBACK, demostrando que el primer cambio tampoco quedo guardado.

## Resumen de evidencia

| Operacion | Puerto | URL | SQL generado |
|-----------|--------|-----|--------------|
| Listar todas | 3082 | http://localhost:3082/orden-trabajo | SELECT * FROM orden_trabajo |
| Buscar por id | 3082 | http://localhost:3082/orden-trabajo/1 | SELECT * WHERE id = 1 |
| Crear | 3082 | http://localhost:3082/orden-trabajo (POST) | INSERT INTO orden_trabajo |
| Actualizar | 3082 | http://localhost:3082/orden-trabajo/1 (PATCH) | UPDATE orden_trabajo |
| Eliminar | 3082 | http://localhost:3082/orden-trabajo/3 (DELETE) | DELETE FROM orden_trabajo |
| Con relations | 3082 | http://localhost:3082/orden-trabajo/detalle | LEFT JOIN vehiculo, mecanico, servicio |
| QueryBuilder | 3082 | http://localhost:3082/orden-trabajo/buscar?mecanicoId=1 | INNER JOIN + WHERE + ORDER BY |
| Transaccion | 3082 | http://localhost:3082/orden-trabajo/transaccion?nuevoPrecio=300 | START TRANSACTION + INSERT + UPDATE + COMMIT |
| Transaccion fallida | 3082 | http://localhost:3082/orden-trabajo/transaccion-fallida?servicioInexistenteId=999&nuevoPrecio=300 | START TRANSACTION + INSERT + UPDATE + ROLLBACK |
