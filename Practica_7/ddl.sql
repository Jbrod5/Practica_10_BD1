CREATE TABLE cliente (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(15),
    correo VARCHAR(100)
);

CREATE TABLE mecanico (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    especialidad VARCHAR(50)
);

CREATE TABLE servicio (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    precio NUMERIC(10, 2) NOT NULL
);

CREATE TABLE vehiculo (
    id SERIAL PRIMARY KEY,
    placa VARCHAR(10) UNIQUE NOT NULL,
    marca VARCHAR(50) NOT NULL,
    modelo VARCHAR(50) NOT NULL,
    cliente_id INT NOT NULL,
    CONSTRAINT fk_vehiculo_cliente FOREIGN KEY (cliente_id) REFERENCES cliente(id)
);

CREATE TABLE orden_trabajo (
    id SERIAL PRIMARY KEY,
    fecha DATE NOT NULL DEFAULT CURRENT_DATE,
    vehiculo_id INT NOT NULL,
    mecanico_id INT NOT NULL,
    servicio_id INT NOT NULL,
    CONSTRAINT fk_orden_vehiculo FOREIGN KEY (vehiculo_id) REFERENCES vehiculo(id),
    CONSTRAINT fk_orden_mecanico FOREIGN KEY (mecanico_id) REFERENCES mecanico(id),
    CONSTRAINT fk_orden_servicio FOREIGN KEY (servicio_id) REFERENCES servicio(id)
);