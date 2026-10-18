# Evidencia Ejercicio 10 - SQL del log vs SQL a mano

## 1. CRUD de orden_trabajo

### GET /orden-trabajo (listar todas)

**SQL generado por TypeORM (log):**
```sql
SELECT "OrdenTrabajo"."id" AS "OrdenTrabajo_id", "OrdenTrabajo"."fecha" AS "OrdenTrabajo_fecha", "OrdenTrabajo"."vehiculo_id" AS "OrdenTrabajo_vehiculo_id", "OrdenTrabajo"."mecanico_id" AS "OrdenTrabajo_mecanico_id", "OrdenTrabajo"."servicio_id" AS "OrdenTrabajo_servicio_id" FROM "orden_trabajo" "OrdenTrabajo"
```

**SQL a mano:**
```sql
SELECT id, fecha, vehiculo_id, mecanico_id, servicio_id FROM orden_trabajo;
```

---

### GET /orden-trabajo/:id (buscar por id)

**SQL generado por TypeORM (log):**
```sql
SELECT "OrdenTrabajo"."id" AS "OrdenTrabajo_id", "OrdenTrabajo"."fecha" AS "OrdenTrabajo_fecha", "OrdenTrabajo"."vehiculo_id" AS "OrdenTrabajo_vehiculo_id", "OrdenTrabajo"."mecanico_id" AS "OrdenTrabajo_mecanico_id", "OrdenTrabajo"."servicio_id" AS "OrdenTrabajo_servicio_id" FROM "orden_trabajo" "OrdenTrabajo" WHERE "OrdenTrabajo"."id" = $1 -- PARAMETERS: [1]
```

**SQL a mano:**
```sql
SELECT id, fecha, vehiculo_id, mecanico_id, servicio_id FROM orden_trabajo WHERE id = 1;
```

---

### POST /orden-trabajo (crear)

**SQL generado por TypeORM (log):**
```sql
INSERT INTO "orden_trabajo"("fecha", "vehiculo_id", "mecanico_id", "servicio_id") VALUES ($1, $2, $3, $4) RETURNING "id" -- PARAMETERS: ["2026-10-18",1,1,1]
```

**SQL a mano:**
```sql
INSERT INTO orden_trabajo (fecha, vehiculo_id, mecanico_id, servicio_id) VALUES ('2026-10-18', 1, 1, 1) RETURNING id;
```

---

### PATCH /orden-trabajo/:id (actualizar)

**SQL generado por TypeORM (log):**
```sql
UPDATE "orden_trabajo" SET "fecha" = $1 WHERE "id" = $2 -- PARAMETERS: ["2026-10-20",1]
```

**SQL a mano:**
```sql
UPDATE orden_trabajo SET fecha = '2026-10-20' WHERE id = 1;
```

---

### DELETE /orden-trabajo/:id (eliminar)

**SQL generado por TypeORM (log):**
```sql
DELETE FROM "orden_trabajo" WHERE "id" = $1 -- PARAMETERS: [1]
```

**SQL a mano:**
```sql
DELETE FROM orden_trabajo WHERE id = 1;
```

---

## 2. Consulta con relations

### GET /orden-trabajo/detalle

**SQL generado por TypeORM (log):**
```sql
SELECT "OrdenTrabajo"."id" AS "OrdenTrabajo_id", "OrdenTrabajo"."fecha" AS "OrdenTrabajo_fecha", "OrdenTrabajo"."vehiculo_id" AS "OrdenTrabajo_vehiculo_id", "OrdenTrabajo"."mecanico_id" AS "OrdenTrabajo_mecanico_id", "OrdenTrabajo"."servicio_id" AS "OrdenTrabajo_servicio_id", "OrdenTrabajo__vehiculo"."id" AS "OrdenTrabajo__vehiculo_id", "OrdenTrabajo__vehiculo"."placa" AS "OrdenTrabajo__vehiculo_placa", "OrdenTrabajo__vehiculo"."marca" AS "OrdenTrabajo__vehiculo_marca", "OrdenTrabajo__vehiculo"."modelo" AS "OrdenTrabajo__vehiculo_modelo", "OrdenTrabajo__vehiculo"."cliente_id" AS "OrdenTrabajo__vehiculo_cliente_id", "OrdenTrabajo__mecanico"."id" AS "OrdenTrabajo__mecanico_id", "OrdenTrabajo__mecanico"."nombre" AS "OrdenTrabajo__mecanico_nombre", "OrdenTrabajo__mecanico"."especialidad" AS "OrdenTrabajo__mecanico_especialidad", "OrdenTrabajo__servicio"."id" AS "OrdenTrabajo__servicio_id", "OrdenTrabajo__servicio"."nombre" AS "OrdenTrabajo__servicio_nombre", "OrdenTrabajo__servicio"."precio" AS "OrdenTrabajo__servicio_precio" FROM "orden_trabajo" "OrdenTrabajo" LEFT JOIN "vehiculo" "OrdenTrabajo__vehiculo" ON "OrdenTrabajo__vehiculo"."id"="OrdenTrabajo"."vehiculo_id" LEFT JOIN "mecanico" "OrdenTrabajo__mecanico" ON "OrdenTrabajo__mecanico"."id"="OrdenTrabajo"."mecanico_id" LEFT JOIN "servicio" "OrdenTrabajo__servicio" ON "OrdenTrabajo__servicio"."id"="OrdenTrabajo"."servicio_id"
```

**SQL a mano:**
```sql
SELECT ot.id, ot.fecha, ot.vehiculo_id, ot.mecanico_id, ot.servicio_id,
       v.id AS vehiculo_id_full, v.placa, v.marca, v.modelo,
       m.id AS mecanico_id_full, m.nombre AS mecanico_nombre, m.especialidad,
       s.id AS servicio_id_full, s.nombre AS servicio_nombre, s.precio
FROM orden_trabajo ot
LEFT JOIN vehiculo v ON v.id = ot.vehiculo_id
LEFT JOIN mecanico m ON m.id = ot.mecanico_id
LEFT JOIN servicio s ON s.id = ot.servicio_id;
```

---

## 3. QueryBuilder con JOIN + filtro + orden

### GET /orden-trabajo/buscar?mecanicoId=1

**SQL generado por TypeORM (log):**
```sql
SELECT "orden"."id" AS "orden_id", "orden"."fecha" AS "orden_fecha", "orden"."vehiculo_id" AS "orden_vehiculo_id", "orden"."mecanico_id" AS "orden_mecanico_id", "orden"."servicio_id" AS "orden_servicio_id", "orden__vehiculo"."id" AS "orden__vehiculo_id", "orden__vehiculo"."placa" AS "orden__vehiculo_placa", "orden__vehiculo"."marca" AS "orden__vehiculo_marca", "orden__vehiculo"."modelo" AS "orden__vehiculo_modelo", "orden__vehiculo"."cliente_id" AS "orden__vehiculo_cliente_id", "orden__mecanico"."id" AS "orden__mecanico_id", "orden__mecanico"."nombre" AS "orden__mecanico_nombre", "orden__mecanico"."especialidad" AS "orden__mecanico_especialidad", "orden__servicio"."id" AS "orden__servicio_id", "orden__servicio"."nombre" AS "orden__servicio_nombre", "orden__servicio"."precio" AS "orden__servicio_precio" FROM "orden_trabajo" "orden" INNER JOIN "vehiculo" "orden__vehiculo" ON "orden__vehiculo"."id"="orden"."vehiculo_id" INNER JOIN "mecanico" "orden__mecanico" ON "orden__mecanico"."id"="orden"."mecanico_id" INNER JOIN "servicio" "orden__servicio" ON "orden__servicio"."id"="orden"."servicio_id" WHERE "orden__mecanico"."id" = $1 ORDER BY "orden"."fecha" DESC -- PARAMETERS: [1]
```

**SQL a mano:**
```sql
SELECT ot.id, ot.fecha, ot.vehiculo_id, ot.mecanico_id, ot.servicio_id,
       v.placa, v.marca, v.modelo,
       m.nombre AS mecanico_nombre, m.especialidad,
       s.nombre AS servicio_nombre, s.precio
FROM orden_trabajo ot
INNER JOIN vehiculo v ON v.id = ot.vehiculo_id
INNER JOIN mecanico m ON m.id = ot.mecanico_id
INNER JOIN servicio s ON s.id = ot.servicio_id
WHERE m.id = 1
ORDER BY ot.fecha DESC;
```

---

## 4. Transacción con dataSource.transaction

### POST /orden-trabajo/transaccion?nuevoPrecio=300

**SQL generado por TypeORM (log) - caso exitoso:**
```sql
START TRANSACTION;
INSERT INTO "orden_trabajo"("fecha", "vehiculo_id", "mecanico_id", "servicio_id") VALUES ($1, $2, $3, $4) RETURNING "id" -- PARAMETERS: ["2026-10-18",1,1,1]
UPDATE "servicio" SET "precio" = $1 WHERE "id" = $2 -- PARAMETERS: [300,1]
COMMIT;
```

**SQL a mano:**
```sql
START TRANSACTION;
INSERT INTO orden_trabajo (fecha, vehiculo_id, mecanico_id, servicio_id) VALUES ('2026-10-18', 1, 1, 1) RETURNING id;
UPDATE servicio SET precio = 300 WHERE id = 1;
COMMIT;
```

---

### POST /orden-trabajo/transaccion?nuevoPrecio=300 (caso con servicio inexistente - ROLLBACK)

**SQL generado por TypeORM (log) - caso fallido:**
```sql
START TRANSACTION;
INSERT INTO "orden_trabajo"("fecha", "vehiculo_id", "mecanico_id", "servicio_id") VALUES ($1, $2, $3, $4) RETURNING "id" -- PARAMETERS: ["2026-10-18",1,1,999]
ROLLBACK;
```

**SQL a mano:**
```sql
START TRANSACTION;
INSERT INTO orden_trabajo (fecha, vehiculo_id, mecanico_id, servicio_id) VALUES ('2026-10-18', 1, 1, 999) RETURNING id;
ROLLBACK;
```

**Explicacion:** Cuando el servicio_id no existe (999), el segundo cambio falla y TypeORM ejecuta ROLLBACK automaticamente. El INSERT de la orden de trabajo tampoco queda guardado, demostrando que la transaccion revierte todos los cambios.

---

## Resumen de evidencia

| Operacion | Puerto | URL | SQL generado |
|-----------|--------|-----|--------------|
| Listar todas | 3082 | http://localhost:3082/orden-trabajo | SELECT * FROM orden_trabajo |
| Buscar por id | 3082 | http://localhost:3082/orden-trabajo/1 | SELECT * WHERE id = 1 |
| Crear | 3082 | http://localhost:3082/orden-trabajo (POST) | INSERT INTO orden_trabajo |
| Actualizar | 3082 | http://localhost:3082/orden-trabajo/1 (PATCH) | UPDATE orden_trabajo |
| Eliminar | 3082 | http://localhost:3082/orden-trabajo/1 (DELETE) | DELETE FROM orden_trabajo |
| Con relations | 3082 | http://localhost:3082/orden-trabajo/detalle | LEFT JOIN vehiculo, mecanico, servicio |
| QueryBuilder | 3082 | http://localhost:3082/orden-trabajo/buscar?mecanicoId=1 | INNER JOIN + WHERE + ORDER BY |
| Transaccion | 3082 | http://localhost:3082/orden-trabajo/transaccion?nuevoPrecio=300 | START TRANSACTION + INSERT + UPDATE + COMMIT |
| Transaccion fallida | 3082 | http://localhost:3082/orden-trabajo/transaccion?nuevoPrecio=300 (servicioId=999) | START TRANSACTION + INSERT + ROLLBACK |
