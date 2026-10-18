# Practica_7 - Base de Datos Taller Mecanico

Base de datos PostgreSQL para un taller mecanico, creada en la practica 7 del laboratorio.

## Tablas

### cliente
Guarda la informacion de los clientes del taller.

| Columna    | Tipo           | Restricciones       |
|------------|----------------|---------------------|
| id         | SERIAL         | PRIMARY KEY         |
| nombre     | VARCHAR(100)   | NOT NULL            |
| telefono   | VARCHAR(15)    |                     |
| correo     | VARCHAR(100)   |                     |

### mecanico
Guarda la informacion de los mecanicos que trabajan en el taller.

| Columna      | Tipo           | Restricciones       |
|--------------|----------------|---------------------|
| id           | SERIAL         | PRIMARY KEY         |
| nombre       | VARCHAR(100)   | NOT NULL            |
| especialidad | VARCHAR(50)    |                     |

### servicio
Guarda los servicios que ofrece el taller con su precio.

| Columna | Tipo           | Restricciones       |
|---------|----------------|---------------------|
| id      | SERIAL         | PRIMARY KEY         |
| nombre  | VARCHAR(100)   | NOT NULL            |
| precio  | NUMERIC(10,2)  | NOT NULL            |

### vehiculo
Guarda los vehiculos de los clientes, cada vehiculo pertenece a un cliente.

| Columna    | Tipo         | Restricciones                        |
|------------|--------------|--------------------------------------|
| id         | SERIAL       | PRIMARY KEY                          |
| placa      | VARCHAR(10)  | NOT NULL, UNIQUE                     |
| marca      | VARCHAR(50)  | NOT NULL                             |
| modelo     | VARCHAR(50)  | NOT NULL                             |
| cliente_id | INT          | NOT NULL, FK -> cliente(id)          |

### orden_trabajo
Guarda las ordenes de trabajo del taller, cada orden asocia un vehiculo, un mecanico y un servicio.

| Columna     | Tipo   | Restricciones                    |
|-------------|--------|----------------------------------|
| id          | SERIAL | PRIMARY KEY                      |
| fecha       | DATE   | NOT NULL, DEFAULT CURRENT_DATE   |
| vehiculo_id | INT    | NOT NULL, FK -> vehiculo(id)     |
| mecanico_id | INT    | NOT NULL, FK -> mecanico(id)     |
| servicio_id | INT    | NOT NULL, FK -> servicio(id)     |

## Relaciones

- Un cliente puede tener muchos vehiculos (cliente 1:N vehiculo)
- Un vehiculo puede tener muchas ordenes de trabajo (vehiculo 1:N orden_trabajo)
- Un mecanico puede tener muchas ordenes de trabajo (mecanico 1:N orden_trabajo)
- Un servicio puede estar en muchas ordenes de trabajo (servicio 1:N orden_trabajo)

## Como levantar la base de datos

Ejecutar el script docker.sh para crear y levantar el contenedor de PostgreSQL:

```bash
sudo docker run --name postgres-lab-practica-7 \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=taller_mecanico \
  -p 5432:5432 \
  -d postgres:15
```

Luego ejecutar los scripts SQL en orden:

```bash
sudo docker exec -i postgres-lab-practica-7 psql -U postgres -d taller_mecanico < ddl.sql
sudo docker exec -i postgres-lab-practica-7 psql -U postgres -d taller_mecanico < dml.sql
```

## Credenciales

- Host: localhost
- Puerto: 5432
- Usuario: postgres
- Contrasena: password
- Base de datos: taller_mecanico
