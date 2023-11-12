# Segundo Parcial de Docker

Este documento proporciona una guía paso a paso para configurar y desplegar los servicios utilizando Docker para el segundo parcial. Asegúrate de tener Docker instalado y en funcionamiento en tu sistema antes de comenzar.

## Paso 1: Inicialización de Docker Swarm

Para iniciar el cluster de Docker Swarm, ejecuta el siguiente comando en tu terminal:

```bash
docker swarm init
```

Este comando configura tu máquina como el nodo manager del swarm.

## Paso 2: Construcción del Servicio DB

Sigue estos pasos para construir la imagen de tu base de datos:

1. Cambia al directorio del servicio DB:

```bash
cd db/
```

2. Construye la imagen de Docker para el servicio de base de datos:

```bash
docker build -t mi-mysql-image .
```

## Paso 3: Construcción del Servicio REST

Para preparar el servicio REST, realiza lo siguiente:

1. Cambia al directorio del servicio REST:

```bash
cd rest/
```

2. Construye la imagen de Docker para el servicio REST:

```bash
docker build -t mi-rest-image .
```

## Paso 4: Construcción del Servicio SOAP

Para configurar el servicio SOAP, sigue estos pasos:

1. Navega al directorio del servicio SOAP:

```bash
cd soap/
```

2. Construye la imagen de Docker para el servicio SOAP:

```bash
docker build -t mi-soap-image .
```

## Paso 5: Construcción y Despliegue del Servicio App

Finalmente, construye y despliega el servicio de la aplicación:

1. Construye la imagen de Docker para el servicio App:

```bash
docker build -t mi-app-image .
```

2. Despliega la stack de servicios utilizando docker-compose:

```bash
docker stack deploy -c docker-compose.yml examen-servicios
```

3. Verifica que los servicios estén ejecutándose correctamente:

```bash
docker service ls
```
