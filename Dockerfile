FROM node:latest

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install --production

# Copia el resto de los archivos de la aplicación
COPY . .

EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
