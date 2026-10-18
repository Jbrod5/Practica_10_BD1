sudo docker run --name postgres-lab-practica-7 \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=taller_mecanico \
  -p 5432:5432 \
  -d postgres:15


# Credenciales
# Host: localhost   Puerto: 5432   Usuario: postgres Contraseña: password Base de datos: taller_mecanico