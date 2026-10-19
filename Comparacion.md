# Comparacion de SQL generado vs SQL a mano

## 1. Listar todas las ordenes

| SQL generado por TypeORM | SQL a mano |
|-------------------------|------------|
| SELECT "OrdenTrabajo"."id" AS "OrdenTrabajo_id", "OrdenTrabajo"."fecha" AS "OrdenTrabajo_fecha", "OrdenTrabajo"."vehiculo_id" AS "OrdenTrabajo_vehiculo_id", "OrdenTrabajo"."mecanico_id" AS "OrdenTrabajo_mecanico_id", "OrdenTrabajo"."servicio_id" AS "OrdenTrabajo_servicio_id" FROM "public"."orden_trabajo" "OrdenTrabajo" | SELECT id, fecha, vehiculo_id, mecanico_id, servicio_id FROM orden_trabajo; |

## 2. Buscar una orden por ID

| SQL generado por TypeORM | SQL a mano |
|-------------------------|------------|
| SELECT "OrdenTrabajo"."id" AS "OrdenTrabajo_id", "OrdenTrabajo"."fecha" AS "OrdenTrabajo_fecha", "OrdenTrabajo"."vehiculo_id" AS "OrdenTrabajo_vehiculo_id", "OrdenTrabajo"."mecanico_id" AS "OrdenTrabajo_mecanico_id", "OrdenTrabajo"."servicio_id" AS "OrdenTrabajo_servicio_id" FROM "public"."orden_trabajo" "OrdenTrabajo" WHERE (("OrdenTrabajo"."id" = $1)) LIMIT 1 PARAMETERS: [1] | SELECT id, fecha, vehiculo_id, mecanico_id, servicio_id FROM orden_trabajo WHERE id = 1; |

## 3. Crear una orden

| SQL generado por TypeORM | SQL a mano |
|-------------------------|------------|
| START TRANSACTION; INSERT INTO "public"."orden_trabajo" ("fecha", "vehiculo_id", "mecanico_id", "servicio_id") VALUES ($1, $2, $3, $4) RETURNING "id" PARAMETERS: ["2026-10-18", 1, 1, 1]; COMMIT; | INSERT INTO orden_trabajo (fecha, vehiculo_id, mecanico_id, servicio_id) VALUES ('2026-10-18', 1, 1, 1) RETURNING id; |

## 4. Actualizar una orden

| SQL generado por TypeORM | SQL a mano |
|-------------------------|------------|
| SELECT "OrdenTrabajo"."id" AS "OrdenTrabajo_id" FROM "public"."orden_trabajo" "OrdenTrabajo" WHERE (("OrdenTrabajo"."id" = $1)) LIMIT 1 PARAMETERS: [1]; UPDATE "public"."orden_trabajo" SET "fecha" = $1 WHERE "id" = $2 PARAMETERS: ["2026-11-01", 1] | UPDATE orden_trabajo SET fecha = '2026-11-01' WHERE id = 1; |

## 5. Eliminar una orden

| SQL generado por TypeORM | SQL a mano |
|-------------------------|------------|
| SELECT "OrdenTrabajo"."id" AS "OrdenTrabajo_id" FROM "public"."orden_trabajo" "OrdenTrabajo" WHERE (("OrdenTrabajo"."id" = $1)) LIMIT 1 PARAMETERS: [3]; DELETE FROM "public"."orden_trabajo" WHERE "id" = $1 PARAMETERS: [3] | DELETE FROM orden_trabajo WHERE id = 3; |

## 6. Buscar una orden inexistente (Prueba de error 404)

| SQL generado por TypeORM | SQL a mano |
|-------------------------|------------|
| SELECT "OrdenTrabajo"."id" AS "OrdenTrabajo_id" FROM "public"."orden_trabajo" "OrdenTrabajo" WHERE (("OrdenTrabajo"."id" = $1)) LIMIT 1 PARAMETERS: [999] | SELECT id, fecha, vehiculo_id, mecanico_id, servicio_id FROM orden_trabajo WHERE id = 999; |

## 7. Endpoint con relaciones (relations)

| SQL generado por TypeORM | SQL a mano |
|-------------------------|------------|
| SELECT "OrdenTrabajo"."id" AS "OrdenTrabajo_id", "OrdenTrabajo"."fecha" AS "OrdenTrabajo_fecha", "OrdenTrabajo_OrdenTrabajo_vehiculo"."placa" AS "OrdenTrabajo_OrdenTrabajo_vehiculo_placa", "OrdenTrabajo_OrdenTrabajo_mecanico"."nombre" AS "OrdenTrabajo_OrdenTrabajo_mecanico_nombre", "OrdenTrabajo_OrdenTrabajo_servicio"."precio" AS "OrdenTrabajo_OrdenTrabajo_servicio_precio" FROM "public"."orden_trabajo" "OrdenTrabajo" LEFT JOIN "public"."vehiculo" "OrdenTrabajo_OrdenTrabajo_vehiculo" ON "OrdenTrabajo_OrdenTrabajo_vehiculo"."id"="OrdenTrabajo"."vehiculo_id" LEFT JOIN "public"."mecanico" "OrdenTrabajo_OrdenTrabajo_mecanico" ON "OrdenTrabajo_OrdenTrabajo_mecanico"."id"="OrdenTrabajo"."mecanico_id" LEFT JOIN "public"."servicio" "OrdenTrabajo_OrdenTrabajo_servicio" ON "OrdenTrabajo_OrdenTrabajo_servicio"."id"="OrdenTrabajo"."servicio_id" | SELECT ot.id, ot.fecha, ot.vehiculo_id, ot.mecanico_id, ot.servicio_id, v.placa, v.marca, v.modelo, m.nombre AS mecanico_nombre, m.especialidad, s.nombre AS servicio_nombre, s.precio FROM orden_trabajo ot LEFT JOIN vehiculo v ON v.id = ot.vehiculo_id LEFT JOIN mecanico m ON m.id = ot.mecanico_id LEFT JOIN servicio s ON s.id = ot.servicio_id; |

## 8. Prueba de Query Builder

| SQL generado por TypeORM | SQL a mano |
|-------------------------|------------|
| SELECT "orden"."id" AS "orden_id", "vehiculo"."placa" AS "vehiculo_placa", "mecanico"."nombre" AS "mecanico_nombre", "servicio"."precio" AS "servicio_precio" FROM "public"."orden_trabajo" "orden" INNER JOIN "public"."vehiculo" "vehiculo" ON "vehiculo"."id"="orden"."vehiculo_id" INNER JOIN "public"."mecanico" "mecanico" ON "mecanico"."id"="orden"."mecanico_id" INNER JOIN "public"."servicio" "servicio" ON "servicio"."id"="orden"."servicio_id" WHERE "mecanico"."id" = $1 ORDER BY "orden"."fecha" DESC PARAMETERS: [1] | SELECT ot.id, ot.fecha, ot.vehiculo_id, ot.mecanico_id, ot.servicio_id, v.placa, v.marca, v.modelo, m.nombre AS mecanico_nombre, m.especialidad, s.nombre AS servicio_nombre, s.precio FROM orden_trabajo ot INNER JOIN vehiculo v ON v.id = ot.vehiculo_id INNER JOIN mecanico m ON m.id = ot.mecanico_id INNER JOIN servicio s ON s.id = ot.servicio_id WHERE m.id = 1 ORDER BY ot.fecha DESC; |

## 9. Transaccion exitosa

| SQL generado por TypeORM | SQL a mano |
|-------------------------|------------|
| START TRANSACTION; INSERT INTO "public"."orden_trabajo" ("fecha", "vehiculo_id", "mecanico_id", "servicio_id") VALUES ($1, $2, $3, $4) RETURNING "id" PARAMETERS: ["2026-10-18", 1, 1, 1]; SELECT "Servicio"."id" FROM "public"."servicio" "Servicio" WHERE (("Servicio"."id" = $1)) LIMIT 1 PARAMETERS: [1]; UPDATE "public"."servicio" SET "precio" = $1 WHERE "id" = $2 PARAMETERS: [300, 1]; COMMIT; | START TRANSACTION; INSERT INTO orden_trabajo (fecha, vehiculo_id, mecanico_id, servicio_id) VALUES ('2026-10-18', 1, 1, 1) RETURNING id; UPDATE servicio SET precio = 300 WHERE id = 1; COMMIT; |

## 10. Transaccion fallida (Rollback)

| SQL generado por TypeORM | SQL a mano |
|-------------------------|------------|
| START TRANSACTION; INSERT INTO "public"."orden_trabajo" ("fecha", "vehiculo_id", "mecanico_id", "servicio_id") VALUES ($1, $2, $3, $4) RETURNING "id" PARAMETERS: ["2026-10-18", 1, 1, 1]; UPDATE "public"."servicio" SET "precio" = $1 WHERE "id" = $2 PARAMETERS: [300, 999]; ROLLBACK; | START TRANSACTION; INSERT INTO orden_trabajo (fecha, vehiculo_id, mecanico_id, servicio_id) VALUES ('2026-10-18', 1, 1, 1) RETURNING id; UPDATE servicio SET precio = 300 WHERE id = 999; ROLLBACK; |

**Explicacion:** En la transaccion fallida, el INSERT usa un servicio_id valido (1) para que el primer cambio sea exitoso. El UPDATE intenta modificar un servicio inexistente (999). Como no afecta ninguna fila, se lanza un error que provoca el ROLLBACK, demostrando que el primer cambio tampoco quedo guardado.
