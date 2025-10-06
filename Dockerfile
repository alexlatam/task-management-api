# Usa una imagen oficial de Node.js v18 sobre Alpine Linux (ligera y segura)
FROM node:18-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# 1. Copia solo los archivos de dependencias primero
COPY package.json package-lock.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto del código fuente de tu aplicación al contenedor
COPY . .

# Transpila el código de TypeScript a JavaScript
RUN npm run build

# Expone el puerto en el que correrá la aplicación (el mismo de tu app.ts)
EXPOSE 3000

# El comando para iniciar la aplicación una vez que el contenedor se ejecute
# CMD [ "node", "dist/app.js" ]
CMD ["npm", "run", "dev"]