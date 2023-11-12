# Elegir una imagen base, por ejemplo, Node.js si estás usando Express
FROM node:14

# Crear directorio de trabajo
WORKDIR /usr/src/app

# Instalar las dependencias
# El asterisco es para copiar tanto package.json como package-lock.json si están disponibles
COPY package*.json ./

RUN npm install

# Bundle de la aplicación
COPY . .

# Exponer el puerto que usa tu aplicación
EXPOSE 8080

CMD [ "node", "index.js" ]
