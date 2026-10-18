INSERT INTO cliente (nombre, telefono, correo) VALUES
('Carlos Gómez', '55551234', 'carlos@mail.com'),
('María López', '55555678', 'maria@mail.com'),
('Juan Pérez', '55559012', 'juan@mail.com');

INSERT INTO mecanico (nombre, especialidad) VALUES
('Roberto Ramos', 'Electricidad Automotriz'),
('Luis Fernández', 'Motor y Transmisión'),
('Pedro Martinez', 'Frenos y Suspensión');

INSERT INTO servicio (nombre, precio) VALUES
('Cambio de Aceite y Filtro', 250.00),
('Alineación y Balanceo', 180.00),
('Diagnóstico de Computadora', 150.00);

INSERT INTO vehiculo (placa, marca, modelo, cliente_id) VALUES
('P-123ABC', 'Toyota', 'Corolla', 1),
('P-456DEF', 'Honda', 'Civic', 2),
('P-789GHI', 'Mazda', 'Mazda 3', 3);

INSERT INTO orden_trabajo (fecha, vehiculo_id, mecanico_id, servicio_id) VALUES
('2026-09-01', 1, 1, 1),
('2026-09-02', 2, 2, 3),
('2026-09-03', 3, 3, 2);