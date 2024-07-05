
# Descripción en Español

## Correr en Desarrollo

1. Clonar el respositorio
2. Crear una copia del ```.env.template``` y renombrarlo a ```.env``` y cambiar las variables de entorno.
3. Instalar dependencias ```npm install```
4. Poner en marcha la base de datos ```docker compose up -d``` asegurarse de tener docker corriendo en su computadora!
5. Correr las migraciones de Prisma ```npx prisma migrate dev```
6. Ejecutar seed ```npm run seed```
7. Correr el proyecto ```npm run dev```


# Description in English

## Running in Development | English

1. Clone the respository
2. Create a copy of ```.env.template``` and rename it to ```.env``` and change the enviroment variables
3. Install dependencies ```npm install```
4. Start up the database ```docker compose up -d``` make sure that docker is running on your computer!
5. Run Prisma migrations ```npx prisma migrate dev```
6. Execute the seed script ```npm run seed```
7. Run the project ```npm run dev```
8. Recommended: Clear localStorage and cookies from browser