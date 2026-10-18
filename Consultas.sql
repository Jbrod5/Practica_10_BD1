-- ============================================================
-- Consultas SQL a mano equivalentes al codigo del proyecto
-- Ejercicio 10 - Laboratorio de Bases de Datos 1
-- ============================================================


-- 1. Listar todas las ordenes de trabajo
-- Equivalente a: GET /orden-trabajo
SELECT id, fecha, vehiculo_id, mecanico_id, servicio_id
FROM orden_trabajo;


-- 2. Buscar una orden por id
-- Equivalente a: GET /orden-trabajo/1
SELECT id, fecha, vehiculo_id, mecanico_id, servicio_id
FROM orden_trabajo
WHERE id = 1;


-- 3. Crear una orden de trabajo
-- Equivalente a: POST /orden-trabajo
INSERT INTO orden_trabajo (fecha, vehiculo_id, mecanico_id, servicio_id)
VALUES ('2026-10-18', 1, 1, 1)
RETURNING id;


-- 4. Actualizar una orden de trabajo
-- Equivalente a: PATCH /orden-trabajo/1
UPDATE orden_trabajo
SET fecha = '2026-11-01'
WHERE id = 1;


-- 5. Eliminar una orden de trabajo
-- Equivalente a: DELETE /orden-trabajo/3
DELETE FROM orden_trabajo
WHERE id = 3;


-- 6. Buscar una orden inexistente (error 404)
-- Equivalente a: GET /orden-trabajo/999
SELECT id, fecha, vehiculo_id, mecanico_id, servicio_id
FROM orden_trabajo
WHERE id = 999;
-- No retorna filas, entonces se lanza error 404


-- 7. Ordenes con relaciones (vehiculo, mecanico, servicio)
-- Equivalente a: GET /orden-trabajo/detalle
SELECT ot.id, ot.fecha, ot.vehiculo_id, ot.mecanico_id, ot.servicio_id,
       v.placa, v.marca, v.modelo,
       m.nombre AS mecanico_nombre, m.especialidad,
       s.nombre AS servicio_nombre, s.precio
FROM orden_trabajo ot
LEFT JOIN vehiculo v ON v.id = ot.vehiculo_id
LEFT JOIN mecanico m ON m.id = ot.mecanico_id
LEFT JOIN servicio s ON s.id = ot.servicio_id;


-- 8. QueryBuilder: buscar ordenes por mecanico con JOIN y orden
-- Equivalente a: GET /orden-trabajo/buscar?mecanicoId=1
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


-- 9. Transaccion exitosa
-- Equivalente a: POST /orden-trabajo/transaccion?nuevoPrecio=300
START TRANSACTION;

INSERT INTO orden_trabajo (fecha, vehiculo_id, mecanico_id, servicio_id)
VALUES ('2026-10-18', 1, 1, 1)
RETURNING id;

UPDATE servicio
SET precio = 300
WHERE id = 1;

COMMIT;


-- 10. Transaccion fallida (rollback)
-- Equivalente a: POST /orden-trabajo/transaccion-fallida?servicioInexistenteId=999&nuevoPrecio=300
START TRANSACTION;

INSERT INTO orden_trabajo (fecha, vehiculo_id, mecanico_id, servicio_id)
VALUES ('2026-10-18', 1, 1, 1)
RETURNING id;

UPDATE servicio
SET precio = 300
WHERE id = 999;
-- No afecta ninguna fila, se lanza error 404

ROLLBACK;
-- El INSERT tampoco queda guardado
