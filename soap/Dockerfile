# Utilizar la imagen oficial de Node.js como imagen base
FROM node:14

# Crear un directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copiar el archivo package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar todos los archivos del proyecto al contenedor
COPY . .

# Exponer el puerto que usa la aplicación
EXPOSE 8888

# Comando para ejecutar la aplicación
CMD [ "node", "index.js" ]
